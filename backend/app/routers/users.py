from fastapi import APIRouter, Body, Depends, HTTPException
from fastapi.responses import JSONResponse, Response
from typing import Annotated

from dotenv import load_dotenv
import os

import jwt
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from jwt.exceptions import InvalidTokenError
from pwdlib import PasswordHash

from sqlmodel import select
from sqlalchemy import func

from datetime import timedelta, datetime, timezone

from models.token import *
from models.user import *
from models.orders import *
from database import SessionDep

router = APIRouter()

load_dotenv()

SECRET_KEY = os.environ["SECRET_KEY"]

if not SECRET_KEY:
    raise RuntimeError("SECRET_KEY NÃO DEFINIDA!")

ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 30

password_hash = PasswordHash.recommended()
security = HTTPBearer()

def get_password_hash(password):
    return password_hash.hash(password)

def verify_password(simple_password, hashed_password):
    return password_hash.verify(simple_password, hashed_password)

def verify_existing_username(username: str, session: SessionDep):
    clean_username = username.lower().strip()
    user = session.exec(
        select(UserDb).where(func.lower(UserDb.username) == clean_username)
    ).one_or_none()
    
    if user is not None:
        raise HTTPException(status_code=409, detail="Esse nome de usuário já está em uso")

def get_user_db(user_id: int, session: SessionDep):
    user = session.exec(
        select(UserDb).where(UserDb.id == user_id)
    ).one_or_none()
    return user

def get_user_db_by_username(username: str, session: SessionDep):
    clean_username = username.lower().strip()
    user = session.exec(
        select(UserDb).where(func.lower(UserDb.username) == clean_username)
    ).one_or_none()
    return user

credentials_exception = HTTPException(
    status_code=401,
    detail="Credenciais inválidas",
    headers={"WWW-Authenticate": "Bearer"},
 )


def get_current_user(
    credentials: Annotated[HTTPAuthorizationCredentials, Depends(security)],
    session: SessionDep,
):

    try:
        token = credentials.credentials
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        
        username = payload.get("username")
        full_name = payload.get("full_name")
        
        if username is None or full_name is None:
            raise credentials_exception
        
        token_data = TokenData(username=username, full_name=full_name)
    
    except InvalidTokenError:
        raise credentials_exception
    
    user = get_user_db_by_username(session=session, username=token_data.username)
    if user is None:
        raise credentials_exception
    
    return user

def authenticate_user(session: SessionDep, username: str, password: str):
    clean_username = username.lower().strip()
    user = session.exec(
        select(UserDb).where(func.lower(UserDb.username) == clean_username)
    ).one_or_none()
    if not user:
        return False
    if not verify_password(password, user.hashed_password):
        return False
    return user

def create_access_token(data: dict, expires_delta: timedelta | None = None):
    to_encode = data.copy()
    if expires_delta:
        expire = datetime.now(timezone.utc) + expires_delta
    else:
        expire = datetime.now(timezone.utc) + timedelta(minutes=15)
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt

@router.post("/users/", tags=["users"])
def create_user(user: Annotated[User, Body()], session: SessionDep) -> Response:
    verify_existing_username(user.username, session)

    if len(user.password) < 6:
        raise HTTPException(status_code=422, detail="A senha não pode ser menor do que 6 caracters")

    hashed_password = get_password_hash(user.password)
    db_user = UserDb(
        username=user.username,
        full_name=user.full_name,
        hashed_password=hashed_password
    )
    session.add(db_user)
    session.commit()
    session.refresh(db_user)
    return JSONResponse(status_code=201, content={"message": "Usuário criado com sucesso!"})

@router.post("/auth/login", tags=["auth"])
def login_for_access_token(
    data: Annotated[UserLogin, Body()],
    session: SessionDep
) -> Token:
    user = authenticate_user(session, data.username, data.password)
    if not user:
        raise HTTPException(
            status_code=401,
            detail="Nome de usuário ou senha incorreto",
            headers={"WWW-Authenticate": "Bearer"}
        )
    access_token_expires = timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    access_token = create_access_token(
        data={"username": user.username, "full_name": user.full_name},
        expires_delta=access_token_expires
    )
    return Token(access_token=access_token, token_type="Bearer")

@router.get("/auth/me", tags=["auth"], response_model=UserPublic)
def read_users_me(
    current_user: Annotated[UserDb, Depends(get_current_user)]
):
    return current_user

@router.get("/users/", status_code=200, tags=["users"], response_model=list[UserPublic])
def read_users(
    session: SessionDep,
    current_user: Annotated[UserDb, Depends(get_current_user)]
):
    
    if current_user.role != "admin":
        raise HTTPException(detail="Você não tem autorização de realizar essa chamada", status_code=401)
    
    users = session.exec(select(UserDb)).all()
    return users

@router.get("/users/{user_id}", response_model=UserPublic, tags=["users"])
def read_user(
    user_id: int,
    session: SessionDep,
    current_user: Annotated[UserDb, Depends(get_current_user)],
):
    
    if current_user.role != "admin":
        raise HTTPException(detail="Você não tem autorização de realizar essa chamada", status_code=401)

    user = get_user_db(user_id=user_id, session=session)
    if user is None:
        raise credentials_exception
    return user
    
@router.delete("/users/", tags=['users'])
def delete_user_me(
    session: SessionDep,
    current_user: Annotated[UserDb, Depends(get_current_user)]
):
    if not current_user:
        raise credentials_exception
    
    session.delete(current_user)
    session.commit()
    return JSONResponse(content={"message": f"Usuário {current_user.username} deletado com sucesso!"})

@router.delete("/users/{user_id}", tags=['users'])
def delete_user(
    session: SessionDep,
    current_user: Annotated[UserDb, Depends(get_current_user)],
    user_id: int
):
    if current_user.role != "admin":
        raise HTTPException(detail="você não tem autorização para realizar essa chamada", status_code=401)
    
    user = get_user_db(user_id=user_id, session=session)

    if user is None:
        raise HTTPException(detail="esse usuário não existe", status_code=404)
    
    session.delete(user)
    session.commit()
    return JSONResponse(content={"message": f"Usuário {user.username} deletado com sucesso!"})