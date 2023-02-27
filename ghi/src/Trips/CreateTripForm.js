import React, { useState, useEffect } from "react";
import { getToken, getTokenInternal, useAuthContext, useToken } from "../Accounts/auth";

function CreateTripForm() {
  const [formData, setFormData] = useState({
    name: "",
    start_date: "",
    end_date: "",
    picture_url: "",
  });

    const { token } = useAuthContext();

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
        await getTokenInternal()
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
    const start_date = formData["start_date"];
    const end_date = formData["end_state"];
    const picture_url = formData["picture_url"];
    await createTrip(name, start_date, end_date, picture_url);
  };

  return (
    <div className="login-wrapper">
      <h1>Create a Trip</h1>
      <form onSubmit={handleSubmit}>
        <label>
          <p>Name</p>
          <input name="name" onChange={handleFormChange} type="text" />
        </label>
        <label>
          <p>Start Date</p>
          <input name="start_date" onChange={handleFormChange} type="text" />
        </label>
        <label>
          <p>End Date</p>
          <input name="end_date" onChange={handleFormChange} type="text" />
        </label>
        <label>
          <p>Photo</p>
          <input name="picture_url" onChange={handleFormChange} type="text" />
        </label>
        <div>
          <button type="submit">Create</button>
        </div>
      </form>
    </div>
  );


}

export default CreateTripForm;
