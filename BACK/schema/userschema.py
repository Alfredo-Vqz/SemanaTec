from pydantic import BaseModel
from datetime  import datetime


class User(BaseModel):
    name: str
    descripcion: str
    email: str
    fecha_hora: datetime