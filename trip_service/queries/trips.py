from pydantic import BaseModel
from models import TripIn, TripOut, Error
from typing import List, Union
from .client import Queries
from bson.objectid import ObjectId
from fastapi import FastAPI, HTTPException


class TripRepository(Queries):
    COLLECTION = "trips"

    def create_trip(self, trip: TripIn, account_id) -> TripOut:
        props = trip.dict()
        props["account_id"] = account_id
        self.collection.insert_one(props)
        props["id"] = str(props["_id"])
        return TripOut(**props)

    def update_trip(
        self, trip: TripIn, trip_id: str, account_id: str
    ) -> TripOut:
        props = trip.dict()
        props["account_id"] = account_id
        self.collection.update_one({"_id": ObjectId(trip_id)}, {"$set": props})
        props["id"] = trip_id
        return TripOut(**props)

    def get_all_trips(self, account_id) -> List[TripOut]:
        result = self.collection.find({"account_id": account_id})
        new_list = []
        for trip in result:
            trip["id"] = str(trip["_id"])
            new_list.append(TripOut(**trip))
        return new_list

    # {'_id': ObjectId('63f4ff4cb3e1e556b52a7501'), 'name': 'Test 1',
    # 'start_date': '1010', 'end_date': '2020',
    # 'picture_url': 'test/url', 'account_id': '63f4fefcb3e1e556b52a7500'}

    def get_trip(self, trip_id) -> TripOut:
        print("trip_id: ", trip_id)
        trip_dict = self.collection.find_one({"_id": ObjectId(trip_id)})
        if trip_dict == None:
            raise HTTPException(status_code=404, detail="trip_id not found")
        trip_dict["id"] = trip_id
        return TripOut(**trip_dict)

    def delete_trip(self, trip_id):
        print("trip_id: ", trip_id)
        trip_dict = self.collection.find_one({"_id": ObjectId(trip_id)})
        if trip_dict == None:
            return False
        response = self.collection.delete_one({"_id": ObjectId(trip_id)})
        return True


# def update(self, trip_id: str, account_id, trip: TripIn) -> Union[TripOut, Error]:
#     props = trip.dict()
#     # props['name'] = name
#     # props['start_date'] = start_date
#     # props['end_date'] = end_date
#     # props['name'] = name
#     self.collection.updateOne(trip_id, trip)
#     props['id'] = str(props['_id'])
#     return TripOut(**props)
