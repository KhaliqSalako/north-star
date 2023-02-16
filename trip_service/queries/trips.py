from pydantic import BaseModel
from datetime import datetime, date
from typing import Optional

class TripIn(BaseModel):
    name: str
    start_date: date
    end_date: date
    picture_url: Optional[str]
