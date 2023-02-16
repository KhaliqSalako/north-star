from fastapi import APIRouter
from queries.trips import TripIn

router = APIRouter()


@router.post("/trips")
def create_trip(trip: TripIn):
    return trip
