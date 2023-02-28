import React, { useState, useEffect } from "react";
import { getToken, getTokenInternal, useAuthContext, useToken } from "../Accounts/auth";
import { useNavigate } from "react-router-dom";

function CreateEventForm() {
  const [formData, setFormData] = useState({
    event_name: "",
    location: {},
    date: "",
    start_time: "",
    details: "",
    trip_id: "",
  });

    const { token } = useAuthContext();
    const navigate = useNavigate();

    async function handleSubmit(e) {
    e.preventDefault();
    const url = `${process.env.REACT_APP_ACCOUNTS_HOST}/api/trips/${trip_id}/events`;
    const response = await fetch(url, {
      method: "post",
      body: JSON.stringify(
        formData,
      ),
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (response.ok) {
        navigate(`/trips/${trip_id}/events`);
    }
    return false;
  }

  const handleFormChange = (e) => {
    const value = e.target.value;
    const inputName = e.target.name;
    setFormData({
      ...formData,

      [inputName]: value,
    });
  };

  return (
    <div className="login-wrapper">
      <h1>Create an Event</h1>
      <form onSubmit={handleSubmit}>
        <label>
          <p>Event Name</p>
          <input name="name" onChange={handleFormChange} type="text" />
        </label>
        <label>
          <p>Location</p>
          <input name="location" onChange={handleFormChange} type="text" />
        </label>
        <label>
          <p>Date</p>
          <input name="date" onChange={handleFormChange} type="text" />
        </label>
        <label>
          <p>Start Time</p>
          <input name="start_time" onChange={handleFormChange} type="text" />
        </label>
         <label>
          <p>Details</p>
          <input name="details" onChange={handleFormChange} type="text" />
        </label>
        <div>
          <button type="submit">Create</button>
        </div>
      </form>
    </div>
  );


}

export default CreateTripForm;
