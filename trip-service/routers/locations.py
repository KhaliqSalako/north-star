from fastapi import APIRouter, Depends
from queries.location import LocationQueries


router = APIRouter()


@router.get("/api/location/{location_search}")
def get_location_by_name(
    location_search: str, repo: LocationQueries = Depends()
):
    return repo.get_location_by_name(location_search)
