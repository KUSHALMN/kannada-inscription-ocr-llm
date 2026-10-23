import time
from collections import defaultdict
from typing import Dict, List
from fastapi import Request, HTTPException, status
from backend.app.config import settings
from backend.app.core.logging import logger


class InMemoryRateLimiter:
    """
    Sliding-window in-memory rate limiter per client IP address.
    Requires no external Redis instance, making it completely self-contained.
    """

    def __init__(self, requests_per_minute: int = 60):
        self.requests_per_minute = requests_per_minute
        self._history: Dict[str, List[float]] = defaultdict(list)

    def check(self, client_ip: str) -> None:
        now = time.time()
        window_start = now - 60.0
        limit = getattr(settings, "RATE_LIMIT_ANALYZE_PER_MINUTE", self.requests_per_minute)

        # Filter out timestamps outside the 60s sliding window
        valid_timestamps = [t for t in self._history[client_ip] if t > window_start]
        self._history[client_ip] = valid_timestamps

        if len(valid_timestamps) >= limit:
            retry_after = int(60.0 - (now - valid_timestamps[0])) + 1
            logger.warning("Rate limit of %d/min exceeded for client IP '%s'. Retry-After: %ds", limit, client_ip, retry_after)
            raise HTTPException(
                status_code=status.HTTP_429_TOO_MANY_REQUESTS,
                detail=f"Analysis request rate limit exceeded ({limit} requests/minute). Please wait {retry_after} seconds.",
                headers={"Retry-After": str(max(1, retry_after))},
            )

        self._history[client_ip].append(now)

    def reset(self) -> None:
        """Clears all client history (useful in tests)."""
        self._history.clear()


# Global rate limiter instance for analysis endpoints
analyze_rate_limiter = InMemoryRateLimiter()


async def check_analyze_rate_limit(request: Request) -> None:
    """
    FastAPI dependency enforcing rate limits on /analyze endpoints.
    Identifies clients by X-Forwarded-For or client host IP.
    """
    forwarded = request.headers.get("X-Forwarded-For")
    if forwarded:
        client_ip = forwarded.split(",")[0].strip()
    else:
        client_ip = request.client.host if request.client else "127.0.0.1"

    analyze_rate_limiter.check(client_ip)
