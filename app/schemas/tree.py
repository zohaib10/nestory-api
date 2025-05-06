from pydantic import BaseModel


class Tree(BaseModel):
    id: str
    title: str
    owner_id: int


class TreeCreate(BaseModel):
    title: str
    owner_id: int
