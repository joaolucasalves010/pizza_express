from sqlmodel import SQLModel, Field

class UserBase(SQLModel):
    username: str = Field(index=True)
    full_name: str = Field(index=True)
    age: str | None = Field(default=None)

class User(UserBase):
    password: str

class UserInDb(UserBase, table=True):
    id: int | None = Field(primary_key=True, default=None)
    hashed_password: str