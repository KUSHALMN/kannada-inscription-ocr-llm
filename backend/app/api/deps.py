from functools import lru_cache
from backend.app.repositories.base import (
    InscriptionRepository,
    ActivityRepository,
    ScriptRepository,
    LanguageRepository,
)
from backend.app.repositories.json_repository import (
    JsonFileInscriptionRepository,
    JsonFileActivityRepository,
    JsonFileScriptRepository,
    JsonFileLanguageRepository,
)


@lru_cache()
def get_inscription_repository() -> InscriptionRepository:
    """
    Dependency provider for InscriptionRepository.
    Returns singleton JsonFileInscriptionRepository.
    Easily swappable with a future SQL repository via FastAPI dependency_overrides.
    """
    return JsonFileInscriptionRepository()


@lru_cache()
def get_activity_repository() -> ActivityRepository:
    """
    Dependency provider for ActivityRepository.
    Returns singleton JsonFileActivityRepository.
    """
    return JsonFileActivityRepository()


@lru_cache()
def get_script_repository() -> ScriptRepository:
    """
    Dependency provider for ScriptRepository.
    Returns singleton JsonFileScriptRepository.
    """
    return JsonFileScriptRepository()


@lru_cache()
def get_language_repository() -> LanguageRepository:
    """
    Dependency provider for LanguageRepository.
    Returns singleton JsonFileLanguageRepository.
    """
    return JsonFileLanguageRepository()


def get_analysis_service():
    """
    Dependency provider for AnalysisService.
    Can be overridden in tests to simulate adapter failure modes or alternative ML backends.
    """
    from backend.app.services.analysis_service import analysis_service
    return analysis_service

