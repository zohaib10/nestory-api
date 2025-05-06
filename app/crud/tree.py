from sqlalchemy.orm import Session
from app.models.tree import Tree as TreeModel
from app.schemas.tree import TreeCreate

def create_tree(db: Session, tree: TreeCreate):
    new_tree = TreeModel(**tree.model_dump())
    db.add(new_tree)
    db.commit()
    db.refresh(new_tree)
    return new_tree
