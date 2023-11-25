from typing import List
from pydantic import BaseModel
from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app import models
from app.database import get_db

router = APIRouter()


class BeerBase(BaseModel):
    name: str
    full_name: str
    short_name: str
    brewery: str
    bolaget_number: int
    abv: float


class BeerModel(BeerBase):
    id: int

    class Config:
        orm_mode = True


@router.post('/new/', response_model=BeerModel)
async def create_beer(beer: BeerBase, db: Session = Depends(get_db)):
    db_beer = models.User(**beer.model_dump())
    db.add(db_beer)
    db.commit()

    db.refresh(db_beer)
    return db_beer


@router.get('/', response_model=List[BeerModel])
async def get_beers(db: Session = Depends(get_db)):
    beers = db.query(models.Beer).all()
    return beers
