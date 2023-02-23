import { useState, useEffect } from 'react';
import { useAuthContext } from './auth';


function TripList() {
    const { token } = useAuthContext();
  const [trips, setTrips] = useState([]);

  const getTripData = async () => {
    const response = await fetch(
        'http://localhost:8000/api/trips',
        {
        headers: {
        'Authentication': 'Bearer {token}',
        }
    }
    );

    if (response.ok) {
      const data = await response.json();
      setTrips(data.trips);
    console.log(data)
    }
  };

  useEffect(() => {
    getTripData();
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
          {trips.map(trip => {
            return (
              <tr key={trip.id}>
                <td>{trip.name}</td>
                <td>{trip.start_date}</td>
                <td>{trip.end_date}</td>
                {/* <td>
                  <img src={trip.picture_url} className="card-img-top" />
                </td> */}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
export default TripList;
