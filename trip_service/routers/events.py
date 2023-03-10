from fastapi import APIRouter, Depends
from queries.events import EventIn, EventRepository
from typing import List
from models import EventOut
from authenticator import authenticator
from fastapi import HTTPException

router = APIRouter()


@router.post("/api/trips/{trip_id}/events")
def create_event(
    event_in: EventIn,
    trip_id: str,
    account_data: dict = Depends(authenticator.get_current_account_data),
    repo: EventRepository = Depends(),
):
    if not account_data:
        return None
    return repo.create_event(
        event=event_in, account_id=account_data["id"], trip_id=trip_id
    )


@router.get("/api/trips/{trip_id}/events", response_model=List[EventOut])
def get_all_events(
    trip_id: str,
    account_data: dict = Depends(authenticator.get_current_account_data),
    repo: EventRepository = Depends(),
):
    return repo.get_all_events(account_id=account_data["id"], trip_id=trip_id)


@router.get("/api/trips/{trip_id}/itinerary/{date}", response_model=dict)
def get_itinerary(
    trip_id: str,
    date: str,
    account_data: dict = Depends(authenticator.get_current_account_data),
    repo: EventRepository = Depends(),
):
    events = repo.get_itinerary(
        account_id=account_data["id"], trip_id=trip_id, date=date
    )

    return {"events": events}


@router.get("/api/trips/{trip_id}/events/{event_id}", response_model=EventOut)
def get_event(
    event_id: str,
    trip_id: str,
    account_data: dict = Depends(authenticator.get_current_account_data),
    repo: EventRepository = Depends(),
):
    if not len(event_id) == 24:
        raise HTTPException(status_code=404, detail="Invalid event_id")
    event_data = repo.get_event(event_id, trip_id)
    if event_data.account_id == account_data["id"]:
        return event_data
    raise HTTPException(status_code=404, detail="event_id not found")


@router.put("/api/trips/{trip_id}/events/{event_id}", response_model=EventOut)
def update_event(
    event_id: str,
    trip_id: str,
    event: EventIn,
    account_data: dict = Depends(authenticator.get_current_account_data),
    repo: EventRepository = Depends(),
):
    if not len(event_id) == 24:
        raise HTTPException(status_code=404, detail="Invalid event_id")
    event_data = repo.get_event(event_id, trip_id)
    if event_data.account_id == account_data["id"]:
        return repo.update_event(
            event=event,
            event_id=event_id,
            account_id=account_data["id"],
            trip_id=trip_id,
        )
    raise HTTPException(status_code=404, detail="event_id not found")


@router.delete("/api/trips/{trip_id}/events/{event_id}")
def delete_event(
    event_id: str,
    trip_id: str,
    account_data: dict = Depends(authenticator.get_current_account_data),
    repo: EventRepository = Depends(),
):
    if not len(event_id) == 24:
        raise HTTPException(status_code=404, detail="Invalid event_id")
    event_data = repo.get_event(event_id, trip_id)
    if event_data.account_id == account_data["id"]:
        if repo.delete_event(event_id, trip_id):
            return {"response": "event deleted"}
        return {"response": "event not found"}
    raise HTTPException(status_code=404, detail="event_id not found")
