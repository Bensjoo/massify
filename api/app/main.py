from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.config import Config
from app.routes.users import router as users_router
from app import models
from app.database import engine

models.Base.metadata.create_all(bind=engine)

# get the config file
conf = Config()

# fastAPI Instance
app = FastAPI(title="Massify API")

# Middleware
origins = [
    'http://127.0.0.1:3000'
]
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
)


# Top level entrypoints
@app.get('/')
async def root():
    return {"message": "Welcome to Massify API!"}


@app.get('/readyz/')
async def readyz():
    return 200


# Routers
app.include_router(users_router, prefix="/users")
