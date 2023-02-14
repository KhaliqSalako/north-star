from fastapi import FastAPI
from authenticator import authenticator

import os

app = FastAPI()
app.include_router(authenticator.router)
