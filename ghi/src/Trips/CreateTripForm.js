import React, { useState, useEffect } from "react";
import { getToken, getTokenInternal, useAuthContext, useToken } from "../Accounts/auth";
import { useNavigate } from "react-router-dom";
function CreateTripForm() {
  const [formData, setFormData] = useState({
    name: "",
    start_date: "",
    end_date: "",
    picture_url: "",
  });
    const { token } = useAuthContext();
    const navigate = useNavigate();
    async function createTrip(name, start_date, end_date, picture_url) {
    const url = `${process.env.REACT_APP_ACCOUNTS_HOST}/api/trips`;
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
        navigate("/trips");
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
  const handleSubmit = async (e) => {
    e.preventDefault();
    const name = formData["name"];
    const start_date = formData["start_date"].toString();
    const end_date = formData["end_date"].toString();
    const picture_url = formData["picture_url"];
    console.log(start_date)
    await createTrip(name, start_date, end_date, picture_url);
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
        <h1 className="text-white title-font">Create a Trip</h1>
        <form onSubmit={handleSubmit}>
          <label className="row m-4">
            <div className="text-white text-start">Name:</div>
            <input
              className="form-control"
              placeholder="Trip Name"
              name="name"
              required
              onChange={handleFormChange}
              type="text"
            />
          </label>
          <label className="row m-4">
            <div className="text-white text-start">Start Date:</div>
            <input
              className="form-control"
              placeholder="Start Date"
              name="start_date"
              required
              onChange={handleFormChange}
              type="date"
            />
          </label>
          <label className="row m-4">
            <div className="text-white text-start">End Date:</div>
            <input
              className="form-control"
              placeholder="End Date"
              name="end_date"
              required
              onChange={handleFormChange}
              type="date"
            />
          </label>
          <label className="row m-4">
            <div className="text-white text-start">Your Trip Photo:</div>
            <input
              name="picture_url"
              placeholder="Photo URL"
              className="form-control"
              onChange={handleFormChange}
              type="text"
            />
          </label>
          <div>
            <button
              className="mb-4 btn bg-blue-translucent text-white rounded-0 glow-small h-100"
              type="submit"
            >
              Create
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
export default CreateTripForm;
