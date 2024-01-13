from typing import List
from pydantic import BaseModel
from fastapi import APIRouter, Depends, File, Form, HTTPException, UploadFile
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
        name: str = Form(...),
        short_name: str = Form(...),
        brewery: str = Form(...),
        bolaget_number: int = Form(...),
        abv: float = Form(...),
        thumbnail: UploadFile = File(...),
        db: Session = Depends(get_db)):

    beer_data = {
        "name": name,
        "short_name": short_name,
        "brewery": brewery,
        "bolaget_number": bolaget_number,
        "abv": abv
    }
    db_beer = models.Beer(**beer_data)
    db.add(db_beer)

    try:
        db.commit()
        db.refresh(db_beer)

        file_location = f"static/thumbnails/{db_beer.id}.png"
        with open(file_location, "wb+") as file:
            contents = thumbnail.file.read()
            file.write(contents)
    except Exception as e:
        db.rollback()  # Rollback the transaction if there's an issue
        print(e)
        raise HTTPException(
            status_code=500,
            detail="Error while saving the beer or uploading the thumbnail."
        )
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
