from sqlalchemy.orm import Session

from model import usermodel
from schema import reminderschema

def create_reminder(db: Session, reminder: reminderschema.Reminder):
    db_reminder = usermodel.Reminder(email=reminder.email,title=reminder.title,description=reminder.description, datetime=reminder.datetime)
    db.add(db_reminder)
    db.commit()
    db.refresh(db_reminder)
    return db_reminder