from sqlalchemy.orm import Session
from sqlalchemy.exc import IntegrityError, SQLAlchemyError
from contextlib import contextmanager
from app.core.exceptions import DatabaseOperationError


@contextmanager
def transaction(db: Session):
    try:
        print("Here bro 0")
        yield db
        print("Here bro 1")
        db.commit()
        print("Here bro 2")
    except IntegrityError as e:
        db.rollback()
        print(f"❌ IntegrityError during commit: {str(e)}")
        raise DatabaseOperationError(f"Integrity error: {str(e)}")
    except SQLAlchemyError as e:
        db.rollback()
        print(f"❌ SQLAlchemyError during commit: {str(e)}")
        raise DatabaseOperationError(f"Database error: {str(e)}")
    except Exception as e:
        db.rollback()
        print(f"❌ General Exception during commit: {str(e)}")
        raise DatabaseOperationError(f"Unknown error: {str(e)}")
