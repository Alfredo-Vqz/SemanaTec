from pydantic import BaseModel
from datetime  import datetime


class User(BaseModel):
    name: str
    email: str

class Reminder(BaseModel):
    email: str
    title: str
    description: str
    datetime: str