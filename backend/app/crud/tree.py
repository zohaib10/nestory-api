from sqlalchemy.orm import Session

from app.models.tree import Tree as TreeModel
from app.schemas.tree import TreeCreate
from app.utils import transaction


def create_tree(db: Session, tree: TreeCreate):
    new_tree = TreeModel(**tree.model_dump())
    print("Here 0")
    db.add(new_tree)
    with transaction(db):
        print("Here 2")
        db.refresh(new_tree)
        print("Here 3")
        return new_tree
