from .client import Queries
from models import Account, AccountIn, AccountOutWithPassword
from pymongo.errors import DuplicateKeyError


class DuplicateAccountError(ValueError):
    pass


class AccountQueries(Queries):
    DB_NAME = "library"
    COLLECTION = "accounts"

    def get(self, email: str) -> AccountOutWithPassword:
        props = self.collection.find_one({"email": email})
        if not props:
            return None
        props["id"] = str(props["_id"])
        print(props, "in get")
        return AccountOutWithPassword(**props)

    def create(self, info: AccountIn, hashed_password: str, roles=["patron"]) -> AccountOutWithPassword:
        props = info.dict()
        props["hashed_password"] = hashed_password
        props["roles"] = roles
        try:
            self.collection.insert_one(props)
        except DuplicateKeyError:
            raise DuplicateAccountError()
        props["id"] = str(props["_id"])
        print(props, "in create")

        return AccountOutWithPassword(**props)












# from pydantic import BaseModel
# from .client import Queries
# from pymongo.errors import DuplicateKeyError
# from models import Account, AccountIn





# class DuplicateAccountError(ValueError):
#     pass

# class AccountIn(BaseModel):
#     name: str
#     email: str
#     username: str
#     password: str

# class AccountOut(BaseModel):
#     id: str
#     name: str
#     email: str
#     username: str

# class AccountOutWithPassword(AccountOut):
#     hashed_password: str

# class AccountQueries(Queries):
#     DB_NAME = "mongo-data"
#     COLLECTION = "accounts"

#     def get(self, email: str) -> Accounts:
#         props = self.collection.find_one({"email": email})
#         if not props:
#             return None
#         props["id"] = str(props["_id"])
#         return AccountOut(**props)

#     def create(self, info: AccountIn, hashed_password: str) -> Accounts:
#         props = info.dict()
#         props["password"] = hashed_password
#         try:
#             self.collection.insert_one(props)
#         except DuplicateKeyError:
#             raise DuplicateAccountError()
#         props["id"] = str(props["_id"])
#         return AccountOut(**props)
