import os
import time
from typing import List, Dict, Optional
from backend.app.config import settings
from backend.app.core.logging import logger


class StorageCleanupService:
    """
    Automated maintenance worker for purging uploaded rubbing images and
    ephemeral job files exceeding the retention period (retention_days).
    """

    def __init__(
        self,
        retention_days: Optional[int] = None,
        target_directories: Optional[List[str]] = None,
    ):
        self.retention_days = retention_days if retention_days is not None else getattr(settings, "UPLOAD_RETENTION_DAYS", 7)
        self.target_directories = target_directories or [
            getattr(settings, "STORAGE_UPLOADS_DIR", "backend/storage/uploads"),
            getattr(settings, "STORAGE_JOBS_DIR", "backend/storage/jobs"),
        ]

    def purge_expired_files(self, retention_days_override: Optional[int] = None) -> Dict[str, int]:
        """
        Scans target directories and unlinks any file older than retention_days.
        Preserves .gitkeep and non-file system descriptors.
        Returns metrics on deleted files count and total freed bytes.
        """
        days = retention_days_override if retention_days_override is not None else self.retention_days
        cutoff_epoch = time.time() - (days * 86400.0)
        deleted_count = 0
        freed_bytes = 0

        for directory in self.target_directories:
            if not os.path.exists(directory):
                continue

            try:
                for entry in os.scandir(directory):
                    if not entry.is_file() or entry.name.startswith("."):
                        continue

                    stat = entry.stat()
                    if stat.st_mtime < cutoff_epoch:
                        file_size = stat.st_size
                        try:
                            os.remove(entry.path)
                            deleted_count += 1
                            freed_bytes += file_size
                            logger.info("Purged expired artifact: %s (age: %.1f days, %d bytes)", entry.path, (time.time() - stat.st_mtime) / 86400.0, file_size)
                        except OSError as e:
                            logger.warning("Could not delete expired file %s: %s", entry.path, e)
            except Exception as scan_err:
                logger.error("Error scanning directory %s during cleanup: %s", directory, scan_err)

        logger.info("Storage cleanup cycle completed: %d files removed, %d bytes freed (retention: %d days)", deleted_count, freed_bytes, days)
        return {
            "deleted_files": deleted_count,
            "freed_bytes": freed_bytes,
            "retention_days": days,
        }


cleanup_service = StorageCleanupService()
