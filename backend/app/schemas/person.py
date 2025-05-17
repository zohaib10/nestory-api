from pydantic import BaseModel


class Person(BaseModel):
    id: str
    first_name: str
    last_name: str
    gender: str
    birth_date: str
    tree_id: str
    photo_url: str | None = None


class PersonCreate(BaseModel):
    first_name: str
    last_name: str
    birth_date: str
    gender: str
    tree_id: str
    photo_url: str | None = None
