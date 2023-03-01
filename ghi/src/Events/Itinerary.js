import { useState, useEffect } from "react";
import { useAuthContext } from "../Accounts/auth";
import { Link } from 'react-router-dom';
import {useParams} from 'react-router';

function Itinerary() {
    const { token } = useAuthContext();
    const [events, setEvents] = useState([])
    const params = useParams()
    const trip_id = params.id
    const date = params.date

    const getEventData = async () => {
    const response = await fetch(
      `${process.env.REACT_APP_ACCOUNTS_HOST}/api/trips/${trip_id}/itinerary/${date}`,
      {
        credentials: "include",
      }
    );
    if (response.ok) {
      const data = await response.json();
      setEvents(data.events);
    }
  };


  useEffect(() => {
    getEventData();
  }, []);

  const deleteEvent = async (event_id) => {
    const response = await fetch(`${process.env.REACT_APP_ACCOUNTS_HOST}/api/trips/${trip_id}/events/${event_id}`, {
      method: 'DELETE',
      credentials: "include",
      headers: {
        "Content-Type": "application/json"
      }
    })
    const data = await response.json()
    getEventData()
  }

return (
  <>
    <h1> {date} </h1>
    <div className="container">
      <Link
        to={`/trips/${trip_id}/events/${date}/create`}
        className="btn btn-primary btn-lg px-4 gap-3"
      >
        Create Event
      </Link>

      <table className="table table-striped">
        <thead>
          <tr>
            <th>Name</th>
            <th>Location Name</th>
            <th>Location Address</th>
            <th>Start Time</th>
            <th>Details</th>
          </tr>
        </thead>
        <tbody>
          {events.map((event) => {
            return (
              <tr key={event.id}>
                <td>{event.event_name}</td>
                <td>{event.location.name}</td>
                <td>{event.location.formatted_address}</td>
                <td>{event.start_time}</td>
                <td>{event.details}</td>
                <td>
                  <button onClick={() => deleteEvent(event.id)}>Delete</button>
                </td>
                <td>
                  <Link
                    to={`/trips/${trip_id}/events/detail/${event.id}`}
                    className="btn btn-primary btn-lg px-4 gap-3"
                  >
                    View Event
                  </Link>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  </>
);

}

export default Itinerary;
