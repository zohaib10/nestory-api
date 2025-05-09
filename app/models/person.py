from sqlalchemy import Column, Date, ForeignKey, Integer, String
from sqlalchemy.orm import relationship

from app.db.database import Base


class Person(Base):
    __tablename__ = "persons"

    id = Column(Integer, primary_key=True, index=True)
    first_name = Column(String, index=True)
    last_name = Column(String, index=True)
    birth_date = Column(Date)
    gender = Column(String)
    photo_url = Column(String, nullable=True)
    tree_id = Column(Integer, ForeignKey("trees.id"), nullable=False)

    tree = relationship("Tree", back_populates="people")
