from sqlalchemy import Boolean, Column, ForeignKey, Integer, String, DateTime
from sqlalchemy.sql import func
from database import Base

class Reminder(Base):
    __tablemame__ = "reminder"

    idreminder = Column(Integer, primary_key=True, index=True)
    email = Column(String)
    title = Column(String)
    description = Column(String)
    datetime = Column(String)