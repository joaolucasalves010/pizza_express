# Import's FastAPI
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routers import users
from routers import products
from database import create_db_and_tables

from fastapi.staticfiles import StaticFiles
from routers.products import IMAGEDIR

from pathlib import Path

import os

app = FastAPI()

app.include_router(users.router)
app.include_router(products.router)

origins = [
    "http://localhost:5173"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins = origins,
    allow_methods = ["*"], # permite todos os methods
    allow_credentials = True,
    allow_headers=["*"],
)

UPLOADS_DIR = os.path.join(Path(__file__).parent, "uploads")
os.makedirs(UPLOADS_DIR, exist_ok=True) # Se o caminho já existir ele não executa
app.mount("/uploads", StaticFiles(directory=UPLOADS_DIR), name="uploads")

@app.on_event("startup")
def on_startup():
    create_db_and_tables()