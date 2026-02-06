from fastapi import APIRouter, Body, Depends
from fastapi.responses import JSONResponse, Response
from typing import Annotated
from classes.user import * # Importando todas as classes SQLMODEL

from sqlmodel import SQLModel, Session, create_engine

router = APIRouter()

sqlite_file_name = "database.db"
sqlite_url = f"sqlite:///{sqlite_file_name}"

connect_args = {"check_same_thread": False}
engine = create_engine(sqlite_url, connect_args=connect_args, echo=True) # mostra as consultas na tela

def create_db_and_tables():
    SQLModel.metadata.create_all(engine)

def get_session():
    with Session(engine) as session:
        yield session

SessionDep = Annotated[Session, Depends(get_session)]

fake_users_db = []

@router.post("/users/", tags=["users"])
def create_user(user: Annotated[User, Body()], sesion: SessionDep) -> Response:
    
    db_user = user.model_dump()
    fake_users_db.append(db_user)
    return JSONResponse(status_code=200, content={"message": "Usuário criado com sucesso!"})

@router.get("/users/", status_code=200, tags=["users"])
def read_users() -> list:
    return fake_users_db