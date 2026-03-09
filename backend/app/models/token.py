from pydantic import BaseModel

class TokenPair(BaseModel):
    access_token: str
    refresh_token: str
    token_type: str

class TokenData(BaseModel):
    username: str
    full_name: str