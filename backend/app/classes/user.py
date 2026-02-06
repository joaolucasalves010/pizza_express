from sqlmodel import SQLModel, Field

class UserBase(SQLModel):
    username: str = Field(index=True)
    full_name: str = Field(index=True)
    age: int | None = Field(default=None)

class User(UserBase, table=True):
    password: str

"""

Comentando temporariamente até termos o esquema de hash

class UserInDb(UserBase, table=True):
    id: int | None = Field(primary_key=True, default=None)
    hashed_password: str


"""