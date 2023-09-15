from sqlalchemy import Boolean, Column, ForeignKey, Integer, String, DateTime
from sqlalchemy.sql import func
from database import Base

class User(Base):
    __tablename__ = "user"

    iduser = Column(Integer, primary_key=True, index=True)
    name = Column(String, nullable = False)
    email = Column(String)


    
