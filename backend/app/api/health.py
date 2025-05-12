from fastapi import APIRouter
from app.db.database import engine

router = APIRouter()


@router.get("/health")
async def health_check():
    try:
        with engine.connect() as conn:
            return {"status": "ok"}
    except Exception:
        return {"status": "db down"}, 500
