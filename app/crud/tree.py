from sqlalchemy.orm import Session

from app.models.tree import Tree as TreeModel
from app.schemas.tree import TreeCreate
from app.core import DatabaseConnectionError


def create_tree(db: Session, tree: TreeCreate):
    try:
        new_tree = TreeModel(**tree.model_dump())
        db.add(new_tree)
        db.commit()
        db.refresh(new_tree)
        return new_tree
    except Exception:
        raise DatabaseConnectionError("unable to create a new tree.")
