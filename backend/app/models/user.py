from sqlmodel import SQLModel, Field

class UserBase(SQLModel):
    username: str = Field(index=True)
    full_name: str = Field(index=True)
    role: str = Field(index=True, default="client")

class User(UserBase):
    password: str

class UserPublic(UserBase):
    id: int | None = Field(default=None, primary_key=True)
     
class UserDb(UserBase, table=True):
    id: int | None = Field(primary_key=True, default=None)
    hashed_password: str

class UserLogin(SQLModel):
    username: str = Field(index=True)
    password: str