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
    <div
      className="text-center bg-black vh-100 vw-100 pt-4"
      style={{
        backgroundImage: "url( " + require("./background.jpg") + ")",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        backgroundAttachment: "fixed",
      }}
    >
      <div className="container login-wrapper col-4 glow bg-form-translucent">
        <h1 className="text-white">Edit a Trip</h1>
        <form onSubmit={handleSubmit}>
          <label className="row m-4">
            <p className="text-white">Name</p>
            <input
              name="name"
              onChange={handleFormChange}
              placeholder={trip.name}
              defaultValue={trip.name}
              type="text"
            />
          </label>
          <label className="row m-4">
            <p className="text-white">Start Date</p>
            <input
              name="start_date"
              onChange={handleFormChange}
              placeholder={trip.start_date}
              defaultValue={trip.start_date}
              type="text"
            />
          </label>
          <label className="row m-4">
            <p className="text-white">End Date</p>
            <input
              name="end_date"
              onChange={handleFormChange}
              placeholder={trip.end_date}
              defaultValue={trip.end_date}
              type="text"
            />
          </label>
          <label className="row m-4">
            <p className="text-white">Photo</p>
            <input
              name="picture_url"
              onChange={handleFormChange}
              placeholder={trip.picture_url}
              defaultValue={trip.picture_url}
              type="text"
            />
          </label>
          <div>
            <button
              className="mb-4 btn bg-blue-translucent text-white rounded-0 glow-small h-100"
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

export default EditTripForm;
