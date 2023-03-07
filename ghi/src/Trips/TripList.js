import { useState, useEffect } from "react";
import { useAuthContext } from "../Accounts/auth";
import TripListCard from "./TripListCard";
import { Link } from "react-router-dom";

function TripList() {
  const { token } = useAuthContext();
  const [trips, setTrips] = useState([]);

  const getTripData = async () => {
    const response = await fetch(
      `${process.env.REACT_APP_ACCOUNTS_HOST}/api/trips`,
      {
        credentials: "include",
      }
    );

    if (response.ok) {
      const data = await response.json();
      setTrips(data.trips);
    }
  };

  useEffect(() => {
    getTripData();
  }, []);

  const deleteTrip = async (trip_id) => {
    const response = await fetch(
      `${process.env.REACT_APP_ACCOUNTS_HOST}/api/trips/${trip_id}`,
      {
        method: "DELETE",
        credentials: "include",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const data = await response.json();
    getTripData();
  };

  return (
    <div
      className="text-center bg-black h-100 w-100"
      style={{
        backgroundImage: `url(background.jpg)`,
        backgroundRepeat: 'no-repeat',
        backgroundSize: "cover",
        backgroundAttachment: "fixed",
      }}
    >
      <h1 className="text-3xl center-trip-list text-white title-font">Your Trips</h1>
      <Link
        className="mb-4 btn bg-blue-translucent text-white rounded-0 glow-small h-100"
        to={`/trips/create`}
        role="button"
      >
        Create a Trip
      </Link>
      <div className="d-flex justify-items-center">
        <div className="row m-5 p-5">
          {trips.map((trip) => {
            return (
              <div key={trip.id}
                className="col-4 p-5"
                >
                <TripListCard getTripData={getTripData} trip={trip} />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default TripList;
