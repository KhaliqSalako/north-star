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
      `${process.env.REACT_APP_ACCOUNTS_HOST}/api/trips/${trip_id}/${date}/events`,
      {
        credentials: "include",
      }
    );
    if (response.ok) {
      const data = await response.json();
      setEvents(data.events);
      console.log(data.events)
    }
  };


  useEffect(() => {
    getEventData();
  }, []);
return (
    <>
        <div className="container">
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Name</th>
            <th>Location</th>
            <th>Date</th>
            <th>Start Time</th>
            <th>Details</th>
          </tr>
        </thead>
        <tbody>
          {events.map((event) => {
            return (
              <tr key={event.id}>
                <td>{event.event_name}</td>
                {/* <td>{event.location}</td> */}
                <td>{event.date}</td>
                <td>{event.start_time}</td>
                <td>{event.details}</td>
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
