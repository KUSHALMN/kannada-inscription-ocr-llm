import asyncio
import json
import os
import time
import uuid
from dataclasses import dataclass, field
from datetime import datetime
from typing import Optional, Dict, List, Literal
from PIL import Image

from backend.app.config import settings
from backend.app.core.logging import logger
from backend.app.schemas import (
    AnalysisJobResult,
    JobStatusResponse,
    ResearchActivityItem,
    ActivityType,
)
from backend.app.services.analysis_service import AnalysisService, analysis_service
from backend.app.repositories.base import ActivityRepository
from backend.app.api.deps import get_activity_repository


@dataclass
class JobRecord:
    """Internal in-memory representation of an epigraphical analysis job."""
    job_id: str
    status: Literal['queued', 'running', 'completed', 'failed', 'partial'] = "queued"
    progress: int = 0
    current_step: Optional[str] = "queued"
    result: Optional[AnalysisJobResult] = None
    error_message: Optional[str] = None
    created_at: float = field(default_factory=time.time)
    updated_at: float = field(default_factory=time.time)

    # Ingestion context for pipeline execution
    image_path: Optional[str] = None
    title: Optional[str] = None
    location: Optional[str] = None
    dynasty: Optional[str] = None
    approximate_date: Optional[str] = None
    known_script: Optional[str] = None
    known_language: Optional[str] = None
    researcher_notes: Optional[str] = None

    def to_response(self) -> JobStatusResponse:
        """Converts internal record into the public JobStatusResponse schema."""
        created_dt = datetime.fromtimestamp(self.created_at).isoformat()
        updated_dt = datetime.fromtimestamp(self.updated_at).isoformat()
        return JobStatusResponse(
            job_id=self.job_id,
            status=self.status,
            progress=self.progress,
            current_step=self.current_step,
            result=self.result,
            error_message=self.error_message,
            created_at=created_dt,
            updated_at=updated_dt,
        )


