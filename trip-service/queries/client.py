import os
import pymongo


DATABASE_URL = os.environ.get("DATABASE_URL", "fake_url")
client = pymongo.MongoClient(DATABASE_URL)


class Queries:
    DB_NAME = "north_star_db"

    @property
    def collection(self):
        db = client[self.DB_NAME]
        return db[self.COLLECTION]
