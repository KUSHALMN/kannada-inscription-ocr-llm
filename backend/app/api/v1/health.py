from datetime import datetime
from fastapi import APIRouter
from backend.app.config import settings

router = APIRouter(tags=["Health"])


@router.get("/health", summary="System Health & Telemetry Check")
async def health_check():
    """
    Health check endpoint returning system status, timestamp, and version.
    """
    return {
        "status": "healthy",
        "appName": settings.APP_NAME,
        "version": settings.APP_VERSION,
        "timestamp": datetime.now().isoformat(),
        "environment": settings.APP_ENV,
        "inferenceDevice": settings.INFERENCE_DEVICE,
    }
