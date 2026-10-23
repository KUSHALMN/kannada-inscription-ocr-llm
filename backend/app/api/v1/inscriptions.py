from typing import List, Optional
from fastapi import APIRouter, Query
from backend.app.services import epigraphy_service
from backend.app.schemas import (
    InscriptionRecord,
    InscriptionFilter,
    TranscriptionUpdateRequest,
    TranslationUpdateRequest,
    ReviewStatusUpdateRequest,
)

router = APIRouter(prefix="/inscriptions", tags=["Inscriptions"])


@router.get("", response_model=List[InscriptionRecord], summary="List and Filter Inscription Records")
async def list_inscriptions(
    script_class: Optional[str] = Query(None, alias="scriptClass", description="Filter by ScriptClassId or 'all'"),
    source_language: Optional[str] = Query(None, alias="sourceLanguage", description="Filter by SourceLanguageId or 'all'"),
    substrate: Optional[str] = Query(None, description="Filter by SubstrateMaterial or 'all'"),
    review_status: Optional[str] = Query(None, alias="reviewStatus", description="Filter by ReviewStatus or 'all'"),
    historical_period: Optional[str] = Query(None, alias="historicalPeriod", description="Filter by period or century substring"),
    search_query: Optional[str] = Query(None, alias="searchQuery", description="Free-text search across titles, places, rulers"),
    sort_by: Optional[str] = Query(None, alias="sortBy", description="Sorting criteria"),
):
    """
    Search, filter, and sort the canonical and ingested inscriptional corpus.
    Query parameters accept camelCase matching the frontend's URL parameters.
    """
    filters = InscriptionFilter(
        script_class=script_class,
        source_language=source_language,
        substrate=substrate,
        review_status=review_status,
        historical_period=historical_period,
        search_query=search_query,
        sort_by=sort_by,
    )
    return epigraphy_service.list_inscriptions(filters)


@router.get("/{inscription_id}", response_model=InscriptionRecord, summary="Get Inscription Dossier by ID")
async def get_inscription(inscription_id: str):
    """
    Returns full epigraphical dossier including 4-pillar separation, lines, coordinates, and historical context.
    """
    return epigraphy_service.get_inscription(inscription_id)


@router.patch("/{inscription_id}/transcription", response_model=InscriptionRecord, summary="Update Epigraphical Transcription")
async def update_transcription(inscription_id: str, payload: TranscriptionUpdateRequest):
    """
    Updates the transcription line reading, original text, and IAST transliteration after scholar verification.
    """
    return epigraphy_service.update_transcription(inscription_id, payload)


@router.patch("/{inscription_id}/translation", response_model=InscriptionRecord, summary="Update Translation & Lexicon")
async def update_translation(inscription_id: str, payload: TranslationUpdateRequest):
    """
    Updates the Modern Standard Kannada (Hosagannada) and English translations.
    """
    return epigraphy_service.update_translation(inscription_id, payload)


@router.patch("/{inscription_id}/status", response_model=InscriptionRecord, summary="Update Archival Review Status")
async def update_review_status(inscription_id: str, payload: ReviewStatusUpdateRequest):
    """
    Advances review status (e.g. pending_verification -> in_review -> verified).
    """
    return epigraphy_service.update_review_status(inscription_id, payload)
