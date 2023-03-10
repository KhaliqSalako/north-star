import { useToken } from "./auth";
import React, { useState } from "react";

function SignUp() {
  const { signup } = useToken();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    username: "",
    password: "",
  });

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
    const username = formData["username"];
    const password = formData["password"];
    const name = formData["name"];
    const email = formData["email"];
    await signup(username, password, email, name);
  };

  return (
    <>
      <button
        type="button"
        className="custom-font btn bg-dark btn-lg mt-3 mx-3 glow-small text-white rounded-0"
        style={{ width: "115px" }}
        data-bs-toggle="modal"
        data-bs-target="#staticBackdrop"
      >
        Sign Up
      </button>

      <div
        className="modal fade custom-body-font"
        id="staticBackdrop"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        tabIndex="-1"
        aria-labelledby="staticBackdropLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content bg-dark glow-small">
            <div className="modal-header">
              <img
                src={require("../north_star_logo.png")}
                alt="Logo"
                width="50"
                height="45"
                className="d-flex align-content-center glow-small"
                style={{
                  border: "1px solid white",
                }}
              />
              <h1
                className="custom-font modal-title fs-5 text-white center"
                id="staticBackdropLabel"
              >
                Create a New Account
              </h1>
              <button
                type="button"
                className="btn-close bg-dark glow-small border"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="container modal-body bg-dark col-6">
              <form onSubmit={handleSubmit}>
                <p>
                  <input
                    className="form-control"
                    name="name"
                    placeholder="Name"
                    required
                    onChange={handleFormChange}
                    type="text"
                  />
                </p>
                <p>
                  <input
                    className="form-control"
                    name="email"
                    placeholder="Email Address"
                    onChange={handleFormChange}
                    type="text"
                    required
                  />
                </p>
                <p>
                  <input
                    className="form-control"
                    name="username"
                    placeholder="Username"
                    onChange={handleFormChange}
                    type="text"
                    required
                  />
                </p>
                <p>
                  <input
                    className="form-control"
                    name="password"
                    placeholder="Password"
                    onChange={handleFormChange}
                    type="password"
                    required
                  />
                </p>
                <div className="mt-3">
                  <button
                    data-bs-dismiss="modal"
                    type="submit"
                    className="custom-font btn btn-outline-secondary glow-small text-white rounded-0"
                  >
                    Submit
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default SignUp;
