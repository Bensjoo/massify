from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles

from app.config import Config
from app.routes.users import router as users_router
from app.routes.tastings import tastings_router
from app.routes.beers import router as beers_router
from app import models
from app.database import engine

models.Base.metadata.create_all(bind=engine)

# get the config file
conf = Config()

# fastAPI Instance
app = FastAPI(title="Massify API")

# Middleware
origins = [
    'http://localhost:3000'
]
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=['*'],
    allow_headers=['*'],
)

# Mount thumbnails as static content folder
app.mount("/static", StaticFiles(directory="static"), name="static")


# Top level entrypoints
@app.get('/')
async def root():
    return {"message": "Welcome to Massify API!"}


@app.get('/readyz/')
async def readyz():
    return 200


# Routers
app.include_router(users_router, prefix="/users")
app.include_router(tastings_router, prefix="/tastings")
app.include_router(beers_router, prefix="/beers")