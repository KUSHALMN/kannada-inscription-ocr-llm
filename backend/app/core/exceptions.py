from typing import Any, Dict
from fastapi import Request, status
from fastapi.responses import JSONResponse
from fastapi.exceptions import RequestValidationError
from starlette.exceptions import HTTPException as StarletteHTTPException
from backend.app.core.logging import logger


class EpigraphyException(Exception):
    """Base exception for epigraphy domain errors."""
    def __init__(self, message: str, code: str = "EPIGRAPHY_ERROR", status_code: int = status.HTTP_400_BAD_REQUEST):
        self.message = message
        self.code = code
        self.status_code = status_code
        super().__init__(message)


class ResourceNotFoundException(EpigraphyException):
    def __init__(self, message: str, code: str = "RESOURCE_NOT_FOUND"):
        super().__init__(message=message, code=code, status_code=status.HTTP_404_NOT_FOUND)


class ModelInferenceException(EpigraphyException):
    def __init__(self, message: str, code: str = "INFERENCE_FAILED"):
        super().__init__(message=message, code=code, status_code=status.HTTP_500_INTERNAL_SERVER_ERROR)


async def epigraphy_exception_handler(request: Request, exc: EpigraphyException) -> JSONResponse:
    logger.error("Epigraphy domain error on %s: %s (code=%s)", request.url.path, exc.message, exc.code)
    return JSONResponse(
        status_code=exc.status_code,
        content={"error": {"code": exc.code, "message": exc.message}}
    )


async def validation_exception_handler(request: Request, exc: RequestValidationError) -> JSONResponse:
    details = exc.errors()
    message = "; ".join([f"{'.'.join(str(loc) for loc in err['loc'])}: {err['msg']}" for err in details])
    logger.warning("Validation error on %s: %s", request.url.path, message)
    return JSONResponse(
        status_code=status.HTTP_422_UNPROCESSABLE_ENTITY,
        content={"error": {"code": "VALIDATION_ERROR", "message": message}}
    )


async def http_exception_handler(request: Request, exc: StarletteHTTPException) -> JSONResponse:
    logger.warning("HTTP error on %s: %s (status=%d)", request.url.path, exc.detail, exc.status_code)
    code_map = {
        404: "NOT_FOUND",
        401: "UNAUTHORIZED",
        403: "FORBIDDEN",
        405: "METHOD_NOT_ALLOWED",
        422: "UNPROCESSABLE_ENTITY",
        500: "INTERNAL_SERVER_ERROR",
    }
    code = code_map.get(exc.status_code, f"HTTP_{exc.status_code}")
    return JSONResponse(
        status_code=exc.status_code,
        content={"error": {"code": code, "message": str(exc.detail)}}
    )


async def global_exception_handler(request: Request, exc: Exception) -> JSONResponse:
    logger.exception("Unhandled server exception on %s: %s", request.url.path, str(exc))
    return JSONResponse(
        status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
        content={"error": {"code": "INTERNAL_SERVER_ERROR", "message": "An unexpected error occurred during processing."}}
    )
