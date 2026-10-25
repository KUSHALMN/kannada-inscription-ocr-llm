import uuid
from datetime import datetime
from typing import List, Optional, Union, Literal
from fastapi import APIRouter, Query, Depends, Response
from backend.app.schemas import (
    InscriptionRecord,
    InscriptionFilter,
    InscriptionUpdate,
    ScriptClassId,
    SourceLanguageId,
    SubstrateMaterial,
    ReviewStatus,
    SortBy,
    TranscriptionUpdateRequest,
    TranslationUpdateRequest,
    ReviewStatusUpdateRequest,
    ResearchActivityItem,
    ActivityType,
)
from backend.app.repositories.base import InscriptionRepository, ActivityRepository
from backend.app.api.deps import get_inscription_repository, get_activity_repository
from backend.app.core.exceptions import ResourceNotFoundException, EpigraphyException

router = APIRouter(prefix="/inscriptions", tags=["Inscriptions"])


@router.get("", response_model=List[InscriptionRecord], summary="List and Filter Inscription Records")
async def list_inscriptions(
    script_class: Optional[Union[ScriptClassId, Literal["all"]]] = Query(
        None,
        alias="scriptClass",
        description="Filter by ScriptClassId (10 eras) or 'all'. Unknown values return 422."
    ),
    source_language: Optional[Union[SourceLanguageId, Literal["all"]]] = Query(
        None,
        alias="sourceLanguage",
        description="Filter by SourceLanguageId (6 languages) or 'all'. Unknown values return 422."
    ),
    substrate: Optional[Union[SubstrateMaterial, Literal["all"]]] = Query(
        None,
        description="Filter by SubstrateMaterial or 'all'. Unknown values return 422."
    ),
    review_status: Optional[Union[ReviewStatus, Literal["all"]]] = Query(
        None,
        alias="reviewStatus",
        description="Filter by ReviewStatus or 'all'. Unknown values return 422."
    ),
    historical_period: Optional[str] = Query(
        None,
        alias="historicalPeriod",
        description="Case-insensitive substring search in century or approximateDate"
    ),
    search_query: Optional[str] = Query(
        None,
        alias="searchQuery",
        description="Case-insensitive search across title, kannadaTitle, dynasty, ruler, village, recognizedText, glossary terms"
    ),
    sort_by: Optional[SortBy] = Query(
        None,
        alias="sortBy",
        description="Sorting criteria: date_asc, date_desc, title, confidence, recently_updated. Unknown values return 422."
    ),
    response: Response = None,
    repo: InscriptionRepository = Depends(get_inscription_repository),
):
    """
    Search, filter, and sort the inscriptional corpus.
    All enum query parameters are strictly validated; invalid values return 422.
    """
    if response:
        response.headers["Cache-Control"] = "public, max-age=60, stale-while-revalidate=300"
    filters = InscriptionFilter(
        script_class=script_class,
        source_language=source_language,
        substrate=substrate,
        review_status=review_status,
        historical_period=historical_period,
        search_query=search_query,
        sort_by=sort_by,
    )
    return await repo.list(filters)


@router.get("/{inscription_id}", response_model=InscriptionRecord, summary="Get Inscription Dossier by ID")
async def get_inscription(
    inscription_id: str,
    response: Response = None,
    repo: InscriptionRepository = Depends(get_inscription_repository),
):
    """
    Returns full epigraphical dossier by ID.
    If not found, returns 404 with error envelope {error: {code: 'RESOURCE_NOT_FOUND', message: ...}}.
    """
    ins = await repo.get(inscription_id)
    if not ins:
        raise ResourceNotFoundException(f"Inscription with ID '{inscription_id}' not found.")
    if response:
        response.headers["Cache-Control"] = "public, max-age=60, stale-while-revalidate=300"
    return ins


@router.put("/{inscription_id}", response_model=InscriptionRecord, summary="Update Inscription Record")
async def update_inscription(
    inscription_id: str,
    payload: InscriptionUpdate,
    repo: InscriptionRepository = Depends(get_inscription_repository),
    act_repo: ActivityRepository = Depends(get_activity_repository),
):
    """
    Partial update of an InscriptionRecord using separate InscriptionUpdate model.
    - Rejects changes to 'id' or 'accessionNumber' with 400 Bad Request.
    - Updates 'lastUpdated' timestamp.
    - Appends a ResearchActivityItem to the activity log.
    - Persists atomically to disk.
    """
    ins = await repo.get(inscription_id)
    if not ins:
        raise ResourceNotFoundException(f"Inscription with ID '{inscription_id}' not found.")

    # Reject changes to immutable fields
    if payload.id is not None and payload.id != inscription_id:
        raise EpigraphyException("Cannot modify immutable field 'id'.", code="IMMUTABLE_FIELD", status_code=400)

    if payload.accession_number is not None and payload.accession_number != ins.accession_number:
        raise EpigraphyException("Cannot modify immutable field 'accessionNumber'.", code="IMMUTABLE_FIELD", status_code=400)

    # Apply updates from payload
    update_data = payload.model_dump(exclude_unset=True)
    update_data.pop("id", None)
    update_data.pop("accessionNumber", None)
    update_data.pop("accession_number", None)

    for field, value in update_data.items():
        if hasattr(ins, field) and value is not None:
            setattr(ins, field, value)

    # Update lastUpdated
    ins.last_updated = datetime.now().strftime("%d %b %Y")

    # Record research activity
    activity = ResearchActivityItem(
        id=f"act-{uuid.uuid4().hex[:8]}",
        timestamp=datetime.now().strftime("%d %b %Y, %H:%M"),
        type=ActivityType.TRANSCRIPTION_VERIFIED if payload.transcription else ActivityType.TRANSLATION_UPDATED if payload.translation else ActivityType.TRANSCRIPTION_VERIFIED,
        title=f"Inscription Updated: {ins.title}",
        description=f"Record updated via API (review status: {ins.review_status.value}).",
        scholar="Epigraphical Researcher",
        inscription_id=ins.id,
        inscription_title=ins.title,
    )
    await act_repo.add(activity)

    # Atomically persist updated record
    updated = await repo.update(inscription_id, ins)
    return updated


