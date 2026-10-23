import shutil
import pytest
from fastapi.testclient import TestClient
from backend.app.main import app
from backend.app.config import settings
from backend.app.api.deps import (
    get_inscription_repository,
    get_activity_repository,
    get_script_repository,
    get_language_repository,
)
from backend.app.repositories.json_repository import (
    JsonFileInscriptionRepository,
    JsonFileActivityRepository,
    JsonFileScriptRepository,
    JsonFileLanguageRepository,
)


@pytest.fixture(scope="session")
def client(tmp_path_factory):
    """
    TestClient fixture using isolated test repositories cloned from backend/data.
    Guarantees permanent data files remain pristine during test mutations.
    """
    temp_dir = tmp_path_factory.mktemp("test_data")
    
    # Copy seed json files into temp directory
    shutil.copy(f"{settings.DATA_DIR}/inscriptions.json", f"{temp_dir}/inscriptions.json")
    shutil.copy(f"{settings.DATA_DIR}/activity.json", f"{temp_dir}/activity.json")
    shutil.copy(f"{settings.DATA_DIR}/scripts.json", f"{temp_dir}/scripts.json")
    shutil.copy(f"{settings.DATA_DIR}/languages.json", f"{temp_dir}/languages.json")

    test_ins_repo = JsonFileInscriptionRepository(file_path=f"{temp_dir}/inscriptions.json")
    test_act_repo = JsonFileActivityRepository(file_path=f"{temp_dir}/activity.json")
    test_scr_repo = JsonFileScriptRepository(file_path=f"{temp_dir}/scripts.json")
    test_lan_repo = JsonFileLanguageRepository(file_path=f"{temp_dir}/languages.json")

    app.dependency_overrides[get_inscription_repository] = lambda: test_ins_repo
    app.dependency_overrides[get_activity_repository] = lambda: test_act_repo
    app.dependency_overrides[get_script_repository] = lambda: test_scr_repo
    app.dependency_overrides[get_language_repository] = lambda: test_lan_repo

    with TestClient(app) as test_client:
        yield test_client

    app.dependency_overrides.clear()
