import { useToken } from "./auth";
import React, { useState } from "react";
import { Link } from "react-router-dom";
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
      // console.log(e.target.value);
      // console.log(formData)
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
    console.log("handlesubmit called")
  };

  return (
    <>
      <p
        type="button"
        className="btn btn-primary"
        data-bs-toggle="modal"
        data-bs-target="#exampleModal"
      >
        Login
      </p>

      <div
        className="modal fade"
        backdrop="static"
        id="exampleModal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
        data-bs-backdrop="static"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                Login
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <form onSubmit={handleSubmit}>
                <div className="mb-3 mt-4">
                  <label htmlFor="exampleInputEmail1">
                    Username
                    <input
                      name="username"
                      onChange={handleFormChange}
                      type="text"
                      className="form-control"
                      id="exampleInputEmail2"
                      aria-describedby="emailHelp"
                    />
                  </label>
                </div>
                <div className="mb-3">
                  <label htmlFor="exampleInputPassword1" className="form-label">
                    Password
                    <input
                      name="password"
                      onChange={handleFormChange}
                      type="password"
                      className="form-control"
                      id="exampleInputPassword2"
                    />
                  </label>
                </div>
                <button type="submit" className="btn btn-light mt-3">
                  LOGIN
                </button>
                {/* <p>
                  Not a member?
                  <Link href="#">
                    Signup now
                  </Link>
                </p> */}
                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-secondary"
                    data-bs-dismiss="modal"
                  >
                    Close
                  </button>
                  <button type="button" className="btn btn-primary">
                    Save changes
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
