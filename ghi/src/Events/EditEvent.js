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
    }
  };

  return (
    <div
      className="text-center bg-black vh-100 vw-100 pt-4"
      style={{
        backgroundImage: "url( " + require("./background.jpg") + ")",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        backgroundAttachment: "fixed",
      }}
    >
      <div className="bg-form-translucent container login-wrapper col-3 glow pt-3">
        <h1 className="text-white title-font">Edit Event</h1>
        <form>
          <label className="row m-4">
            <div className="text-white text-start">Event Name:</div>
            <input
              className="form-control"
              name="event_name"
              onChange={handleFormChange}
              placeholder={event.event_name}
              value={formData.event_name}
              type="text"
            />
          </label>
          <label className="row m-4">
            <div className="text-white text-start">Location Search:</div>
            <input
              className="form-control"
              name="location"
              placeholder={event.location?.name}
              type="text"
            />
            <button
              className="mt-2 btn bg-blue-translucent text-white rounded-0 glow-small h-100"
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
              placeholder={event.start_time}
              value={formData.start_time}
              type="time"
            />
          </label>
          <label className="row m-4">
            <div className="text-white text-start">Event Details:</div>
            <input
              className="form-control"
              name="details"
              onChange={handleFormChange}
              placeholder={event.details}
              value={formData.details}
              type="text"
            />
          </label>
          <div>
            <button
              className="mb-4 btn bg-blue-translucent text-white rounded-0 glow-small h-100"
              onClick={handleSubmit}
              type="submit"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EditEventForm;
