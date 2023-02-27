from fastapi.testclient import TestClient
from main import app
from queries.trips import TripRepository
from authenticator import authenticator
import json
from models import TripOut, TripIn

client = TestClient(app)


def fake_get_current_account_data():
    return {
        "id": "73ee9d459fd6e053687c6de5",
        "name": "fake_account",
        "email": "fake_account@gmail.com",
        "username": "fake_account",
    }


class FakeTripRepository:
    def get_all_trips(self, account_id):
        return []

    def get_trip(self, trip_id):
        trip = {
            "name": "Brazil",
            "start_date": "4/27/2024",
            "end_date": "3/27/2024",
            "picture_url": "picture",
            "id": "73f502a99fe9690cdf31e21e",
            "account_id": "73ee9d459fd6e053687c6de5",
        }
        return TripOut(**trip)

    def create_trip(self, trip: TripIn, account_id):
        trip_dict = TripIn.dict()
        trip_dict["id"] = "83f502a99fe9690cdf31e21e"
        trip_dict["name"] = "Mexico"
        trip_dict["start_date"] = "3/27/2024"
        trip_dict["end_date"] = "3/27/2024"
        return trip_dict


def test_get_all_trips():
    # Arrange
    app.dependency_overrides[TripRepository] = FakeTripRepository
    app.dependency_overrides[
        authenticator.get_current_account_data
    ] = fake_get_current_account_data

    # Act
    res = client.get("/api/trips")
    print("RES-----------> /n", res)
    data = res.json()
    print("DATA-----------> /n", data)

    # Assert
    assert data["trips"] == []
    assert res.status_code == 200


def test_get_trip():
    # Arrange
    app.dependency_overrides[TripRepository] = FakeTripRepository
    app.dependency_overrides[
        authenticator.get_current_account_data
    ] = fake_get_current_account_data

    # Act
    res = client.get("/api/trips/73f502a99fe9690cdf31e21e")
    print("RES-----------> /n", res)
    data = res.json()
    print("DATA-----------> /n", data)

    # Assert
    assert data["id"] == "73f502a99fe9690cdf31e21e"
    assert res.status_code == 200


def test_create_trip():
    # Arrange
    app.dependency_overrides[TripRepository] = FakeTripRepository
    app.dependency_overrides[
        authenticator.get_current_account_data
    ] = fake_get_current_account_data

    # Act
    trip = {
        "name": "Disneyland",
    }

    res = client.post("./api/trips/2", json=trips)
    data = res.json()

    # Assert
    assert res.status_code == 200
    assert data["id"] == "83f502a99fe9690cdf31e21e"
    assert data["user"] == 8989
