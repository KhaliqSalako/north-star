import { useToken } from "./auth";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";


function SignUp() {
  const { token, signup } = useToken();
  const navigate = useNavigate();

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
    navigate("/trips");

  };

  return (
    <>
      <button
        type="button"
        className="btn bg-dark glow-small text-white rounded-0"
        data-bs-toggle="modal"
        data-bs-target="#staticBackdrop"
      >
        Sign Up
      </button>

      <div
        className="modal fade"
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
                className="modal-title fs-5 text-white center"
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
                  />
                </p>
                <p>
                  <input
                    className="form-control"
                    name="username"
                    placeholder="Username"
                    onChange={handleFormChange}
                    type="text"
                  />
                </p>
                <p>
                  <input
                    className="form-control"
                    name="password"
                    placeholder="Password"
                    onChange={handleFormChange}
                    type="password"
                  />
                </p>
                <div className="mt-3">
                  <button
                    data-bs-dismiss="modal"
                    type="submit"
                    className="btn btn-outline-secondary glow-small text-white rounded-0"
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



    // <div className="login-wrapper">
    //   <h1>Sign Up</h1>
    //   <form onSubmit={handleSubmit}>
    //     <label>
    //       <p>Name</p>
    //       <input name="name" onChange={handleFormChange} type="text" />
    //     </label>
    //     <label>
    //       <p>Email</p>
    //       <input name="email" onChange={handleFormChange} type="text" />
    //     </label>
    //     <label>
    //       <p>Username</p>
    //       <input name="username" onChange={handleFormChange} type="text" />
    //     </label>
    //     <label>
    //       <p>Password</p>
    //       <input name="password" onChange={handleFormChange} type="password" />
    //     </label>
    //     <div>
    //       <button type="submit">Submit</button>
    //     </div>
    //   </form>
    // </div>
