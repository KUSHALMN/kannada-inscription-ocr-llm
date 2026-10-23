import os
from contextlib import asynccontextmanager
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from fastapi.exceptions import RequestValidationError
from starlette.exceptions import HTTPException as StarletteHTTPException

from backend.app.config import settings
from backend.app.core.logging import setup_logging, logger
from backend.app.core.exceptions import (
    EpigraphyException,
    epigraphy_exception_handler,
    validation_exception_handler,
    http_exception_handler,
    global_exception_handler,
)
from backend.app.api.v1.router import api_v1_router


@asynccontextmanager
async def lifespan(app: FastAPI):
    """Application lifespan context for initialization and cleanup."""
    setup_logging()
    logger.info("Initializing %s (v%s)", settings.APP_NAME, settings.APP_VERSION)
    logger.info("CORS Allowed Origins: %s", settings.CORS_ORIGINS)
    os.makedirs(settings.UPLOAD_DIR, exist_ok=True)
    yield
    logger.info("Shutting down %s", settings.APP_NAME)


def create_application() -> FastAPI:
    """FastAPI application factory for Kannada Heritage AI."""
    app = FastAPI(
        title=settings.APP_NAME,
        version=settings.APP_VERSION,
        description=(
            "Institutional-grade computational paleography and epigraphical translation workbench "
            "for Indian archaeological and Kannada heritage research."
        ),
        lifespan=lifespan,
    )

    # 1. Configure CORS
    app.add_middleware(
        CORSMiddleware,
        allow_origins=settings.CORS_ORIGINS,
        allow_credentials=True,
        allow_methods=["*"],
        allow_headers=["*"],
    )

    # 2. Register Global Exception Handlers
    app.add_exception_handler(EpigraphyException, epigraphy_exception_handler)
    app.add_exception_handler(RequestValidationError, validation_exception_handler)
    app.add_exception_handler(StarletteHTTPException, http_exception_handler)
    app.add_exception_handler(Exception, global_exception_handler)

    # 3. Mount Static Uploads
    if os.path.exists(settings.UPLOAD_DIR):
        app.mount("/uploads", StaticFiles(directory=settings.UPLOAD_DIR), name="uploads")

    # 4. Include API v1 Router with prefix and root convenience
    app.include_router(api_v1_router, prefix="/api/v1")
    app.include_router(api_v1_router)

    return app


app = create_application()
