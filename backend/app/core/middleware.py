import uuid
from starlette.middleware.base import BaseHTTPMiddleware
from starlette.requests import Request
from starlette.responses import Response
from backend.app.core.logging import logger


class RequestIdMiddleware(BaseHTTPMiddleware):
    """
    Middleware that ensures every incoming request has a unique correlation ID.
    Reads X-Request-ID header if provided by client/proxy; otherwise generates a new one.
    Attaches X-Request-ID to the response headers and request state.
    """

    HEADER_NAME = "X-Request-ID"

    async def dispatch(self, request: Request, call_next) -> Response:
        # 1. Extract or generate request ID
        request_id = request.headers.get(self.HEADER_NAME)
        if not request_id or not request_id.strip():
            request_id = f"req-{uuid.uuid4().hex[:12]}"

        # 2. Store in request state for access in route handlers and logging
        request.state.request_id = request_id

        # 3. Process downstream request
        response: Response = await call_next(request)

        # 4. Attach to response headers
        response.headers[self.HEADER_NAME] = request_id

        return response
