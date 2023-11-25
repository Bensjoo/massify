from datetime import datetime
from typing import List
from pydantic import BaseModel
from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app import models
from app.database import get_db

ratings_router = APIRouter()


class RatingBase(BaseModel):
    score: float
    feeling: float
    comment: str


class RatingModel(RatingBase):
    id: int
    beer_id: int
    user_id: int
    session_id: int
    submitted: datetime

    class Config:
        orm_mode = True


@ratings_router.post('/new/', response_model=RatingBase)
async def rate(rating: RatingBase, db: Session = Depends(get_db)):
    db_rating = models.Rating(**rating.model_dump())
    db.add(db_rating)
    db.commit()

    db.refresh(db_rating)
    return db_rating


@ratings_router.get('/', response_model=List[RatingModel])
async def get_ratings(db: Session = Depends(get_db)):
    ratings = db.query(models.Rating).all()
    return ratings
