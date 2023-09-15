from pydantic import BaseModel
from datetime  import datetime

class Reminder(BaseModel):
    email: str
    title: str
    description: str
    datetime: str