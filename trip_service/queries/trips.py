from pydantic import BaseModel
from models import TripIn, TripOut
from typing import List
from .client import Queries


class TripRepository(Queries):
    COLLECTION = "trips"

    def create_trip(self, trip: TripIn, account_id) -> TripOut:
        props = trip.dict()
        props['account_id'] = account_id
        self.collection.insert_one(props)
        props['id'] = str(props['_id'])
        return TripOut(**props)

    def get_all_trips(self, account_id) ->List[TripOut]:
        result = self.collection.find({"account_id": account_id})
        new_list = []
        for trip in result:
            trip['id'] = str(trip['_id'])
            new_list.append(TripOut(**trip))
        return new_list
