from fastapi import APIRouter, Depends, HTTPException, status
from backend.app.schemas import JobStatusResponse
from backend.app.services.job_manager import JobQueueManager
from backend.app.api.deps import get_job_manager
from backend.app.core.logging import logger

router = APIRouter(prefix="/jobs", tags=["Jobs"])


@router.get(
    "/{job_id}",
    response_model=JobStatusResponse,
    summary="Get Asynchronous Analysis Job Status and Result",
)
async def get_job_status(
    job_id: str,
    job_mgr: JobQueueManager = Depends(get_job_manager),
) -> JobStatusResponse:
    """
    Returns the real-time status of an asynchronous analysis job.
    Includes status (queued|running|completed|failed|partial), progress (0-100),
    currentStep, and the result when done.
    Recovers from storage/jobs/{jobId}.json if job was evicted from memory or after restart.
    """
    job = await job_mgr.get_job(job_id)
    if not job:
        logger.warning("Job status lookup failed: job '%s' not found.", job_id)
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Analysis job '{job_id}' not found."
        )
    return job
