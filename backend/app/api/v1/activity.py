from typing import List
from fastapi import APIRouter, Query, Depends
from backend.app.schemas import ResearchActivityItem
from backend.app.repositories.base import ActivityRepository
from backend.app.api.deps import get_activity_repository

router = APIRouter(prefix="/activity", tags=["Activity"])


@router.get("", response_model=List[ResearchActivityItem], summary="Get Recent Research Activity Stream")
async def list_activity(
    limit: int = Query(10, ge=1, le=100, description="Max activity items to retrieve"),
    repo: ActivityRepository = Depends(get_activity_repository)
):
    """
    Returns audit stream of recent transcription verifications, lexicon additions, and rubbing cataloguing events.
    Supports limit query parameter (default: 10).
    """
    return await repo.list(limit=limit)
