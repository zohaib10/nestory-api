from sqlalchemy.orm import Session

from app.models.person import Person as PersonModel
from app.schemas.person import PersonCreate


def create_person(db: Session, person: PersonCreate):
    db_person = PersonModel(**person.model_dump())
    db.add(db_person)
    db.commit()
    db.refresh(db_person)
    return db_person
