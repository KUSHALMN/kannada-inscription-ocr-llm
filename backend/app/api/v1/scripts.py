from typing import List
from fastapi import APIRouter
from backend.app.services import epigraphy_service
from backend.app.schemas import ScriptClassMetadata, ScriptClassId

router = APIRouter(prefix="/scripts", tags=["Scripts"])


@router.get("", response_model=List[ScriptClassMetadata], summary="List All 10 Historical Script Epochs")
async def list_scripts():
    """
    Returns the comprehensive 10-era chronological Kannada paleographical script lineage.
    """
    return epigraphy_service.list_scripts()


@router.get("/{script_id}", response_model=ScriptClassMetadata, summary="Get Diagnostic Script Metadata")
async def get_script(script_id: ScriptClassId):
    """
    Returns detailed paleographical diagnostics, substrate traits, sample glyphs,
    and phylogenetic relationships for an individual script class.
    """
    return epigraphy_service.get_script(script_id)
