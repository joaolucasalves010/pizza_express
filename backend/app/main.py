# Import's FastAPI
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routers import users
from database import create_db_and_tables

app = FastAPI()

app.include_router(users.router)

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


@app.on_event("startup")
def on_startup():
    create_db_and_tables()

@app.get("/", tags=["main"])
def root():
    return {"detail": "Api pizza express"}