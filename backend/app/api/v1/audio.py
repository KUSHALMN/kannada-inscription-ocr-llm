"""
Server-Side Audio Recitation API Endpoints
Guarantees 100% audio playback reliability across all mobile devices, tablets, and desktop browsers
without depending on local device OS speech synthesis packs.
"""

from typing import Optional
from pydantic import BaseModel, Field
from fastapi import APIRouter, Depends, Query, Response, status, HTTPException

from backend.app.services.audio_service import EpigraphAudioService
from backend.app.api.deps import get_audio_service
from backend.app.core.logging import logger

router = APIRouter(prefix="/audio", tags=["Audio Recitation"])


class AudioSynthesizeRequest(BaseModel):
    text: str = Field(..., description="Kannada text or Halegannada inscription to recite")
    style: Optional[str] = Field("ancient_meter", description="'ancient_meter' (classical chanting) or 'modern_hosagannada' (contemporary)")
    lang: Optional[str] = Field("kn", description="Language code (default: 'kn' for Kannada)")


@router.get(
    "/recite",
    summary="Stream Inscription Audio Recitation (GET)",
    description="Streams binary audio (audio/mpeg or audio/wav) suitable for direct HTML5 <audio> elements.",
)
async def stream_recitation(
    text: str = Query(..., description="Kannada text or inscription to recite"),
    style: str = Query("ancient_meter", description="'ancient_meter' or 'modern_hosagannada'"),
    lang: str = Query("kn", description="Language code (default: 'kn')"),
    audio_svc: EpigraphAudioService = Depends(get_audio_service),
):
    clean_text = text.strip()
    if not clean_text:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Text parameter cannot be empty."
        )

    audio_bytes, media_type = audio_svc.synthesize_audio(
        text=clean_text,
        style=style,
        lang=lang,
    )

    filename = "recitation.mp3" if "mpeg" in media_type else "recitation.wav"

    return Response(
        content=audio_bytes,
        media_type=media_type,
        headers={
            "Content-Disposition": f'inline; filename="{filename}"',
            "Cache-Control": "public, max-age=86400, immutable",
            "Accept-Ranges": "bytes",
            "Content-Length": str(len(audio_bytes)),
            "X-Epigraph-Prosody": style,
        },
    )


@router.post(
    "/synthesize",
    summary="Synthesize Inscription Audio (POST)",
    description="Post payload to generate binary audio stream with custom verse styling.",
)
async def post_synthesize_audio(
    payload: AudioSynthesizeRequest,
    audio_svc: EpigraphAudioService = Depends(get_audio_service),
):
    clean_text = payload.text.strip()
    if not clean_text:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Text field cannot be empty."
        )

    audio_bytes, media_type = audio_svc.synthesize_audio(
        text=clean_text,
        style=payload.style or "ancient_meter",
        lang=payload.lang or "kn",
    )

    filename = "recitation.mp3" if "mpeg" in media_type else "recitation.wav"

    return Response(
        content=audio_bytes,
        media_type=media_type,
        headers={
            "Content-Disposition": f'inline; filename="{filename}"',
            "Cache-Control": "public, max-age=86400",
            "Accept-Ranges": "bytes",
            "Content-Length": str(len(audio_bytes)),
        },
    )


@router.get(
    "/stats",
    summary="Audio Service Cache Metrics",
    description="Returns LRU audio cache hit/miss statistics.",
)
async def get_audio_stats(
    audio_svc: EpigraphAudioService = Depends(get_audio_service),
):
    return audio_svc.get_stats()
