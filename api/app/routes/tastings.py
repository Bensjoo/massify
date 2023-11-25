from datetime import datetime
from typing import List, Optional
from pydantic import BaseModel
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app import models
from app.database import get_db
# from app.routes.beers import BeerModel
from app.routes.users import UserModel
# from app.routes.ratings import RatingModel

tastings_router = APIRouter()


# Pydantic model for Session (for reading data including relationships)
class TastingModel(BaseModel):
    id: int
    title: str
    started: datetime
    ended: Optional[datetime] = None
    participants: List[UserModel] = []
    # beers: List[BeerModel] = []
    # ratings: List[RatingModel] = []

    class Config:
        orm_mode = True


class TastingCreate(BaseModel):
    title: str


@tastings_router.post('/new/', response_model=TastingModel)
async def create_tasting(
        tasting: TastingCreate,
        db: Session = Depends(get_db)):
    db_tasting = models.Tasting(
        **tasting.model_dump(),
    )
    db.add(db_tasting)
    db.commit()

    # for us to return list of users?
    db.refresh(db_tasting)
    return db_tasting


@tastings_router.get('/', response_model=List[TastingModel])
async def get_tastings(db: Session = Depends(get_db)):
    tastings = db.query(models.Tasting).all()
    return tastings


@tastings_router.post('/{tasting_id}/participants/{user_id}')
def add_participant(
        tasting_id: int,
        user_id: int,
        db: Session = Depends(get_db)):
    # get tasting & user
    tasting = (
        db.query(models.Tasting)
        .filter(models.Tasting.id == tasting_id)
        .first()
    )
    if not tasting:
        raise HTTPException(status_code=404, detail="Tasting not found")

    user = (
        db.query(models.User)
        .filter(models.User.id == user_id)
        .first()
    )
    if not user:
        raise HTTPException(status_code=404, detail="User not found")

    if user not in tasting.participants:
        tasting.participants.append(user)
        db.commit()
        db.refresh(tasting)
        return {
            "message": "User added to tasting successfully",
            "participants": tasting.participants
        }
