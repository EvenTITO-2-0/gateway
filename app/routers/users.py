from dotenv import load_dotenv
from fastapi import APIRouter
from eventitolibs.schemas.users import UserSchema
from fastapi.responses import JSONResponse
from fastapi.encoders import jsonable_encoder
import os
import requests

load_dotenv()
USERS_URL = os.getenv("USERS_URL")

router = APIRouter(
    prefix="/users",
    tags=['Users']
)


@router.post("/", response_model=UserSchema)
def create_user(user: UserSchema):
    resp = requests.post(f"{USERS_URL}/users", json=jsonable_encoder(user))
    return JSONResponse(content=resp.json(), status_code=resp.status_code)


@router.get("/{user_id}", response_model=UserSchema)
def read_user(user_id: str):
    resp = requests.get(f"{USERS_URL}/users/{user_id}")
    return JSONResponse(content=resp.json(), status_code=resp.status_code)
