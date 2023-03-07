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
          <div className="modal-content bg-dark">
            <div className="modal-header">
              <h1 className="modal-title fs-5 text-white" id="staticBackdropLabel1">
                Login
              </h1>
              <button
                type="button"
                className="btn-close bg-blue"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body bg-dark">
              <form onSubmit={handleSubmit}>
                <label>
                  <p className="text-white">Username</p>
                  <input
                    name="username"
                    onChange={handleFormChange}
                    type="text"
                  />
                </label>
                <label>
                  <p className="text-white">Password</p>
                  <input
                    name="password"
                    onChange={handleFormChange}
                    type="password"
                  />
                </label>
                <div className="mt-3">
                  <button
                  data-bs-dismiss="modal"
                  className="btn rounded-pill text-white bg-blue"
                  type="submit">Submit</button>
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
