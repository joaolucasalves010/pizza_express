from sqlmodel import SQLModel, Field, table
from pydantic import FileUrl

class Product(SQLModel, table=True):
    id: int = Field(default=None,primary_key=True)
    name: str = Field(index=True)
    price: int = Field(index=True)
    image_url: str | None = None
    description: str = Field(index=True)

class ProductPublic(SQLModel):
    name: str = Field(index=True)
    price: int = Field(index=True)
    description: str = Field(index=True)