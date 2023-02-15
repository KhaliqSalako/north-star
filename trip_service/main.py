from fastapi import FastAPI
from authenticator import authenticator
from routers import accounts, locations

import os

app = FastAPI()
app.include_router(authenticator.router)
app.include_router(accounts.router)
app.include_router(locations.router)
