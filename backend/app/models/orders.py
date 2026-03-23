from sqlmodel import Field, SQLModel

class Orders(SQLModel, table=True):
    id: int | None = Field(default=None, primary_key=True)
    quantity: int = Field(default=None)
    product_id: int = Field(foreign_key="products.id")
    client_id: int | None = Field(default=None, foreign_key="usersdb.id")