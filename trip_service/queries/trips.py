from pydantic import BaseModel
from models import TripIn, TripOut, Error
from typing import List, Union
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

    def update(self, trip_id: str, account_id, trip: TripIn) -> Union[TripOut, Error]:
        props = trip.dict()
        # props['name'] = name
        # props['start_date'] = start_date
        # props['end_date'] = end_date
        # props['name'] = name
        self.collection.updateOne(trip_id, trip)
        props['id'] = str(props['_id'])
        return TripOut(**props)
