from pydantic import BaseModel
from models import EventIn, EventOut, Error
from typing import List, Union
from .client import Queries
from bson.objectid import ObjectId
from fastapi import FastAPI, HTTPException


class EventRepository(Queries):
    COLLECTION = "events"

    def create_event(self, event: EventIn, account_id, trip_id) -> EventOut:
        props = event.dict()
        props["account_id"] = account_id
        props["trip_id"] = trip_id
        self.collection.insert_one(props)
        props["id"] = str(props["_id"])
        return EventOut(**props)

    def get_all_events(self, account_id, trip_id) -> List[EventOut]:
        result = self.collection.find(
            {"account_id": account_id, "trip_id": trip_id}
        )
        new_list = []
        for event in result:
            event["id"] = str(event["_id"])
            new_list.append(EventOut(**event))
        return new_list

    def get_itinerary(self, account_id, trip_id, date) -> List[EventOut]:
        result = self.collection.find(
            {"account_id": account_id, "trip_id": trip_id, "date": date}
        )
        new_list = []
        for event in result:
            event["id"] = str(event["_id"])
            new_list.append(EventOut(**event))
        return new_list

    def get_event(self, event_id, trip_id) -> EventOut:
        event_dict = self.collection.find_one(
            {"_id": ObjectId(event_id), "trip_id": trip_id}
        )
        if event_dict == None:
            raise HTTPException(status_code=404, detail="event_id not found")
        event_dict["id"] = event_id
        return EventOut(**event_dict)

    def update_event(
        self, event: EventIn, event_id: str, account_id: str, trip_id: str
    ) -> EventOut:
        props = event.dict()
        props["account_id"] = account_id
        self.collection.update_one(
            {"_id": ObjectId(event_id), "trip_id": trip_id}, {"$set": props}
        )
        props["id"] = event_id
        props["trip_id"] = trip_id
        return EventOut(**props)

    def delete_event(self, event_id, trip_id):
        event_dict = self.collection.find_one(
            {"_id": ObjectId(event_id), "trip_id": trip_id}
        )
        if event_dict == None:
            return False
        response = self.collection.delete_one(
            {"_id": ObjectId(event_id), "trip_id": trip_id}
        )
        return True
