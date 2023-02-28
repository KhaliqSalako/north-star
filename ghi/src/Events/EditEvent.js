import React, { useState, useEffect } from "react";
import {
  getToken,
  getTokenInternal,
  useAuthContext,
  useToken,
} from "../Accounts/auth";
import { useParams } from "react-router";
import { useNavigate } from "react-router-dom";

function EditEventForm() {
  const navigate = useNavigate();
  const { token } = useAuthContext();
  const [event, setEvent] = useState({});
  const params = useParams();
  const trip_id = params.trip_id;
  const event_id = params.event_id

  async function handleSubmit(e) {
    e.preventDefault();
    const url = `${process.env.REACT_APP_ACCOUNTS_HOST}/api/trips/${trip_id}/events/${event_id}`;
    console.log(url);
    const response = await fetch(url, {
      method: "put",
      body: JSON.stringify(event),
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (response.ok) {
      navigate(`/trips/${trip_id}/itinerary/${event.date}`);
    }
    return false;
  }

  const getSingleEventData = async () => {
    const response = await fetch(
      `${process.env.REACT_APP_ACCOUNTS_HOST}/api/trips/${trip_id}/events/${event_id}`,
      {
        credentials: "include",
      }
    );

    if (response.ok) {
      const data = await response.json();
      setEvent(data);
    }
  };

  useEffect(() => {
    getSingleEventData();
  }, []);

  const handleFormChange = (e) => {
    const value = e.target.value;
    const inputName = e.target.name;
    setEvent({
      ...event,

      [inputName]: value,
    });
  };

  return (
    <div className="login-wrapper">
      <h1>Edit Event</h1>
      <form onSubmit={handleSubmit}>
        <label>
          <p>Name</p>
          <input
            name="event_name"
            onChange={handleFormChange}
            placeholder={event.event_name}
            value={event.event_name}
            type="text"
          />
        </label>
        {/* <label>
          <p>Location</p>
          <input
            name="location"
            onChange={handleFormChange}
            placeholder={event.location}
            value={event.location}
            type="text"
          />
        </label> */}
        <label>
          <p>Date</p>
          <input
            name="date"
            onChange={handleFormChange}
            placeholder={event.date}
            value={event.date}
            type="text"
          />
        </label>
        <label>
          <p>Start Time</p>
          <input
            name="start_time"
            onChange={handleFormChange}
            placeholder={event.start_time}
            value={event.start_time}
            type="text"
          />
        </label>
        <label>
          <p>Details</p>
          <input
            name="details"
            onChange={handleFormChange}
            placeholder={event.details}
            value={event.details}
            type="text"
          />
        </label>
        <div>
          <button type="submit">Submit</button>
        </div>
      </form>
    </div>
  );
}

export default EditEventForm;
