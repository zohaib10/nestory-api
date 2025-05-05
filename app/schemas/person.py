
from pydantic import BaseModel

class Person(BaseModel):
    id: str
    full_name: str
    birth_date: str
    gender: str
    tree_id: str
    photo_url: str | None = None