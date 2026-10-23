import logging
import sys
from backend.app.config import settings


def setup_logging():
    """
    Configures structured logging for Kannada Heritage AI backend.
    Ensures unified formatting across all modules without print statements.
    """
    log_format = "[%(asctime)s] [%(levelname)s] [%(name)s:%(lineno)d] - %(message)s"
    date_format = "%Y-%m-%d %H:%M:%S"

    log_level = getattr(logging, settings.LOG_LEVEL.upper(), logging.INFO)

    logging.basicConfig(
        level=log_level,
        format=log_format,
        datefmt=date_format,
        handlers=[
            logging.StreamHandler(sys.stdout)
        ]
    )

    # Silence excessively noisy external libraries
    logging.getLogger("uvicorn.access").setLevel(logging.WARNING)
    logging.getLogger("uvicorn.error").setLevel(logging.INFO)


logger = logging.getLogger("epigraphy_backend")
