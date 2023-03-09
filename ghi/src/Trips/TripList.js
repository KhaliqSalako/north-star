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

  return (
    <div
      className={`text-center w-100 ${trips.length > 3 ? "h-100" : "vh-100"}`}
      style={{
        backgroundImage: `url(background.jpg)`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        backgroundAttachment: "fixed",
      }}
    >
      <h1 className="text-3xl text-white title-font pt-5">Your Trips</h1>
      <Link
        className="btn btn-lg bg-blue-translucent text-white rounded-0 glow-small"
        to={`/trips/create`}
        role="button"
      >
        Create a Trip
      </Link>
      <div>
        <div className="row p-5">
          {trips.map((trip) => {
            return (
              <div key={trip.id} className="col-sm-12 col-md-6 col-lg-4 gx-0 mt-5">
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
