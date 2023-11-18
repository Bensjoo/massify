from typing import List
from pydantic import BaseModel
from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app import models
from app.database import get_db

router = APIRouter()


class UserBase(BaseModel):
    nick_name: str
    is_admin: bool


class UserModel(UserBase):
    id: int

    class Config:
        orm_mode = True


@router.post('/new/', response_model=UserModel)
async def create_user(user: UserBase, db: Session = Depends(get_db)):
    db_user = models.User(**user.model_dump())
    db.add(db_user)
    db.commit()

    # for us to return list of users?
    db.refresh(db_user)
    return db_user


@router.get('/', response_model=List[UserModel])
async def get_users(db: Session = Depends(get_db)):
    users = db.query(models.User).all()
    return users


@router.delete('/delete/')
async def delete_by_id(id: int, db: Session = Depends(get_db)):
    db.query(models.User).filter(models.User.id == id).delete()
    db.commit()
    return {"message": f"deleted user with id: {id}"}
