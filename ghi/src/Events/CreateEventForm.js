import React, { useState, useEffect } from "react";
import { getToken, getTokenInternal, useAuthContext, useToken } from "../Accounts/auth";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router";

function CreateEventForm() {
    const params = useParams()
    const trip_id = params.trip_id
    const date = params.date
    const [locationData, setLocationData] = useState({})
    const [locationDetail, setLocationDetail] = useState("");

  const [formData, setFormData] = useState({
    event_name: "",
    location: {},
    date: date,
    start_time: "",
    details: "",
    trip_id: trip_id,
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
        navigate(`/trips/${trip_id}/itinerary/${date}`);
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

  const handleSearch = async (e) => {
    e.preventDefault();
    const url = `${process.env.REACT_APP_ACCOUNTS_HOST}/api/location/${e.target.parentNode.querySelector("input").value}`;
    const response = await fetch(url, {
      credentials: "include",
    });
    if (response.ok) {
      const data = await response.json();
      setLocationData(data)
      setLocationDetail(`Name:${data.name}, Address:${data.formatted_address}`)
      setFormData({
        ...formData,

        ["location"]: data,
      })
    }
  }

  return (
    <div
      className="custom-body-font text-center bg-black vh-100 vw-100 pt-4"
      style={{
        backgroundImage: "url( " + require("./background.jpg") + ")",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        backgroundAttachment: "fixed",
      }}
    >
      <div className="bg-form-translucent container login-wrapper col-3 glow pt-3">
        <h1 className="text-white title-font">Create Event</h1>
        <form>
          <label className="row m-4">
            <div className="text-white text-start">Event Name:</div>
            <input
              className="form-control"
              name="event_name"
              onChange={handleFormChange}
              type="text"
            />
          </label>
          <label className="row m-4">
            <div className="text-white text-start">Location Search:</div>
            <input className="form-control" name="location" type="text" />
            <button
              className="custom-font mt-2 btn bg-blue-translucent text-white rounded-0 glow-small h-100"
              onClick={handleSearch}
            >
              Search
            </button>
          </label>
          <div className="text-white">{locationDetail}</div>
          <label className="row m-4">
            <div className="text-white text-start">Start Time:</div>
            <input
              className="form-control"
              name="start_time"
              onChange={handleFormChange}
              type="time"
            />
          </label>
          <label className="row m-4">
            <div className="text-white text-start">Event Details:</div>
            <input
              className="form-control"
              name="details"
              onChange={handleFormChange}
              type="text"
            />
          </label>
          <div>
            <button
              className="custom-font mb-4 btn bg-blue-translucent text-white rounded-0 glow-small h-100"
              type="submit"
              onClick={handleSubmit}
            >
              Create
            </button>
          </div>
        </form>
      </div>
    </div>
  );


}

export default CreateEventForm;
