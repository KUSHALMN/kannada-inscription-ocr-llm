"""
Direct Halegannada Neural Translation API Endpoint
Translates ancient Kannada epigraph text into Hosagannada & English using the fine-tuned model.
"""

from typing import Optional
from pydantic import BaseModel, Field
from fastapi import APIRouter, HTTPException, Depends, status

from backend.app.schemas import (
    TranslationResult,
    ScriptClassId,
    SourceLanguageId,
)
from backend.app.services.analysis_service import AnalysisService
from backend.app.api.deps import get_analysis_service
from backend.app.core.logging import logger

router = APIRouter(prefix="/translate", tags=["Translation"])


class DirectTranslateRequest(BaseModel):
    text: str = Field(..., description="Ancient Halegannada text to transcribe and translate")
    script: Optional[str] = Field("kadamba", description="Script or dynasty hint (e.g. kadamba, hoysala, badami_chalukya)")
    language: Optional[str] = Field("purvada_halegannada", description="Source language hint")


@router.post(
    "",
    response_model=TranslationResult,
    summary="Translate Halegannada to Modern Kannada and English",
)
async def translate_halegannada_text(
    request: DirectTranslateRequest,
    analysis_svc: AnalysisService = Depends(get_analysis_service),
) -> TranslationResult:
    """
    Direct Neural Translation Endpoint.
    Translates uploaded Halegannada text using the fine-tuned Seq2Seq + LoRA model
    accelerated on your NVIDIA GeForce RTX 5050 Laptop GPU.
    """
    clean_text = request.text.strip()
    if not clean_text:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Input text cannot be empty."
        )

    try:
        script_enum = ScriptClassId(request.script)
    except ValueError:
        script_enum = ScriptClassId.KADAMBA

    try:
        lang_enum = SourceLanguageId(request.language)
    except ValueError:
        lang_enum = SourceLanguageId.PURVADA_HALEGANNADA

    logger.info("Executing neural translation for input: '%s' (Script: %s)", clean_text[:40], script_enum.value)

    result = analysis_svc.translator.translate(
        text=clean_text,
        script=script_enum,
        language=lang_enum
    )

    return result
