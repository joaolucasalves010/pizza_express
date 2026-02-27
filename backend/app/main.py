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
    "*"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins = origins,
    allow_methods = ["*"], # permite todos os methods
    # allow_credentials = True, -> Permite envio de credenciais
    allow_headers=["Access-Control-Allow-Headers", "Content-Type", "Authorization", "Access-Control-Allow-Origin","Set-Cookie"],
)

os.makedirs(IMAGEDIR, exist_ok=True)
app.mount("/uploads", StaticFiles(directory=IMAGEDIR), name="uploads")

@app.on_event("startup")
def on_startup():
    create_db_and_tables()