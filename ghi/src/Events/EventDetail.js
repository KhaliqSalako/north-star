import { useState, useEffect } from "react";
import { useAuthContext } from "../Accounts/auth";
import { useParams } from "react-router";
import { Link } from "react-router-dom";


function EventDetail() {
  const { token } = useAuthContext();
//   const [trip, setTrip] = useState([]);
  const [event, setEvent] = useState([]);
  const params = useParams();
  const trip_id = params.trip_id;
  const event_id =params.event_id

console.log(params)

  const getEvent = async () => {
    const response = await fetch(
      `${process.env.REACT_APP_ACCOUNTS_HOST}/api/trips/${trip_id}/events/${event_id}`,
      {
        credentials: "include",
      }
    );
console.log(response)
    if (response.ok) {
      const data = await response.json();
      console.log(data)
      setEvent(data);
    }
  };

  useEffect(() => {
    getEvent();
  }, []);


  return (
    <div className="container">
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Name</th>
            {/* <th>Location</th> */}
            <th>Date</th>
            <th>Start Time</th>
            <th>Details</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{event.event_name}</td>
            {/* <td>{event.location}</td> */}
            <td>{event.date}</td>
            <td>{event.start_time}</td>
            <td>{event.details}</td>
            <td>
              <Link
                to={`/trips/${trip_id}/events/${event.id}/edit`}
                className="btn btn-primary btn-lg px-4 gap-3"
              >
                Edit Event
              </Link>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}


export default EventDetail;
