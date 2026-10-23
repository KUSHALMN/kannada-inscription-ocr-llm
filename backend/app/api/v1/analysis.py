import os
import io
import uuid
from datetime import datetime
from typing import Optional, Union
from PIL import Image, UnidentifiedImageError
from fastapi import APIRouter, UploadFile, File, Form, Query, HTTPException, Depends, status

from backend.app.config import settings
from backend.app.services.analysis_service import AnalysisService
from backend.app.services.job_manager import JobQueueManager
from backend.app.schemas import (
    AnalysisJobResult,
    AsyncJobAccepted,
    JobStatusResponse,
    InscriptionRecord,
    SubstrateMaterial,
    ConditionRating,
    ReviewStatus,
    FindSpot,
    ResearchActivityItem,
    ActivityType,
)
from backend.app.repositories.base import InscriptionRepository, ActivityRepository
from backend.app.api.deps import (
    get_activity_repository,
    get_inscription_repository,
    get_analysis_service,
    get_job_manager,
)
from backend.app.core.logging import logger

from backend.app.core.rate_limit import check_analyze_rate_limit

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


@router.post(
    "",
    response_model=Union[AnalysisJobResult, AsyncJobAccepted],
    summary="Analyze Inscription Rubbing or Stele Photograph",
    dependencies=[Depends(check_analyze_rate_limit)],
)
async def analyze_inscription(
    file: UploadFile = File(..., description="Rubbing image (JPEG, PNG, WEBP, TIFF up to 25MB)"),
    is_async: bool = Query(False, alias="async", description="If true, enqueues the job and returns {jobId, status: 'queued'}"),
    title: Optional[str] = Form(None, description="Optional inscription title or identifier"),
    location: Optional[str] = Form(None, description="Optional discovery location (e.g. Belur, Hassan)"),
    dynasty: Optional[str] = Form(None, description="Optional dynastic attribution hint"),
    approximate_date: Optional[str] = Form(None, alias="approximateDate", description="Optional approximate date"),
    known_script: Optional[str] = Form(None, alias="knownScript", description="Optional script hint or 'uncertain'"),
    known_language: Optional[str] = Form(None, alias="knownLanguage", description="Optional language hint or 'uncertain'"),
    researcher_notes: Optional[str] = Form(None, alias="researcherNotes", description="Optional field notes"),
    act_repo: ActivityRepository = Depends(get_activity_repository),
    analysis_svc: AnalysisService = Depends(get_analysis_service),
    job_mgr: JobQueueManager = Depends(get_job_manager),
):
    """
    Ingests an ancient inscription rubbing or monument photograph.
    Validates magic bytes via Pillow (independent of content-type header).
    Stores upload in backend/storage/uploads/{jobId}.ext.

    Modes:
    - Synchronous (default): Executes Preprocessing -> Segmentation -> Script Classification ->
      Recognition -> Transliteration -> Translation via threadpool. Returns AnalysisJobResult.
    - Asynchronous (async=true): Enqueues job to single-worker queue, returns {jobId, status: 'queued'}.
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

    # 4. Handle Async Mode
    if is_async:
        await job_mgr.enqueue(
            job_id=job_id,
            image_path=storage_path,
            title=title,
            location=location,
            dynasty=dynasty,
            approximate_date=approximate_date,
            known_script=known_script,
            known_language=known_language,
            researcher_notes=researcher_notes,
        )
        return AsyncJobAccepted(job_id=job_id, status="queued")

    # 5. Synchronous Execution via threadpool
    image = Image.open(io.BytesIO(image_bytes))
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

    # 6. Record activity in activity repository
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


@router.post(
    "/{job_id}/save",
    response_model=InscriptionRecord,
    status_code=status.HTTP_201_CREATED,
    summary="Save Completed Analysis Job as Catalog Record",
)
async def save_analyzed_job_to_catalog(
    job_id: str,
    job_mgr: JobQueueManager = Depends(get_job_manager),
    inscription_repo: InscriptionRepository = Depends(get_inscription_repository),
    activity_repo: ActivityRepository = Depends(get_activity_repository),
) -> InscriptionRecord:
    """
    Converts a completed or partial analysis job into a permanent InscriptionRecord
    in the catalog with reviewStatus='pending_verification'.
    """
    job = await job_mgr.get_job(job_id)
    if not job:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Analysis job '{job_id}' not found."
        )

    if job.status not in ("completed", "partial") or not job.result:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=f"Job '{job_id}' has status '{job.status}' and cannot be saved to catalog. Must be 'completed' or 'partial'."
        )

    result = job.result

    # Generate record ID and accession number
    rec_id = f"ins-{uuid.uuid4().hex[:8]}"
    accession_no = f"ASI-2026-{uuid.uuid4().hex[:4].upper()}"

    title = (
        result.historical_context.epigraphia_reference
        if result.historical_context and result.historical_context.epigraphia_reference
        else f"{result.inferred_script.value.title()} Epigraph ({job_id})"
    )
    kannada_title = (
        result.translation.modern_kannada.split(".")[0][:60]
        if result.translation and result.translation.modern_kannada
        else f"ಅಭಿಲೇಖ {job_id}"
    )

    # Inferred or default find spot
    find_spot = (
        result.historical_context.find_spot
        if result.historical_context
        else FindSpot(village="Halmidi", taluk="Belur", district="Hassan", state="Karnataka")
    )

    record = InscriptionRecord(
        id=rec_id,
        accession_number=accession_no,
        title=title,
        kannada_title=kannada_title,
        script_class=result.inferred_script,
        source_language=result.inferred_language,
        substrate=SubstrateMaterial.GRANITE,
        dimensions=None,
        image_url=f"/storage/uploads/{job_id}.jpg",
        thumbnail_url=None,
        condition_rating=ConditionRating.FAIR,
        review_status=ReviewStatus.PENDING_VERIFICATION,
        last_updated=datetime.now().strftime("%Y-%m-%d"),
        historical_context=result.historical_context,
        transcription=result.transcription,
        translation=result.translation,
        provenance=f"Catalogued from epigraphical analysis job {job_id}",
        current_location="State Archaeological Survey Repository",
    )

    created = await inscription_repo.create(record)

    # Record cataloging activity
    activity = ResearchActivityItem(
        id=f"act-{uuid.uuid4().hex[:8]}",
        timestamp=datetime.now().strftime("%d %b %Y, %H:%M"),
        type=ActivityType.RUBBING_CATALOGUED,
        title=f"Rubbing Catalogued: {created.title}",
        description=f"Analysis job {job_id} converted to catalog record with reviewStatus=pending_verification.",
        scholar="Automated Ingestion Pipeline",
        inscription_id=created.id,
        inscription_title=created.title,
    )
    await activity_repo.add(activity)

    logger.info("[%s] Successfully saved job as InscriptionRecord: %s (%s)", job_id, created.id, created.accession_number)
    return created
