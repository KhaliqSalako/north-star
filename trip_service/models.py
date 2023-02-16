from bson.objectid import ObjectId
from pydantic import BaseModel
from typing import List, Optional
# from datetime import datetime, date


# class Error(BaseModel):
#     message: str

class PydanticObjectId(ObjectId):
    @classmethod
    def __get_validators__(cls):
        yield cls.validate

    @classmethod
    def validate(cls, value: ObjectId | str) -> ObjectId:
        if value:
            try:
                ObjectId(value)
            except:
                raise ValueError(f"Not a valid object id: {value}")
        return value


class SessionOut(BaseModel):
    jti: str
    account_id: str

class AccountIn(BaseModel):
    name: str
    email: str
    username: str
    password: str

class Account(AccountIn):
    id: PydanticObjectId
    roles: List[str]

class AccountOut(BaseModel):
    id: str
    name: str
    email: str
    username: str

class AccountOutWithPassword(AccountOut):
    hashed_password: str

class TripIn(BaseModel):
    name: str
    start_date: str
    end_date: str
    picture_url: Optional[str]

class TripOut(TripIn):
    id: str
