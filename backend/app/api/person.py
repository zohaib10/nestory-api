from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.crud import person as Person
from app.db.database import get_db
from app.schemas.person import PersonCreate

router = APIRouter()


@router.post("/person")
def create(person: PersonCreate, db: Session = Depends(get_db)):
    print("Got request for Person")
    return Person.create_person(db, person)
