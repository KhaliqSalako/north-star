import { useState, useEffect } from "react";
import { useAuthContext } from "../Accounts/auth";
import Tripsidebar from "./Tripsidebar";
import { Link } from 'react-router-dom'

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
  }, [trips]);

  const deleteTrip = async (trip_id) => {
    const response = await fetch(`${process.env.REACT_APP_ACCOUNTS_HOST}/api/trips/${trip_id}`, {
      method: 'DELETE',
      credentials: "include",
      mode: "cors",
      headers: {
        "Content-Type": "application/json"
      }
    })
    const data = await response.json()
    setTrips(
      trips.filter((trip) => {
        console.log(trip.id)
        return trip.trip_id !== trip_id;
      })
    )
  }

  return (
    <>
      <Tripsidebar trips={trips}/>,
        <div className="container">
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Name</th>
            <th>Start Date</th>
            <th>End Date</th>
            <th>Photo</th>
          </tr>
        </thead>
        <tbody>
          {trips.map((trip) => {
            return (
              <tr key={trip.id}>
                <td>{trip.name}</td>
                <td>{trip.start_date}</td>
                <td>{trip.end_date}</td>
                <td>
                  <img src={trip.picture_url} className="card-img-top" />
                </td>
                <td>
                  <button onClick={() => deleteTrip(trip.id)}>Delete</button>
                </td>
                <Link
                  to={`/trips/detail/${trip.id}`}
                  className="btn btn-primary btn-lg px-4 gap-3"
                >
                  View Trip
                </Link>
                <Link
                  to={`/trips/edit/${trip.id}`}
                  className="btn btn-primary btn-lg px-4 gap-3"
                >
                  Edit Trip
                </Link>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
        </>
  );
}

export default TripList;
