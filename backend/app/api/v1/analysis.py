import os
import io
import uuid
from datetime import datetime
from typing import Optional
from PIL import Image, UnidentifiedImageError
from fastapi import APIRouter, UploadFile, File, Form, HTTPException, Depends, status
from backend.app.config import settings
from backend.app.services.analysis_service import AnalysisService
from backend.app.schemas import AnalysisJobResult, ResearchActivityItem, ActivityType
from backend.app.repositories.base import ActivityRepository
from backend.app.api.deps import get_activity_repository, get_analysis_service
from backend.app.core.logging import logger

router = APIRouter(prefix="/analyze", tags=["Analysis"])

MAX_FILE_SIZE = 25 * 1024 * 1024  # 25 MB
ALLOWED_FORMATS = {"JPEG", "JPG", "PNG", "WEBP", "TIFF"}
EXT_MAP = {
    "JPEG": ".jpg",
    "JPG": ".jpg",
    "PNG": ".png",
    "WEBP": ".webp",
    "TIFF": ".tiff",
}


@router.post("", response_model=AnalysisJobResult, summary="Analyze Inscription Rubbing or Stele Photograph")
async def analyze_inscription(
    file: UploadFile = File(..., description="Rubbing image (JPEG, PNG, WEBP, TIFF up to 25MB)"),
    title: Optional[str] = Form(None, description="Optional inscription title or identifier"),
    location: Optional[str] = Form(None, description="Optional discovery location (e.g. Belur, Hassan)"),
    dynasty: Optional[str] = Form(None, description="Optional dynastic attribution hint"),
    approximate_date: Optional[str] = Form(None, alias="approximateDate", description="Optional approximate date"),
    known_script: Optional[str] = Form(None, alias="knownScript", description="Optional script hint or 'uncertain'"),
    known_language: Optional[str] = Form(None, alias="knownLanguage", description="Optional language hint or 'uncertain'"),
    researcher_notes: Optional[str] = Form(None, alias="researcherNotes", description="Optional field notes"),
    act_repo: ActivityRepository = Depends(get_activity_repository),
    analysis_svc: AnalysisService = Depends(get_analysis_service),
):
    """
    Ingests an ancient inscription rubbing or monument photograph.
    Validates magic bytes via Pillow (independent of content-type header).
    Stores upload in backend/storage/uploads/{jobId}.ext.
    Executes Preprocessing -> Segmentation -> Script Classification ->
    Recognition -> Transliteration -> Translation via threadpool.
    Returns per-step timings and gracefully returns status 'partial' if any step fails.
    """
    # 1. Read file bytes and validate size
    image_bytes = await file.read()
    if len(image_bytes) == 0:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Uploaded file is empty (0 bytes)."
        )

    if len(image_bytes) > MAX_FILE_SIZE:
        raise HTTPException(
            status_code=status.HTTP_413_REQUEST_ENTITY_TOO_LARGE,
            detail=f"File exceeds maximum allowed size of 25 MB ({len(image_bytes)} bytes)."
        )

    # 2. Validate magic bytes using Pillow (not relying on headers or filename)
    try:
        raw_stream = io.BytesIO(image_bytes)
        img_probe = Image.open(raw_stream)
        detected_format = (img_probe.format or "").upper()
        if not detected_format:
            raise UnidentifiedImageError("Could not identify image format magic bytes.")
        if detected_format not in ALLOWED_FORMATS:
            raise HTTPException(
                status_code=status.HTTP_415_UNSUPPORTED_MEDIA_TYPE,
                detail=f"Unsupported image format '{detected_format}'. Supported formats: JPEG, PNG, WEBP, TIFF."
            )
        # Load pixels to confirm integrity
        img_probe.load()
    except HTTPException:
        raise
    except UnidentifiedImageError as e:
        logger.warning("Pillow could not identify image format for '%s': %s", file.filename, str(e))
        raise HTTPException(
            status_code=status.HTTP_415_UNSUPPORTED_MEDIA_TYPE,
            detail=f"Unsupported or unrecognized media type: {str(e)}. Supported formats: JPEG, PNG, WEBP, TIFF."
        )
    except Exception as e:
        logger.warning("Pillow magic byte inspection or pixel decode failed for '%s': %s", file.filename, str(e))
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=f"Invalid or corrupted image file: {str(e)}"
        )

    # 3. Create unique Job ID & store in backend/storage/uploads/{jobId}.ext
    job_id = f"job-{uuid.uuid4().hex[:12]}"
    ext = EXT_MAP.get(detected_format, ".jpg")
    storage_dir = getattr(settings, "STORAGE_UPLOADS_DIR", "backend/storage/uploads")
    os.makedirs(storage_dir, exist_ok=True)
    storage_path = os.path.join(storage_dir, f"{job_id}{ext}")

    with open(storage_path, "wb") as f:
        f.write(image_bytes)
    logger.info("[%s] Saved upload to storage: %s (%d bytes)", job_id, storage_path, len(image_bytes))

    # Re-open verified image for processing
    image = Image.open(io.BytesIO(image_bytes))

    # 4. Orchestrate analysis pipeline asynchronously via threadpool
    result = await analysis_svc.execute_pipeline(
        image=image,
        job_id=job_id,
        title=title,
        location=location,
        dynasty=dynasty,
        approximate_date=approximate_date,
        known_script=known_script,
        known_language=known_language,
        researcher_notes=researcher_notes,
    )

    # 5. Record activity in activity repository
    activity = ResearchActivityItem(
        id=f"act-{uuid.uuid4().hex[:8]}",
        timestamp=datetime.now().strftime("%d %b %Y, %H:%M"),
        type=ActivityType.RUBBING_CATALOGUED,
        title=f"Rubbing Analyzed ({result.status.title()}): {title or file.filename}",
        description=f"5-stage inference completed with status '{result.status}'. Inferred script: {result.inferred_script.value}.",
        scholar="Automated Computational Paleography Pipeline",
        inscription_id=job_id,
        inscription_title=title or "Newly Ingested Epigraphical Record",
    )
    await act_repo.add(activity)

    return result
