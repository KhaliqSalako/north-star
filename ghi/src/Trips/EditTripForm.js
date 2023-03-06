import React, { useState, useEffect } from "react";
import {
  getToken,
  getTokenInternal,
  useAuthContext,
  useToken,
} from "../Accounts/auth";
import { useParams } from "react-router";
import { useNavigate } from "react-router-dom";


function EditTripForm() {
  const navigate = useNavigate();
  const { token } = useAuthContext();
  const [trip, setTrip] = useState([]);
  const params = useParams();
  const trip_id = params.id


  async function handleSubmit(e) {
    e.preventDefault();
    const url = `${process.env.REACT_APP_ACCOUNTS_HOST}/api/trips/${trip_id}`;
    console.log(url)
    const response = await fetch(url, {
      method: "put",
      body: JSON.stringify(trip),
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (response.ok) {
      navigate("/trips");
    }
    return false;
  }

  const getSingleTripData = async () => {
    const response = await fetch(
      `${process.env.REACT_APP_ACCOUNTS_HOST}/api/trips/${trip_id}`,
      {
        credentials: "include",
      }
    );

    if (response.ok) {
      const data = await response.json();
      setTrip(data);
    }
  };

  useEffect(() => {
    getSingleTripData();
  }, []);

  const handleFormChange = (e) => {
    const value = e.target.value;
    const inputName = e.target.name;
    setTrip({
      ...trip,

      [inputName]: value,
    });
  };


  return (
    <div className="login-wrapper">
      <h1>Edit a Trip</h1>
      <form onSubmit={handleSubmit}>
        <label>
          <p>Name</p>
          <input
            name="name"
            onChange={handleFormChange}
            placeholder={trip.name}
            defaultValue={trip.name}
            // changed ^ value to defaultValue for every field
            type="text"
          />
        </label>
        <label>
          <p>Start Date</p>
          <input
            name="start_date"
            onChange={handleFormChange}
            placeholder={trip.start_date}
            defaultValue={trip.start_date}
            type="text"
          />
        </label>
        <label>
          <p>End Date</p>
          <input
            name="end_date"
            onChange={handleFormChange}
            placeholder={trip.end_date}
            defaultValue={trip.end_date}
            type="text"
          />
        </label>
        <label>
          <p>Photo</p>
          <input
            name="picture_url"
            onChange={handleFormChange}
            placeholder={trip.picture_url}
            defaultValue={trip.picture_url}
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

export default EditTripForm;