class JobQueueManager:
    """
    Manages in-memory job state with TTL eviction, a single-worker asyncio queue
    (configurable concurrency for GPU workloads), and JSON persistence to disk
    so completed jobs survive server restarts.
    """

    def __init__(
        self,
        concurrency: Optional[int] = None,
        ttl_seconds: Optional[int] = None,
        storage_dir: Optional[str] = None,
        service: Optional[AnalysisService] = None,
    ):
        self.concurrency = concurrency or getattr(settings, "JOB_CONCURRENCY", 1)
        self.ttl_seconds = ttl_seconds or getattr(settings, "JOB_TTL_SECONDS", 3600)
        self.storage_dir = storage_dir or getattr(settings, "STORAGE_JOBS_DIR", "backend/storage/jobs")
        self._custom_service = service

        self._jobs: Dict[str, JobRecord] = {}
        self._queue: asyncio.Queue = asyncio.Queue()
        self._worker_tasks: List[asyncio.Task] = []
        self._lock = asyncio.Lock()
        self._is_running = False

        os.makedirs(self.storage_dir, exist_ok=True)

    @property
    def analysis_svc(self) -> AnalysisService:
        if self._custom_service is not None:
            return self._custom_service
        try:
            from backend.app.main import app
            from backend.app.api.deps import get_analysis_service
            if get_analysis_service in app.dependency_overrides:
                return app.dependency_overrides[get_analysis_service]()
        except Exception:
            pass
        return analysis_service


    async def start(self) -> None:
        """Starts background worker tasks according to configured concurrency."""
        async with self._lock:
            if self._is_running:
                return
            self._is_running = True
            logger.info("Starting JobQueueManager with concurrency=%d workers", self.concurrency)
            for i in range(self.concurrency):
                task = asyncio.create_task(self._worker_loop(worker_id=i + 1))
                self._worker_tasks.append(task)

    async def stop(self) -> None:
        """Cancels background worker tasks gracefully."""
        async with self._lock:
            self._is_running = False
            for task in self._worker_tasks:
                task.cancel()
            self._worker_tasks.clear()
            logger.info("JobQueueManager stopped.")

    def _ensure_started(self) -> None:
        """Guarantees background workers are running when in async event loop."""
        try:
            loop = asyncio.get_running_loop()
            if not self._is_running:
                loop.create_task(self.start())
        except RuntimeError:
            pass

    async def enqueue(
        self,
        job_id: str,
        image_path: str,
        title: Optional[str] = None,
        location: Optional[str] = None,
        dynasty: Optional[str] = None,
        approximate_date: Optional[str] = None,
        known_script: Optional[str] = None,
        known_language: Optional[str] = None,
        researcher_notes: Optional[str] = None,
    ) -> JobStatusResponse:
        """Registers a new job in the queue and returns initial queued status."""
        self._ensure_started()
        self._cleanup_expired_jobs()

        now = time.time()
        record = JobRecord(
            job_id=job_id,
            status="queued",
            progress=0,
            current_step="queued",
            created_at=now,
            updated_at=now,
            image_path=image_path,
            title=title,
            location=location,
            dynasty=dynasty,
            approximate_date=approximate_date,
            known_script=known_script,
            known_language=known_language,
            researcher_notes=researcher_notes,
        )
        self._jobs[job_id] = record
        await self._queue.put(job_id)
        logger.info("[%s] Enqueued analysis job into asyncio queue (queue size: %d)", job_id, self._queue.qsize())
        return record.to_response()

    async def get_job(self, job_id: str) -> Optional[JobStatusResponse]:
        """
        Retrieves job status and result.
        Checks in-memory store first; falls back to storage/jobs/{jobId}.json
        so finished jobs survive server restarts or TTL pruning.
        """
        self._cleanup_expired_jobs()

        # 1. Check in-memory store
        if job_id in self._jobs:
            return self._jobs[job_id].to_response()

        # 2. Check persisted disk storage
        disk_path = os.path.join(self.storage_dir, f"{job_id}.json")
        if os.path.exists(disk_path):
            try:
                with open(disk_path, "r", encoding="utf-8") as f:
                    data = json.load(f)
                return JobStatusResponse.model_validate(data)
            except Exception as e:
                logger.warning("[%s] Error loading persisted job from %s: %s", job_id, disk_path, e)

        return None

    def _cleanup_expired_jobs(self) -> None:
        """Evicts completed/failed jobs from memory if they exceed the configured TTL."""
        now = time.time()
        expired_ids = [
            jid for jid, rec in self._jobs.items()
            if rec.status in ("completed", "partial", "failed") and (now - rec.updated_at) > self.ttl_seconds
        ]
        for jid in expired_ids:
            # Ensure saved to disk before in-memory eviction
            self._persist_to_disk(self._jobs[jid])
            del self._jobs[jid]
            logger.debug("[%s] Evicted expired job from in-memory cache (TTL %ds)", jid, self.ttl_seconds)

    def _persist_to_disk(self, record: JobRecord) -> None:
        """Atomically saves job payload to storage/jobs/{jobId}.json."""
        try:
            os.makedirs(self.storage_dir, exist_ok=True)
            target_path = os.path.join(self.storage_dir, f"{record.job_id}.json")
            tmp_path = f"{target_path}.tmp.{uuid.uuid4().hex[:6]}"

            payload = record.to_response().model_dump(by_alias=True)
            with open(tmp_path, "w", encoding="utf-8") as f:
                json.dump(payload, f, ensure_ascii=False, indent=2)

            os.replace(tmp_path, target_path)
            logger.info("[%s] Persisted finished job to %s", record.job_id, target_path)
        except Exception as e:
            logger.error("[%s] Failed to persist job to disk: %s", record.job_id, e, exc_info=True)

    async def _worker_loop(self, worker_id: int) -> None:
        """Single-worker consumer loop executing jobs sequentially from asyncio.Queue."""
        logger.info("Worker #%d started and ready for analysis jobs.", worker_id)
        while True:
            job_id = await self._queue.get()
            try:
                record = self._jobs.get(job_id)
                if not record:
                    logger.warning("[Worker #%d] Job %s missing from store, skipping.", worker_id, job_id)
                    continue

                await self._process_job(record, worker_id)
            except asyncio.CancelledError:
                break
            except Exception as e:
                logger.error("[Worker #%d] Uncaught exception processing job %s: %s", worker_id, job_id, e, exc_info=True)
            finally:
                self._queue.task_done()

    async def _process_job(self, record: JobRecord, worker_id: int) -> None:
        """Executes the analysis pipeline with progress updates and failure resilience."""
        job_id = record.job_id
        record.status = "running"
        record.progress = 5
        record.current_step = "initializing"
        record.updated_at = time.time()
        logger.info("[Worker #%d] Starting execution for job %s", worker_id, job_id)

        async def step_callback(step_name: str, pct: int):
            record.current_step = step_name
            record.progress = pct
            record.updated_at = time.time()
            logger.debug("[%s] Progress: %d%% (step: %s)", job_id, pct, step_name)

        try:
            if not record.image_path or not os.path.exists(record.image_path):
                raise FileNotFoundError(f"Upload image file not found at: {record.image_path}")

            image = Image.open(record.image_path)
            result = await self.analysis_svc.execute_pipeline(
                image=image,
                job_id=job_id,
                title=record.title,
                location=record.location,
                dynasty=record.dynasty,
                approximate_date=record.approximate_date,
                known_script=record.known_script,
                known_language=record.known_language,
                researcher_notes=record.researcher_notes,
                on_step_progress=step_callback,
            )

            record.status = result.status
            record.progress = 100
            record.current_step = "completed"
            record.result = result
            record.error_message = result.error_message
            record.updated_at = time.time()

            # Record research activity
            try:
                from backend.app.main import app
                from backend.app.api.deps import get_activity_repository
                if get_activity_repository in app.dependency_overrides:
                    act_repo: ActivityRepository = app.dependency_overrides[get_activity_repository]()
                else:
                    act_repo: ActivityRepository = get_activity_repository()
                activity = ResearchActivityItem(
                    id=f"act-{uuid.uuid4().hex[:8]}",
                    timestamp=datetime.now().strftime("%d %b %Y, %H:%M"),
                    type=ActivityType.RUBBING_CATALOGUED,
                    title=f"Rubbing Analyzed ({result.status.title()}): {record.title or job_id}",
                    description=f"Async inference finished with status '{result.status}'. Inferred script: {result.inferred_script.value}.",
                    scholar="Automated Computational Paleography Pipeline",
                    inscription_id=job_id,
                    inscription_title=record.title or "Newly Ingested Epigraphical Record",
                )
                await act_repo.add(activity)
            except Exception as act_err:
                logger.warning("[%s] Could not record activity: %s", job_id, act_err)

            # Persist to storage/jobs/{jobId}.json
            self._persist_to_disk(record)
            logger.info("[Worker #%d] Job %s completed with status '%s'", worker_id, job_id, record.status)

        except Exception as e:
            logger.error("[Worker #%d] Job %s failed: %s", worker_id, job_id, e, exc_info=True)
            record.status = "failed"
            record.progress = 100
            record.current_step = "failed"
            record.error_message = str(e)
            record.updated_at = time.time()
            self._persist_to_disk(record)


# Singleton instance
job_manager = JobQueueManager()
