from sqlmodel import SQLModel, Session, create_engine, select
from pathlib import Path
import os
from pydantic import BaseModel
from fastapi import Depends
from typing import Annotated
from dotenv import load_dotenv

from models.user import * # Importando todas as classes SQLMODEL
from models.orders import *

ROOT_PATH = Path(__file__).parent.parent
load_dotenv()

DATABASE_URL = os.environ["DATABASE_URL"]

engine = create_engine(DATABASE_URL, echo=True) # mostra as consultas na tela

def get_session():
    with Session(engine) as session:
        yield session

SessionDep = Annotated[Session, Depends(get_session)]

def create_db_and_tables():
    SQLModel.metadata.create_all(engine)