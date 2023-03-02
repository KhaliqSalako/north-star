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
  const event_id = params.event_id;
  const date = params.date;
  const [locationData, setLocationData] = useState({});
  const [locationDetail, setLocationDetail] = useState("");
  const [formData, setFormData] = useState({
    event_name: "",
    location: {},
    date: date,
    start_time: "",
    details: "",
    trip_id: trip_id,
  });

  async function handleSubmit(e) {
    e.preventDefault();
    const url = `${process.env.REACT_APP_ACCOUNTS_HOST}/api/trips/${trip_id}/events/${event_id}`;
    console.log(url);
    const response = await fetch(url, {
      method: "put",
      body: JSON.stringify(formData),
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
      setFormData(data)
    }
  };

  useEffect(() => {
    getSingleEventData();
  }, []);

  const handleFormChange = (e) => {
    const value = e.target.value;
    const inputName = e.target.name;
    setFormData({
      ...formData,

      [inputName]: value,
    });
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    const url = `${process.env.REACT_APP_ACCOUNTS_HOST}/api/location/${
      e.target.parentNode.querySelector("input").value
    }`;
    const response = await fetch(url, {
      credentials: "include",
    });
    if (response.ok) {
      const data = await response.json();
      setLocationData(data);
      setLocationDetail(`Name:${data.name}, Address:${data.formatted_address}`);
      setFormData({
        ...formData,

        ["location"]: data,
      });
      console.log(data);
    }
  };

  return (
    <div className="login-wrapper">
      <h1>Edit Event</h1>
      <form>
        <label>
          <p>Name</p>
          <input
            name="event_name"
            onChange={handleFormChange}
            placeholder={event.event_name}
            value={formData.event_name}
            type="text"
          />
        </label>
        <label>
          <p>Location</p>
          <input
            name="location"
            placeholder={event.location?.name}
            type="text"
          />
          <button onClick={handleSearch}>Search</button>
        </label>
        <div>{locationDetail}</div>
        <label>
          <p>Date</p>
          <input
            name="date"
            onChange={handleFormChange}
            placeholder={event.date}
            value={formData.date}
            type="text"
          />
        </label>
        <label>
          <p>Start Time</p>
          <input
            name="start_time"
            onChange={handleFormChange}
            placeholder={event.start_time}
            value={formData.start_time}
            type="text"
          />
        </label>
        <label>
          <p>Details</p>
          <input
            name="details"
            onChange={handleFormChange}
            placeholder={event.details}
            value={formData.details}
            type="text"
          />
        </label>
        <div>
          <button onClick={handleSubmit} type="submit">
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}

export default EditEventForm;
