from fastapi import APIRouter, Depends
from pydantic import BaseModel
from queries.location import LocationQueries

router = APIRouter()


class Location(BaseModel):
    name: str
    details: str
    photo_reference: str
    geo_location: str
    formatted_address: str


@router.get('/api/location/{location_search}')
def get_location_by_name(
    location_search: str,
    repo: LocationQueries = Depends()
):
    return repo.get_location_by_name(location_search)
