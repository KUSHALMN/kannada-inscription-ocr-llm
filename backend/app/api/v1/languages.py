from typing import List
from fastapi import APIRouter, Depends
from backend.app.schemas import SourceLanguageMetadata, SourceLanguageId
from backend.app.repositories.base import LanguageRepository
from backend.app.api.deps import get_language_repository
from backend.app.core.exceptions import ResourceNotFoundException

router = APIRouter(prefix="/languages", tags=["Languages"])


@router.get("", response_model=List[SourceLanguageMetadata], summary="List All 6 Historical Inscription Languages")
async def list_languages(
    repo: LanguageRepository = Depends(get_language_repository)
):
    """
    Returns the 6 primary linguistic systems attested in Karnataka epigraphy.
    """
    return await repo.list()


@router.get("/{language_id}", response_model=SourceLanguageMetadata, summary="Get Historical Language Details")
async def get_language(
    language_id: SourceLanguageId,
    repo: LanguageRepository = Depends(get_language_repository)
):
    """
    Returns century range and linguistic features of a specific historical language.
    """
    lang = await repo.get(language_id)
    if not lang:
        raise ResourceNotFoundException(f"Source language '{language_id}' not found.")
    return lang
