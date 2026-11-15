import os
import io
import json
import uuid
import asyncio
from datetime import datetime
from typing import Optional, Union, List
from PIL import Image, UnidentifiedImageError
import cv2
import numpy as np
from fastapi import APIRouter, UploadFile, File, Form, Query, HTTPException, Depends, status
from fastapi.responses import StreamingResponse

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
    auto_save: bool = Query(False, alias="autoSave", description="If true, automatically saves to catalog and returns recordId"),
    title: Optional[str] = Form(None, description="Optional inscription title or identifier"),
    location: Optional[str] = Form(None, description="Optional discovery location (e.g. Belur, Hassan)"),
    dynasty: Optional[str] = Form(None, description="Optional dynastic attribution hint"),
    approximate_date: Optional[str] = Form(None, alias="approximateDate", description="Optional approximate date"),
    known_script: Optional[str] = Form(None, alias="knownScript", description="Optional script hint or 'uncertain'"),
    known_language: Optional[str] = Form(None, alias="knownLanguage", description="Optional language hint or 'uncertain'"),
    researcher_notes: Optional[str] = Form(None, alias="researcherNotes", description="Optional field notes"),
    crop_x: Optional[float] = Form(None, description="Normalized ROI x (0.0 to 1.0)"),
    crop_y: Optional[float] = Form(None, description="Normalized ROI y (0.0 to 1.0)"),
    crop_w: Optional[float] = Form(None, description="Normalized ROI width (0.0 to 1.0)"),
    crop_h: Optional[float] = Form(None, description="Normalized ROI height (0.0 to 1.0)"),
    is_cylindrical: Optional[bool] = Form(False, alias="isCylindrical", description="Unroll cylindrical pillar or column curvature"),
    act_repo: ActivityRepository = Depends(get_activity_repository),
    ins_repo: InscriptionRepository = Depends(get_inscription_repository),
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

        # 2.5 Apply Interactive ROI Cropping if requested (Google Lens style)
        if crop_w is not None and crop_h is not None and crop_w > 0.05 and crop_h > 0.05:
            try:
                cx = max(0.0, min(1.0, float(crop_x or 0.0)))
                cy = max(0.0, min(1.0, float(crop_y or 0.0)))
                cw = max(0.05, min(1.0 - cx, float(crop_w)))
                ch = max(0.05, min(1.0 - cy, float(crop_h)))
                orig_w, orig_h = img_probe.size
                box_px = (int(cx * orig_w), int(cy * orig_h), int((cx + cw) * orig_w), int((cy + ch) * orig_h))
                if box_px[2] > box_px[0] + 15 and box_px[3] > box_px[1] + 15:
                    img_probe = img_probe.crop(box_px)
                    out_buf = io.BytesIO()
                    img_probe.save(out_buf, format=detected_format)
                    image_bytes = out_buf.getvalue()
                    logger.info("Successfully cropped stele ROI box: %s", box_px)
            except Exception as crop_err:
                logger.warning("Could not crop ROI: %s", crop_err)
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

    clean_fn = os.path.splitext(file.filename or "")[0].replace("_", " ").replace("-", " ").strip()
    effective_title = title or (clean_fn.title() if clean_fn and not clean_fn.lower().startswith(("job-", "blob", "upload")) else None)

    # 4. Handle Async Mode
    if is_async:
        await job_mgr.enqueue(
            job_id=job_id,
            image_path=storage_path,
            title=effective_title,
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
        title=effective_title,
        location=location,
        dynasty=dynasty,
        approximate_date=approximate_date,
        known_script=known_script,
        known_language=known_language,
        researcher_notes=researcher_notes,
        filename=file.filename,
        is_cylindrical=bool(is_cylindrical),
    )

    image_url = f"/uploads/{job_id}{ext}"
    result.image_url = image_url

    # Generate enhanced relief and digital ink rubbing
    try:
        from backend.app.ml_adapters.cv_segmenter import CVStonePreprocessor
        CVStonePreprocessor.generate_visual_derivatives(image, storage_path)
        relief_url = f"/uploads/{job_id}_relief{ext}"
        rubbing_url = f"/uploads/{job_id}_rubbing{ext}"
    except Exception as e:
        logger.warning("[%s] Could not generate visual derivatives: %s", job_id, e)
        relief_url = image_url
        rubbing_url = image_url

    result.relief_image_url = relief_url
    result.rubbing_image_url = rubbing_url

    if auto_save:
        # Automatically persist completed analysis into InscriptionRepository
        rec_id = f"ins-{uuid.uuid4().hex[:8]}"
        accession_no = f"ASI-{datetime.now().year}-{uuid.uuid4().hex[:4].upper()}"

        kannada_title = (
            result.translation.modern_kannada.split(".")[0][:60]
            if result.translation and result.translation.modern_kannada
            else f"ಅಭಿಲೇಖ {job_id}"
        )

        new_record = InscriptionRecord(
            id=rec_id,
            accession_number=accession_no,
            title=title or f"{result.inferred_script.value.replace('_', ' ').title()} Epigraph ({job_id})",
            kannada_title=kannada_title,
            image_url=image_url,
            relief_image_url=relief_url,
            rubbing_image_url=rubbing_url,
            script_class=result.inferred_script,
            source_language=result.inferred_language,
            substrate=SubstrateMaterial.GRANITE,
            condition_rating=ConditionRating.FAIR,
            review_status=ReviewStatus.PENDING_VERIFICATION,
            last_updated=datetime.now().strftime("%Y-%m-%d"),
            historical_context=result.historical_context,
            transcription=result.transcription,
            translation=result.translation,
            provenance=f"Catalogued from epigraphical analysis job {job_id}",
            current_location="State Archaeological Survey Repository",
        )
        await ins_repo.create(new_record)
        result.record_id = rec_id

        # Record activity in activity repository
        activity = ResearchActivityItem(
            id=f"act-{uuid.uuid4().hex[:8]}",
            timestamp=datetime.now().strftime("%d %b %Y, %H:%M"),
            type=ActivityType.RUBBING_CATALOGUED,
            title=f"Rubbing Analyzed ({result.status.title()}): {title or file.filename}",
            description=f"5-stage inference completed with status '{result.status}'. Inferred script: {result.inferred_script.value}.",
            scholar="Automated Computational Paleography Pipeline",
            inscription_id=rec_id,
            inscription_title=new_record.title,
        )
        await act_repo.add(activity)
    else:
        # 6. Record activity in activity repository for ephemeral analysis job
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
        image_url=result.image_url or f"/uploads/{job_id}.jpg",
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


