from pydantic import BaseModel
from models import TripIn, TripOut
from typing import List
from .client import Queries


class TripRepository(Queries):
    COLLECTION = "trips"

    def create_trip(self, trip: TripIn) -> TripOut:
        props = trip.dict()
        self.collection.insert_one(props)
        props['id'] = str(props['_id'])
        return TripOut(**props)

    def get_all_trips(self) ->List[TripOut]:
        result = self.collection.find()
        return result
