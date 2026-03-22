from dotenv import load_dotenv
import os

from sqlmodel import SQLModel, Session, create_engine, Field, select
from sqlalchemy import func

from pwdlib import PasswordHash
from datetime import datetime, timedelta, timezone

load_dotenv()

class UserBase(SQLModel):
    username: str = Field(index=True)
    full_name: str = Field(index=True)
    active: bool = Field(default=True)
    created_at: datetime = Field(default_factory=datetime.utcnow)

class User(UserBase):
    password: str

class UsersDb(UserBase, table=True):
    id: int | None = Field(primary_key=True, default=None)
    hashed_password: str
    role: str = Field(index=True, default="client")
    image_url: str | None = None

user = User(
  username=os.environ["ADMIN_USERNAME"],
  password=os.environ["ADMIN_PASSWORD"],
  full_name=os.environ["ADMIN_FULL_NAME"],
)

DB_URL = os.environ["DB_URL"]

engine = create_engine(DB_URL, echo=True) # mostra as consultas na tela

password_hash = PasswordHash.recommended()
def get_password_hash(password):
    return password_hash.hash(password)

def verify_existing_username(username: str, session: Session): # Verificando nome de usuário
    clean_username = username.lower().strip()
    user = session.exec(
        select(UsersDb).where(func.lower(UsersDb.username) == clean_username)
    ).one_or_none()
    
    if user is not None:
        raise Exception("Esse nome de usuário já está em uso!")

def create_admin_user(user: User):
    with Session(engine) as session:
      verify_existing_username(user.username, session=session)
      hashed_password = get_password_hash(user.password)

      db_user = UsersDb(hashed_password=hashed_password, username = user.username, full_name = user.full_name, role = "admin")

      session.add(db_user)
      session.commit()
      session.refresh(db_user)

create_admin_user(user)