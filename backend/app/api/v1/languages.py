from typing import List
from fastapi import APIRouter
from backend.app.services import epigraphy_service
from backend.app.schemas import SourceLanguageMetadata, SourceLanguageId

router = APIRouter(prefix="/languages", tags=["Languages"])


@router.get("", response_model=List[SourceLanguageMetadata], summary="List All 6 Historical Inscription Languages")
async def list_languages():
    """
    Returns the 6 primary linguistic systems attested in Karnataka epigraphy.
    """
    return epigraphy_service.list_languages()


@router.get("/{language_id}", response_model=SourceLanguageMetadata, summary="Get Historical Language Details")
async def get_language(language_id: SourceLanguageId):
    """
    Returns century range and linguistic features of a specific historical language.
    """
    return epigraphy_service.get_language(language_id)
