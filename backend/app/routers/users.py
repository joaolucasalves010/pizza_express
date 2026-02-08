from fastapi import APIRouter, Body, Depends, HTTPException
from fastapi.responses import JSONResponse, Response
from typing import Annotated
from classes.user import * # Importando todas as classes SQLMODEL

from sqlmodel import SQLModel, Session, create_engine, select
from dotenv import load_dotenv
import os

import jwt
from fastapi.security import OAuth2PasswordBearer
from jwt.exceptions import InvalidTokenError
from pwdlib import PasswordHash

from pathlib import Path

router = APIRouter()

load_dotenv()

"""

Para gerar sua SECRET_KEY, abra um terminal Linux e digite o comando "openssl rand -hex 32" (O terminal pode ser o git bash)
crie um arquivo .env e adicione uma variável SECRET_KEY com o valor gerado pelo terminal linux

"""

SECRET_KEY = os.environ["SECRET_KEY"]
ALGORITHM = "HS256" # Algoritmo de assinatura
ACCESS_TOKEN_EXPIRE_MINUTES = 30 # Tempo em minutos de expiração do token

password_hash = PasswordHash.recommended()
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")

ROOT_PATH = Path(__file__).parent.parent

sqlite_file_name = os.path.join(ROOT_PATH, "database.db")
sqlite_url = f"sqlite:///{sqlite_file_name}"
print(ROOT_PATH)

connect_args = {"check_same_thread": False}
engine = create_engine(sqlite_url, connect_args=connect_args, echo=True) # mostra as consultas na tela

def get_password_hash(password):
    return password_hash.hash(password)

def verify_password(simple_password, hashed_password):
    return password_hash.verify(simple_password, hashed_password)

def create_db_and_tables():
    SQLModel.metadata.create_all(engine)

def get_session():
    with Session(engine) as session:
        yield session

SessionDep = Annotated[Session, Depends(get_session)]

@router.post("/users/", tags=["users"])
def create_user(user: Annotated[User, Body()], session: SessionDep) -> Response:
    hashed_password = get_password_hash(user.password)
    db_user = UserDb(
        username=user.username,
        full_name=user.full_name,
        age = user.age,
        hashed_password=hashed_password
    )
    session.add(db_user)
    session.commit()
    session.refresh(db_user)
    return JSONResponse(status_code=200, content={"message": "Usuário criado com sucesso!"})

@router.get("/users/", status_code=200, tags=["users"], response_model=list[UserPublic])
def read_users(session: SessionDep):
    users_list = session.exec(select(UserDb)).all()
    if len(users_list) == 0:
        raise HTTPException(status_code=404, detail="Nenhum usuário encontrado!")
    return users_list

@router.get("/users/{user_id}", response_model=UserPublic, tags=["users"])
def get_user(user_id: int, session: SessionDep):
    user = session.exec(select(UserDb).where(UserDb.id == user_id)).one_or_none()
    if user is None:
        raise HTTPException(status_code=404, detail="Usuário não encontrado")
    return user