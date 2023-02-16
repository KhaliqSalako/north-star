from fastapi import APIRouter, Depends
from queries.trips import TripIn, TripRepository
from typing import List
from models import TripOut
from authenticator import authenticator

router = APIRouter()


@router.post("/trips")
def create_trip(
    trip_in: TripIn,
    account_data: dict = Depends(authenticator.get_current_account_data),
    repo: TripRepository = Depends()
):
    if not account_data:
        return None
    return repo.create_trip(trip=trip_in, account_id=account_data['id'])


@router.get('/trips', response_model= List[TripOut])
def get_all_trips(
    account_data: dict = Depends(authenticator.get_current_account_data),
    repo: TripRepository = Depends()
):
    return repo.get_all_trips(account_id=account_data['id'])
