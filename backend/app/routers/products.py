from typing import Annotated
from database import SessionDep
from fastapi import Depends, APIRouter, HTTPException, File, UploadFile, Path
from fastapi.responses import JSONResponse

from models.user import *

from routers.users import get_current_user, credentials_exception
from database import SessionDep

from models.product import Products, ProductPublic

from pathlib import Path
import os

from sqlmodel import select

router = APIRouter()

ROOT_PATH = Path(__file__).parent.parent
IMAGEDIR = os.path.join(ROOT_PATH, "uploads", "products", "images")
os.makedirs(IMAGEDIR, exist_ok=True)

@router.get("/products/", tags=["products"])
async def read_products(
    session: SessionDep
):
    products = session.exec(select(Products)).all()
    return products

@router.post("/products/", tags=["products"])
async def create_product(
    current_user: Annotated[UsersDb, Depends(get_current_user)],
    session: SessionDep,
    product: ProductPublic,
):

    if current_user.role != "admin":
        raise credentials_exception

    product_dict = product.model_dump()
    db_product = Products(**product_dict)
    session.add(db_product)
    session.commit()
    session.refresh(db_product)

    return JSONResponse(content={"detail": "Produto criado com sucesso!", "product_id": db_product.id}, status_code=201)

@router.post("/products/{product_id}/images", tags=["products"])
async def upload_product_image(
    current_user: Annotated[UsersDb, Depends(get_current_user)],
    product_id: int,
    session: SessionDep,
    file: Annotated[UploadFile, File()]
):

    if current_user.role != "admin":
        raise credentials_exception

    product = session.get(Products, product_id)
    if product is None:
        raise HTTPException(detail="Produto não encontrado!", status_code=404)
    
    file_contents = await file.read()

    with open(os.path.join(IMAGEDIR, file.filename), "wb") as f:
        f.write(file_contents)

    product.image_url = f"/uploads/products/images/{file.filename}"
    session.commit()

    return JSONResponse(content={"message": "Imagem adicionada com sucesso!"}, status_code=200)

@router.delete("/products/{product_id}", tags=["products"])
async def delete_product(
    session: SessionDep,
    current_user: Annotated[UsersDb, Depends(get_current_user)],
    product_id: Annotated[int, Path()],
):
    if current_user.role != "admin":
        raise credentials_exception
    
    product = session.exec(select(Products).where(Products.id == product_id)).one_or_none()

    if not product:
        raise HTTPException(detail="produto não encontrado!", status_code=404)

    session.delete(product)
    session.commit()

    return JSONResponse(content={"message": "Produto deletado com sucesso!"}, status_code=200)