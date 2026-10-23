from typing import List
from fastapi import APIRouter, Query
from backend.app.services import epigraphy_service
from backend.app.schemas import ResearchActivityItem

router = APIRouter(prefix="/activity", tags=["Activity"])


@router.get("", response_model=List[ResearchActivityItem], summary="Get Recent Research Activity Stream")
async def list_activity(limit: int = Query(10, ge=1, le=100, description="Max activity items to retrieve")):
    """
    Returns audit stream of recent transcription verifications, lexicon additions, and rubbing cataloguing events.
    """
    return epigraphy_service.list_activity(limit=limit)
