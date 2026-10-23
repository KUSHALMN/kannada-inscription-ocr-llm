from typing import List
from fastapi import APIRouter, Depends
from backend.app.schemas import ScriptClassMetadata, ScriptClassId
from backend.app.repositories.base import ScriptRepository
from backend.app.api.deps import get_script_repository
from backend.app.core.exceptions import ResourceNotFoundException

router = APIRouter(prefix="/scripts", tags=["Scripts"])


@router.get("", response_model=List[ScriptClassMetadata], summary="List All 10 Historical Script Epochs")
async def list_scripts(
    repo: ScriptRepository = Depends(get_script_repository)
):
    """
    Returns the comprehensive 10-era chronological Kannada paleographical script lineage.
    Sorted by orderIndex from 0 (Ashokan Brahmi) to 9 (Present Kannada).
    """
    return await repo.list()


@router.get("/{script_id}", response_model=ScriptClassMetadata, summary="Get Diagnostic Script Metadata")
async def get_script(
    script_id: ScriptClassId,
    repo: ScriptRepository = Depends(get_script_repository)
):
    """
    Returns detailed paleographical diagnostics, substrate traits, sample glyphs,
    and phylogenetic relationships for an individual script class.
    """
    script = await repo.get(script_id)
    if not script:
        raise ResourceNotFoundException(f"Script epoch '{script_id}' not found.")
    return script
