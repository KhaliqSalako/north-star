import { useState, useEffect } from "react";
import { useAuthContext } from "../Accounts/auth";
import {useParams} from 'react-router';

function SingleTripList(props) {
  const { token } = useAuthContext();
  const [trip, setTrip] = useState([]);
  const params = useParams()
  console.log(params)
  const trip_id = params.id

  const getSingleTripData = async () => {
      console.log(trip_id)
    const response = await fetch(
      `${process.env.REACT_APP_ACCOUNTS_HOST}/api/trips/${trip_id}`,
      {
        credentials: "include",
      }
    );

    if (response.ok) {
      const data = await response.json();
      console.log(data)
      setTrip(data);
    }
  };

  useEffect(() => {
    getSingleTripData();
  }, []);


  return (
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
              <tr>
                <td>{trip.name}</td>
                <td>{trip.start_date}</td>
                <td>{trip.end_date}</td>
                <td>
                  <img src={trip.picture_url} className="card-img-top" />
                </td>
              </tr>
        </tbody>
      </table>
    </div>
  );
}


export default SingleTripList;