@router.post(
    "/stitch",
    response_model=AnalysisJobResult,
    summary="Stitch Multiple Continuous Temple Wall Panels & Analyze",
)
async def stitch_and_analyze_panels(
    files: List[UploadFile] = File(..., description="2 or more overlapping panel images of a temple wall inscription"),
    title: Optional[str] = Form(None),
    location: Optional[str] = Form(None),
    dynasty: Optional[str] = Form(None),
    known_script: Optional[str] = Form(None, alias="knownScript"),
    analysis_svc: AnalysisService = Depends(get_analysis_service),
):
    """
    Stitches multiple sequential photographs of a continuous temple wall or horizontal plinth
    using Planar ORB Homography and runs the complete epigraphical translation pipeline.
    """
    if len(files) < 2:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="At least 2 overlapping image panels are required for temple wall stitching."
        )

    panel_arrays = []
    for f in files:
        b = await f.read()
        try:
            pil_img = Image.open(io.BytesIO(b)).convert("RGB")
            panel_arrays.append(np.array(pil_img))
        except Exception as e:
            raise HTTPException(status_code=400, detail=f"Could not decode image panel '{f.filename}': {e}")

    from backend.app.ml_adapters.cv_segmenter import PanoramicWallStitcher
    ok, pano_bgr, msg = PanoramicWallStitcher.stitch_panels(panel_arrays)
    if not ok or pano_bgr is None:
        raise HTTPException(status_code=status.HTTP_422_UNPROCESSABLE_ENTITY, detail=f"Temple wall stitching failed: {msg}")

    # Convert stitched image to PIL
    stitched_rgb = cv2.cvtColor(pano_bgr, cv2.COLOR_BGR2RGB)
    stitched_pil = Image.fromarray(stitched_rgb)

    job_id = f"stitched-{uuid.uuid4().hex[:8]}"
    storage_dir = getattr(settings, "STORAGE_UPLOADS_DIR", "backend/storage/uploads")
    os.makedirs(storage_dir, exist_ok=True)
    stitched_path = os.path.join(storage_dir, f"{job_id}.jpg")
    stitched_pil.save(stitched_path, "JPEG", quality=95)

    result = await analysis_svc.execute_pipeline(
        image=stitched_pil,
        job_id=job_id,
        title=title or "Stitched Temple Wall Inscription",
        location=location,
        dynasty=dynasty,
        known_script=known_script,
        filename=f"{job_id}.jpg"
    )
    return result


@router.get(
    "/{job_id}/stream",
    summary="Real-Time Server-Sent Events (SSE) Analysis Progress Stream",
)
async def stream_analysis_progress(
    job_id: str,
    job_mgr: JobQueueManager = Depends(get_job_manager),
):
    """
    Streams millisecond-accurate pipeline progression events (SSE) from the FastAPI backend.
    Emits {"jobId", "status", "progress", "currentStep", "result"} directly to browser.
    """
    async def event_generator():
        last_progress = -1
        last_step = ""
        poll_count = 0
        while poll_count < 120:  # Timeout after 60 seconds
            job = job_mgr.get_job(job_id)
            if not job:
                yield f"data: {json.dumps({'status': 'not_found', 'jobId': job_id, 'progress': 0})}\n\n"
                break

            if job.progress != last_progress or job.current_step != last_step or job.status in ("completed", "failed"):
                payload = {
                    "jobId": job.job_id,
                    "status": job.status,
                    "progress": job.progress,
                    "currentStep": job.current_step,
                    "updatedAt": job.updated_at
                }
                if job.result:
                    payload["result"] = job.result.dict()
                yield f"data: {json.dumps(payload)}\n\n"
                last_progress = job.progress
                last_step = job.current_step

            if job.status in ("completed", "failed", "partial"):
                break

            poll_count += 1
            await asyncio.sleep(0.35)

    return StreamingResponse(
        event_generator(),
        media_type="text/event-stream",
        headers={
            "Cache-Control": "no-cache",
            "Connection": "keep-alive",
            "X-Accel-Buffering": "no"
        }
    )
