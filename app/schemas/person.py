from pydantic import BaseModel
from typing import Optional

class Person(BaseModel):
    id: int
    name: str
    relationship: Optional[str] = None
