from datetime import datetime
from typing import Optional
from fastapi import APIRouter
from backend.app.config import settings
from backend.app.schemas import HealthResponse

router = APIRouter(tags=["Health"])


def inspect_gpu_telemetry() -> tuple[bool, bool, str, int, Optional[float], Optional[float]]:
    """
    Safely inspects PyTorch and CUDA availability without hard dependencies.
    Returns (torch_available, gpu_available, device_name, device_count, vram_allocated_mb, vram_total_mb).
    """
    try:
        import torch
        torch_available = True
        gpu_available = torch.cuda.is_available()
        if gpu_available:
            device_name = torch.cuda.get_device_name(0)
            device_count = torch.cuda.device_count()
            vram_allocated_mb = round(torch.cuda.memory_allocated(0) / (1024 * 1024), 2)
            vram_total_mb = round(torch.cuda.get_device_properties(0).total_memory / (1024 * 1024), 2)
        else:
            device_name = "CPU (CUDA not active)"
            device_count = 0
            vram_allocated_mb = None
            vram_total_mb = None
        return torch_available, gpu_available, device_name, device_count, vram_allocated_mb, vram_total_mb
    except ImportError:
        return False, False, "CPU (PyTorch not installed)", 0, None, None
    except Exception as e:
        return True, False, f"CPU (GPU check error: {str(e)})", 0, None, None


@router.get("/health", response_model=HealthResponse, summary="System Health & Telemetry Check")
async def health_check() -> HealthResponse:
    """
    Comprehensive telemetry check reporting system status, active adapter mode,
    CUDA/GPU acceleration status, device name, VRAM allocations, and model loading flags.
    """
    torch_avail, gpu_avail, dev_name, dev_count, vram_alloc, vram_total = inspect_gpu_telemetry()

    # In mock/demonstration mode, all mock adapters are loaded and ready by contract
    model_flags = {
        "preprocessor": True,
        "segmenter": True,
        "classifier": True,
        "recognizer": True,
        "transliterator": True,
        "translator": True,
    }

    return HealthResponse(
        status="healthy",
        app_name=settings.APP_NAME,
        version=settings.APP_VERSION,
        timestamp=datetime.now().isoformat(),
        environment=settings.APP_ENV,
        adapter_mode=settings.ADAPTER_MODE,
        torch_available=torch_avail,
        gpu_available=gpu_avail,
        device_name=dev_name,
        device_count=dev_count,
        vram_allocated_mb=vram_alloc,
        vram_total_mb=vram_total,
        model_loaded_flags=model_flags,
    )
