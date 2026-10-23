import os
from typing import List, Union
from pydantic import field_validator
from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    """
    Application Settings for Kannada Heritage AI Backend.
    Loads configurations from environment variables or .env file.
    """
    model_config = SettingsConfigDict(
        env_file=".env",
        env_file_encoding="utf-8",
        extra="ignore"
    )

    APP_NAME: str = "Kannada Heritage AI - Epigraphy Backend"
    APP_VERSION: str = "1.0.0"
    APP_ENV: str = "development"
    DEBUG: bool = True
    PORT: int = 8000
    HOST: str = "0.0.0.0"

    # CORS origins list
    CORS_ORIGINS: Union[List[str], str] = [
        "http://localhost:3000",
        "http://localhost:5173",
        "http://127.0.0.1:5173",
        "http://localhost:8000"
    ]

    LOG_LEVEL: str = "INFO"
    LOG_FORMAT: str = "text"

    DATA_DIR: str = os.path.join(os.path.dirname(os.path.dirname(__file__)), "data")
    UPLOAD_DIR: str = os.path.join(os.path.dirname(os.path.dirname(__file__)), "uploads")
    STORAGE_UPLOADS_DIR: str = os.path.join(os.path.dirname(os.path.dirname(__file__)), "storage", "uploads")

    INFERENCE_DEVICE: str = "cpu"
    MOCK_INFERENCE: bool = False
    ADAPTER_MODE: str = "mock"  # "mock" or "local"

    @field_validator("CORS_ORIGINS", mode="before")
    @classmethod
    def assemble_cors_origins(cls, v: Union[str, List[str]]) -> List[str]:
        if isinstance(v, str):
            return [i.strip() for i in v.split(",") if i.strip()]
        return v


settings = Settings()
