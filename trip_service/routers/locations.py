from fastapi import APIRouter, Depends
from pydantic import BaseModel
from queries.location import LocationQueries
from typing import Optional
from models import Location


router = APIRouter()


@router.get("/api/location/{location_search}")
def get_location_by_name(
    location_search: str, repo: LocationQueries = Depends()
):
    return repo.get_location_by_name(location_search)
