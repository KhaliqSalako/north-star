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
          <div className="modal-content bg-dark">
            <div className="modal-header">
              <h1 className="modal-title fs-5 text-white" id="staticBackdropLabel">
                Sign Up
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
                  <p className="text-white">Name</p>
                  <input name="name" onChange={handleFormChange} type="text" />
                </label>
                <label>
                  <p className="text-white">Email</p>
                  <input name="email" onChange={handleFormChange} type="text" />
                </label>
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
                    type="submit"
                    className="btn rounded-pill text-white bg-blue "
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
