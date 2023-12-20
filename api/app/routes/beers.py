from typing import List
from pydantic import BaseModel
from fastapi import APIRouter, Depends  # , File, UploadFile
from sqlalchemy.orm import Session

from app import models
from app.database import get_db

router = APIRouter()


class BeerBase(BaseModel):
    name: str
    short_name: str
    brewery: str
    bolaget_number: int
    abv: float


class BeerModel(BeerBase):
    id: int

    class Config:
        orm_mode = True


@router.post('/new/', response_model=BeerModel)
async def create_beer(
        beer: BeerBase,
        # thumbnail: UploadFile = File(...),
        db: Session = Depends(get_db)
        ):
    db_beer = models.Beer(**beer.model_dump())

    # file_location = f"{db_beer.id}.png"
    # with open(file_location, "wb+") as file:
    #     try:
    #         contents = thumbnail.file.read()
    #         file.write(contents)
    #     except Exception:
    #         return {"message": "There was an error uploading the file"}
    #     finally:
    #         thumbnail.file.close()

    db.add(db_beer)
    db.commit()
    db.refresh(db_beer)
    return db_beer


@router.get('/', response_model=List[BeerModel])
async def get_beers(db: Session = Depends(get_db)):
    beers = db.query(models.Beer).all()
    return beers


@router.delete('/{id}')
async def delete_by_id(id: int, db: Session = Depends(get_db)):
    db.query(models.Beer).filter(models.Beer.id == id).delete()
    db.commit()
    return {"message": f"deleted beer with id: {id}"}
