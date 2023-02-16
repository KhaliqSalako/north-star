from fastapi import FastAPI
from authenticator import authenticator
from routers import accounts, locations, trips
import os


app = FastAPI()
app.include_router(authenticator.router, tags=["Accounts"])
app.include_router(accounts.router, tags=["Accounts"])
app.include_router(locations.router, tags=["Google Maps API"])
app.include_router(trips.router, tags=["Trips"])
