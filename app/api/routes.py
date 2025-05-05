from fastapi import APIRouter
from app.schemas.person import Person

router = APIRouter()

@router.get("/hello")
def hello():
    return {"message": "Hello, FastAPI!"}

@router.post("/person")
def create_person(person: Person):
    return {"received": person}
