from sqlmodel import Field, SQLModel

class Orders(SQLModel, table=True):
    id: int | None = Field(default=None, primary_key=True)
    description: str = Field(index=True)
    observations: str | None = Field(default=None)

    client_id: int | None = Field(default=None, foreign_key="userdb.id")