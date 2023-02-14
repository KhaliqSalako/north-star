from pydantic import BaseModel
from .client import Queries
from pymongo.errors import DuplicateKeyError




class DuplicateAccountError(ValueError):
    pass

class AccountIn(BaseModel):
    name: str
    email: str
    username: str
    password: str

class AccountOut(BaseModel):
    id: str
    name: str
    email: str
    username: str

class AccountOutWithPassword(AccountOut):
    hashed_password: str

class AccountQueries(Queries):
    def get(self, email: str) -> AccountOut:
        props = self.collection.find_one({"email": email})
        if not props:
            return None
        props["id"] = str(props["_id"])
        return AccountOut(**props)

    def create(self, info: AccountIn, hashed_password: str, roles=["patron"]) -> AccountOut:
        props = info.dict()
        props["password"] = hashed_password
        props["roles"] = roles
        try:
            self.collection.insert_one(props)
        except DuplicateKeyError:
            raise DuplicateAccountError()
        props["id"] = str(props["_id"])
        return AccountOut(**props)
