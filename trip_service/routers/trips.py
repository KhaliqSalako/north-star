from fastapi import APIRouter, Depends
from queries.trips import TripIn, TripRepository
from typing import List
from models import TripOut, TripList
from authenticator import authenticator
from fastapi import FastAPI, HTTPException

router = APIRouter()


@router.post("/api/trips")
def create_trip(
    trip_in: TripIn,
    account_data: dict = Depends(authenticator.get_current_account_data),
    repo: TripRepository = Depends(),
):
    if not account_data:
        return None
    return repo.create_trip(trip=trip_in, account_id=account_data["id"])


@router.get("/api/trips", response_model=TripList)
def get_all_trips(
    account_data: dict = Depends(authenticator.get_current_account_data),
    repo: TripRepository = Depends(),
):
    trips = repo.get_all_trips(account_id=account_data["id"])
    return {"trips": trips}


@router.get("/api/trips/{trip_id}", response_model=TripOut)
def get_trip(
    trip_id: str,
    account_data: dict = Depends(authenticator.get_current_account_data),
    repo: TripRepository = Depends(),
):
    if not len(trip_id) == 24:
        raise HTTPException(status_code=404, detail="Invalid trip_id")
    trip_data = repo.get_trip(trip_id)
    if trip_data.account_id == account_data["id"]:
        return trip_data
    raise HTTPException(status_code=404, detail="trip_id not found")


@router.delete("/api/trips/{trip_id}")
def delete_trip(
    trip_id: str,
    account_data: dict = Depends(authenticator.get_current_account_data),
    repo: TripRepository = Depends(),
):
    if not len(trip_id) == 24:
        raise HTTPException(status_code=404, detail="Invalid trip_id")
    trip_data = repo.get_trip(trip_id)
    if trip_data.account_id == account_data["id"]:
        if repo.delete_trip(trip_id):
            return {"response": "trip deleted"}
        return {"response": "trip not found"}
    raise HTTPException(status_code=404, detail="trip_id not found")


@router.put("/api/trips/{trip_id}", response_model=TripOut)
def update_trip(
    trip_id: str,
    trip: TripIn,
    account_data: dict = Depends(authenticator.get_current_account_data),
    repo: TripRepository = Depends(),
):
    if not len(trip_id) == 24:
        raise HTTPException(status_code=404, detail="Invalid trip_id")
    trip_data = repo.get_trip(trip_id)
    if trip_data.account_id == account_data["id"]:
        return repo.update_trip(
            trip=trip, trip_id=trip_id, account_id=account_data["id"]
        )
    raise HTTPException(status_code=404, detail="trip_id not found")
