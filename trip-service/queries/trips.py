from models import TripIn, TripOut
from typing import List
from .client import Queries
from bson.objectid import ObjectId
from fastapi import HTTPException


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

    def get_trip(self, trip_id) -> TripOut:
        trip_dict = self.collection.find_one({"_id": ObjectId(trip_id)})
        if trip_dict is None:
            raise HTTPException(status_code=404, detail="trip_id not found")
        trip_dict["id"] = trip_id
        return TripOut(**trip_dict)

    def delete_trip(self, trip_id):
        trip_dict = self.collection.find_one({"_id": ObjectId(trip_id)})
        if trip_dict is None:
            return False
        self.collection.delete_one({"_id": ObjectId(trip_id)})
        return True
