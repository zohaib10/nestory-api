from fastapi import APIRouter, Depends
from app.schemas.tree import TreeCreate
from sqlalchemy.orm import Session
from app.db.database import get_db
from app.crud import tree as Tree

router = APIRouter()

@router.post("/tree")
def create(tree: TreeCreate, db: Session = Depends(get_db)):
    return Tree.create_tree(db, tree)