@router.post("", response_model=InscriptionRecord, status_code=201, summary="Create Inscription Record")
async def create_inscription(
    record: InscriptionRecord,
    repo: InscriptionRepository = Depends(get_inscription_repository),
    act_repo: ActivityRepository = Depends(get_activity_repository),
):
    """
    Persists a new inscription record into repository storage.
    """
    created = await repo.create(record)
    activity = ResearchActivityItem(
        id=f"act-{uuid.uuid4().hex[:8]}",
        timestamp=datetime.now().strftime("%d %b %Y, %H:%M"),
        type=ActivityType.RUBBING_CATALOGUED,
        title="New Inscription Catalogued",
        description=f"Ingested {created.title} ({created.accession_number}).",
        scholar="Epigraphical Archival Team",
        inscription_id=created.id,
        inscription_title=created.title,
    )
    await act_repo.add(activity)
    return created


@router.patch("/{inscription_id}/transcription", response_model=InscriptionRecord, summary="Update Epigraphical Transcription")
async def update_transcription(
    inscription_id: str,
    payload: TranscriptionUpdateRequest,
    repo: InscriptionRepository = Depends(get_inscription_repository),
    act_repo: ActivityRepository = Depends(get_activity_repository),
):
    """
    Updates the transcription line reading, original text, and IAST transliteration after scholar verification.
    """
    ins = await repo.get(inscription_id)
    if not ins:
        raise ResourceNotFoundException(f"Inscription with ID '{inscription_id}' not found.")

    ins.transcription.recognized_text = payload.recognized_text
    ins.transcription.iast_transliteration = payload.iast_transliteration
    if payload.lines:
        ins.transcription.lines = payload.lines
    ins.last_updated = datetime.now().strftime("%d %b %Y")

    updated = await repo.update(inscription_id, ins)

    activity = ResearchActivityItem(
        id=f"act-{uuid.uuid4().hex[:8]}",
        timestamp=datetime.now().strftime("%d %b %Y, %H:%M"),
        type=ActivityType.TRANSCRIPTION_VERIFIED,
        title="Transcription Revised & Verified",
        description="Epigraphical line readings verified by contributing scholar.",
        scholar="Epigraphical Researcher",
        inscription_id=inscription_id,
        inscription_title=ins.title,
    )
    await act_repo.add(activity)
    return updated


@router.patch("/{inscription_id}/translation", response_model=InscriptionRecord, summary="Update Translation & Lexicon")
async def update_translation(
    inscription_id: str,
    payload: TranslationUpdateRequest,
    repo: InscriptionRepository = Depends(get_inscription_repository),
    act_repo: ActivityRepository = Depends(get_activity_repository),
):
    """
    Updates the Modern Standard Kannada (Hosagannada) and English translations.
    """
    ins = await repo.get(inscription_id)
    if not ins:
        raise ResourceNotFoundException(f"Inscription with ID '{inscription_id}' not found.")

    ins.translation.modern_kannada = payload.modern_kannada
    ins.translation.english_translation = payload.english_translation
    if payload.glossary:
        ins.translation.glossary = payload.glossary
    if payload.stylistic_notes is not None:
        ins.translation.stylistic_notes = payload.stylistic_notes
    ins.last_updated = datetime.now().strftime("%d %b %Y")

    updated = await repo.update(inscription_id, ins)

    activity = ResearchActivityItem(
        id=f"act-{uuid.uuid4().hex[:8]}",
        timestamp=datetime.now().strftime("%d %b %Y, %H:%M"),
        type=ActivityType.TRANSLATION_UPDATED,
        title="Translation & Lexicon Updated",
        description="Modern Kannada translation and archaic vocabulary glosses enhanced.",
        scholar="Epigraphical Researcher",
        inscription_id=inscription_id,
        inscription_title=ins.title,
    )
    await act_repo.add(activity)
    return updated


@router.patch("/{inscription_id}/status", response_model=InscriptionRecord, summary="Update Archival Review Status")
async def update_review_status(
    inscription_id: str,
    payload: ReviewStatusUpdateRequest,
    repo: InscriptionRepository = Depends(get_inscription_repository),
    act_repo: ActivityRepository = Depends(get_activity_repository),
):
    """
    Advances review status (e.g. pending_verification -> in_review -> verified).
    """
    ins = await repo.get(inscription_id)
    if not ins:
        raise ResourceNotFoundException(f"Inscription with ID '{inscription_id}' not found.")

    ins.review_status = payload.review_status
    ins.last_updated = datetime.now().strftime("%d %b %Y")

    updated = await repo.update(inscription_id, ins)

    activity = ResearchActivityItem(
        id=f"act-{uuid.uuid4().hex[:8]}",
        timestamp=datetime.now().strftime("%d %b %Y, %H:%M"),
        type=ActivityType.TRANSCRIPTION_VERIFIED,
        title=f"Archival Status Set to {payload.review_status.value.replace('_', ' ').title()}",
        description=f"Peer review status verified. {payload.reviewer_notes or ''}".strip(),
        scholar="Epigraphical Lead",
        inscription_id=inscription_id,
        inscription_title=ins.title,
    )
    await act_repo.add(activity)
    return updated
