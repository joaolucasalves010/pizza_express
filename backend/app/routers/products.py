from typing import Annotated
from database import SessionDep
from fastapi import Depends, APIRouter, HTTPException, File, UploadFile
from fastapi.responses import JSONResponse

from models.user import *

from routers.users import get_current_user, user_role_verify
from database import SessionDep

from models.product import Product, ProductPublic

from pathlib import Path
import os

router = APIRouter()

ROOT_PATH = Path(__file__).parent.parent
IMAGEDIR = os.path.join(ROOT_PATH, "uploads", "products", "images")

@router.post("/products/", tags=["products"])
async def create_product(
    current_user: Annotated[UserDb, Depends(get_current_user)],
    session: SessionDep,
    product: ProductPublic,
):
    user_role_verify(current_user)

    product_dict = product.model_dump()
    db_product = Product(**product_dict)
    session.add(db_product)
    session.commit()
    session.refresh(db_product)

    return JSONResponse(content={"detail": "Produto criado com sucesso!"}, status_code=201)

@router.post("/products/{product_id}/images", tags=["products"])
async def upload_product_image(
    current_user: Annotated[UserDb, Depends(get_current_user)],
    product_id: int,
    session: SessionDep,
    file: Annotated[UploadFile, File()]
):
    product = session.get(Product, product_id)
    if product is None:
        raise HTTPException(detail="Produto não encontrado!", status_code=404)
    
    file_contents = await file.read()

    with open(os.path.join(IMAGEDIR, file.filename), "wb") as f:
        f.write(file_contents)

    product.image_url = f"/uploads/products/images/{file.filename}"
    session.commit()

    return JSONResponse(content={"message": "Imagem adicionada com sucesso!"}, status_code=200)

# Criar produto NOME, ID, IMAGEM, PREÇO e DESCRIÇÃO
# Editar Produto
# Deletar Produto
# Retornar todos os produtos