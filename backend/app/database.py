from sqlmodel import SQLModel, Session, create_engine, select
from pathlib import Path
import os
from pydantic import BaseModel
from fastapi import Depends
from typing import Annotated

from models.user import * # Importando todas as classes SQLMODEL
from models.orders import *

ROOT_PATH = Path(__file__).parent.parent

sqlite_file_name = os.path.join(ROOT_PATH, "database.db")
sqlite_url = f"sqlite:///{sqlite_file_name}"

connect_args = {"check_same_thread": False}
engine = create_engine(sqlite_url, connect_args=connect_args, echo=True) # mostra as consultas na tela

def get_session():
    with Session(engine) as session:
        yield session

SessionDep = Annotated[Session, Depends(get_session)]

def create_db_and_tables():
    SQLModel.metadata.create_all(engine)