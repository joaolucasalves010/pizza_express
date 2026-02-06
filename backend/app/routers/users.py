from fastapi import APIRouter, Body
from fastapi.responses import JSONResponse, Response
from typing import Annotated
from classes.user import * # Importando todas as classes SQLMODEL

router = APIRouter()

fake_users_db = []

@router.post("/users/", tags=["users"])
def create_user(user: Annotated[User, Body()]) -> Response:
    db_user = user.model_dump()
    fake_users_db.append(db_user)
    return JSONResponse(status_code=200, content={"message": "Usuário criado com sucesso!"})

@router.get("/users/", status_code=200, tags=["users"])
def read_users() -> list:
    return fake_users_db