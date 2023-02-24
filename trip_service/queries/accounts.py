from .client import Queries
from models import AccountIn, AccountOutWithPassword
# from pymongo.errors import DuplicateKeyError


class DuplicateAccountError(ValueError):
    pass


class AccountQueries(Queries):
    COLLECTION = "accounts"

    def create(
        self, info: AccountIn, hashed_password: str
    ) -> AccountOutWithPassword:
        props = info.dict()
        props["hashed_password"] = hashed_password
        try:
            self.collection.insert_one(props)
        except DuplicateKeyError:
            raise DuplicateAccountError()
        props["id"] = str(props["_id"])
        return AccountOutWithPassword(**props)

    def get(self, username: str) -> AccountOutWithPassword:
        props = self.collection.find_one({"username": username})
        if not props:
            return None
        props["id"] = str(props["_id"])
        return AccountOutWithPassword(**props)
