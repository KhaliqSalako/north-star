import { useToken } from "./auth";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";


function Login() {
  const { login } = useToken();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const handleFormChange = (e) => {
    const value = e.target.value;
      console.log(e.target.value);
      console.log(formData)
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
    console.log(formData);
    await login(username, password);
    navigate("/trips")
    // console.log("handlesubmit called")
  };

  return (
    <>
      <button
        type="button"
        className="btn bg-blue rounded-pill text-white"
        data-bs-toggle="modal"
        data-bs-target="#staticBackdrop1"
      >
        Login
      </button>
      <div
        className="modal fade"
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
                className="modal-title fs-5 text-white center"
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
              <form onSubmit={handleSubmit}>
                <p>
                  <label className="text-white glow-small">
                    <input
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
                    className="btn btn-outline-secondary glow-small text-white rounded-0"
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




    // <div className="login-wrapper">
    //   <h1>Please Log In</h1>
    //   <form onSubmit={handleSubmit}>
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
