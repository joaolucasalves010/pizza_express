from sqlmodel import SQLModel, Field

class UserBase(SQLModel):
    username: str = Field(index=True)
    full_name: str = Field(index=True)

class User(UserBase):
    password: str

class UserPublic(UserBase):
    id: int | None = Field(default=None, primary_key=True)
    role: str = Field(index=True, default="client")
    image_url: str | None = None
     
class UsersDb(UserBase, table=True):
    id: int | None = Field(primary_key=True, default=None)
    hashed_password: str
    role: str = Field(index=True, default="client")
    image_url: str | None = None

class UserLogin(SQLModel):
    username: str = Field(index=True)
    password: str

class UserUpdate(SQLModel):
    username: str | None = Field(default=None)
    full_name: str | None = Field(default=None)
    password: str | None = Field(default=None)