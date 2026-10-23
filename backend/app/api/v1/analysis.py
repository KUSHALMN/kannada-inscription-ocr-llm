from typing import Optional
from fastapi import APIRouter, UploadFile, File, Form, HTTPException, status
from backend.app.services import epigraphy_service
from backend.app.schemas import AnalysisJobResult

router = APIRouter(prefix="/analyze", tags=["Analysis"])

ALLOWED_CONTENT_TYPES = {
    "image/png",
    "image/jpeg",
    "image/jpg",
    "image/webp",
    "image/tiff",
}
MAX_FILE_SIZE = 25 * 1024 * 1024  # 25 MB


@router.post("", response_model=AnalysisJobResult, summary="Analyze Inscription Rubbing or Stele Photograph")
async def analyze_inscription(
    file: UploadFile = File(..., description="High-resolution rubbing image (PNG, JPG, WEBP, TIFF)"),
    title: Optional[str] = Form(None, description="Optional inscription title or identifier"),
    location: Optional[str] = Form(None, description="Optional discovery location (e.g. Belur, Hassan)"),
    dynasty: Optional[str] = Form(None, description="Optional dynastic attribution hint"),
    approximate_date: Optional[str] = Form(None, alias="approximateDate", description="Optional approximate date"),
    known_script: Optional[str] = Form(None, alias="knownScript", description="Optional script hint or 'uncertain'"),
    known_language: Optional[str] = Form(None, alias="knownLanguage", description="Optional language hint or 'uncertain'"),
    researcher_notes: Optional[str] = Form(None, alias="researcherNotes", description="Optional field notes"),
):
    """
    Ingests an ancient inscription rubbing or monument photograph, performs surface relief enhancement,
    YOLOv11 character bounding box localization, CNN+ViT 10-era script epoch classification,
    Halegannada OCR transcription, and Hosagannada + English translation synthesis.
    """
    if file.content_type not in ALLOWED_CONTENT_TYPES:
        raise HTTPException(
            status_code=status.HTTP_415_UNSUPPORTED_MEDIA_TYPE,
            detail=f"Unsupported file format '{file.content_type}'. Supported: PNG, JPG, JPEG, WEBP, TIFF."
        )

    image_bytes = await file.read()
    if len(image_bytes) > MAX_FILE_SIZE:
        raise HTTPException(
            status_code=status.HTTP_413_REQUEST_ENTITY_TOO_LARGE,
            detail=f"File size exceeds 25 MB limit ({len(image_bytes)} bytes)."
        )

    if len(image_bytes) == 0:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Uploaded file is empty (0 bytes)."
        )

    result = epigraphy_service.analyze_rubbing(
        image_bytes=image_bytes,
        filename=file.filename or "uploaded_rubbing.jpg",
        title=title,
        location=location,
        dynasty=dynasty,
        approximate_date=approximate_date,
        known_script=known_script,
        known_language=known_language,
        researcher_notes=researcher_notes,
    )
    return result
