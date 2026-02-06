from fastapi import APIRouter
from typing import Annotated

router = APIRouter()

@router.post("/users/")
def create_user():
    return {"detail": "users"}