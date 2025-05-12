from sqlalchemy import create_engine
from sqlalchemy.orm import declarative_base, sessionmaker
from sqlalchemy.exc import OperationalError
from app.core import settings, DatabaseConnectionError


Base = declarative_base()

# Create the engine with better error handling
try:
    engine = create_engine(settings.DATABASE_URL, pool_pre_ping=True)
except OperationalError:
    raise DatabaseConnectionError("Could not connect to the database during startup.")

SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)


def get_db():
    try:
        db = SessionLocal()
        yield db
    except OperationalError:
        raise DatabaseConnectionError("Failed to acquire a database session.")
    finally:
        db.close()
