from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.crud import tree as Tree
from app.db.database import get_db
from app.schemas.tree import TreeCreate

router = APIRouter()


@router.post("/tree")
def create(tree: TreeCreate, db: Session = Depends(get_db)):
    return Tree.create_tree(db, tree)
