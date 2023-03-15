from fastapi import FastAPI
from authenticator import authenticator
from routers import accounts, locations, trips, events
from fastapi.middleware.cors import CORSMiddleware
import os


app = FastAPI()
app.include_router(authenticator.router, tags=["Accounts"])
app.include_router(accounts.router, tags=["Accounts"])
app.include_router(locations.router, tags=["Google Maps API"])
app.include_router(trips.router, tags=["Trips"])
app.include_router(events.router, tags=["Events"])


origins = [
    os.environ.get("CORS_HOST", "https://north-star-group.gitlab.io"),
    os.environ.get("CORS_HOST4", "http://localhost:3000"),
]

app.add_middleware(
    CORSMiddleware,
    allow_origins={origins},
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
