from fastapi import APIRouter, Depends
from app.schemas.person import PersonCreate
from sqlalchemy.orm import Session
from app.db.database import get_db
from app.crud import person as Person

router = APIRouter()


@router.post("/person")
def create(person: PersonCreate, db: Session = Depends(get_db)):
    return Person.create_person(db, person)
