from typing import List, Optional
from fastapi import APIRouter, Query
from backend.app.services import epigraphy_service
from backend.app.schemas import ArchaicGlossaryItem

router = APIRouter(prefix="/lexicon", tags=["Lexicon"])


@router.get("", response_model=List[ArchaicGlossaryItem], summary="Search Archaic Epigraphical Lexicon")
async def list_lexicon(q: Optional[str] = Query(None, description="Search term in Old Kannada, IAST, or English")):
    """
    Returns curated dictionary of archaic Old Kannada and Sanskrit loan terms found in steles.
    """
    return epigraphy_service.list_lexicon(query=q)
