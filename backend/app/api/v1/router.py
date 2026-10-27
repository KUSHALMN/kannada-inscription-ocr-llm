from fastapi import APIRouter
from backend.app.api.v1.health import router as health_router
from backend.app.api.v1.scripts import router as scripts_router
from backend.app.api.v1.languages import router as languages_router
from backend.app.api.v1.inscriptions import router as inscriptions_router
from backend.app.api.v1.activity import router as activity_router
from backend.app.api.v1.lexicon import router as lexicon_router
from backend.app.api.v1.analysis import router as analysis_router
from backend.app.api.v1.jobs import router as jobs_router
from backend.app.api.v1.translate import router as translate_router

api_v1_router = APIRouter()

api_v1_router.include_router(health_router)
api_v1_router.include_router(scripts_router)
api_v1_router.include_router(languages_router)
api_v1_router.include_router(inscriptions_router)
api_v1_router.include_router(activity_router)
api_v1_router.include_router(lexicon_router)
api_v1_router.include_router(analysis_router)
api_v1_router.include_router(jobs_router)
api_v1_router.include_router(translate_router)

