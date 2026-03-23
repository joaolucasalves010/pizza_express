from sqlmodel import Field, SQLModel

class Orders(SQLModel, table=True):
    product_id: int | None = Field(default=None, primary_key=True)
    quantity: int = Field(default=None)
    client_id: int | None = Field(default=None, foreign_key="usersdb.id")