import { useToken } from "./auth";
import React, { useState } from "react";

function Login() {
  const { login } = useToken();

  const [formData, setFormData] = useState({
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
    await login(username, password);
  };

  return (
    <>
      <button
        type="button"
        className="custom-font btn bg-dark btn-lg mt-3 mx-3 glow-small text-white rounded-0"
        style={{ width: "115px" }}
        data-bs-toggle="modal"
        data-bs-target="#staticBackdrop1"
      >
        Login
      </button>
      <div
        className="modal fade custom-body-font"
        id="staticBackdrop1"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        tabIndex="-1"
        aria-labelledby="staticBackdropLabel1"
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
                id="staticBackdropLabel1"
              >
                Log into North Star
              </h1>
              <button
                type="button"
                className="btn-close bg-dark glow-small border"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="container modal-body bg-dark col-6">
              <form id="login-form" onSubmit={handleSubmit}>
                <p>
                  <label className="text-white glow-small">
                    <input
                      required
                      className="form-control "
                      name="username"
                      placeholder="Username"
                      onChange={handleFormChange}
                      type="text"
                    />
                  </label>
                </p>
                <label className="text-white glow-small">
                  <input
                    required
                    className="form-control"
                    name="password"
                    placeholder="Password"
                    onChange={handleFormChange}
                    type="password"
                  />
                </label>
                <div className="mt-3">
                  <button
                    data-bs-dismiss="modal"
                    className="custom-font btn btn-outline-secondary glow-small text-white rounded-0"
                    type="submit"
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

export default Login;
