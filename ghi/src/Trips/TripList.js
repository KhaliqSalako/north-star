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
          backgroundImage:`url(background.jpg)`,
          backgroundRepeat: 'no-repeat',
          backgroundSize: "cover",
          backgroundAttachment: "fixed"
        }}
      >
      <Link
        className="text-self-right btn btn-primary"
        to={`/trips/create`}
        role="button"
      >
        Create a Trip
      </Link>
      <h1 className="text-3xl center" >Your Trips</h1>
      <div className="container">
        <div className="row">
          {trips.map((trip) => {
            return (
              <div key={trip.id} className="col-3 m-3">
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
