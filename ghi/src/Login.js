import { useToken } from "./auth";
import React, { useState } from "react";

function Login() {
  const { token, login, logout } = useToken();

  const [formData, setFormData] = useState({
        username: '',
        password: '',
    })

  const handleFormChange = (e) => {
        const value = e.target.value;
        const inputName = e.target.name;
        setFormData({
            ...formData,

            [inputName]: value
        });
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const username = formData['username']
        const password = formData['password']
        console.log(username)
        console.log(password)
        await login(username, password)
        };

    const handleLogout = async (e) => {
        e.preventDefault();
        await logout()
        console.log("token-----", token)
        };

    return (
      <div className="login-wrapper">
        <h1>Please Log In</h1>
        <form onSubmit={handleSubmit}>
          <label>
            <p>Username</p>
            <input name="username" onChange={handleFormChange} type="text" />
          </label>
          <label>
            <p>Password</p>
            <input name="password" onChange={handleFormChange} type="password" />
          </label>
          <div>
            <button type="submit">Submit</button>
          </div>
        </form>
        <div>
            <button onClick={handleLogout}>Logout</button>
          </div>
      </div>
    );
}

export default Login;
