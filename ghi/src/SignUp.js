import { useToken } from "./auth";
import React, { useState } from "react";

function SignUp() {
  const { token, signup } = useToken();

  const [formData, setFormData] = useState({
        name: '',
        email: '',
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
        const name = formData['name']
        const email = formData['email']
        await signup(username, password, email, name)
        };

    return (
      <div className="login-wrapper">
        <h1>Sign Up</h1>
        <form onSubmit={handleSubmit}>
          <label>
            <p>Name</p>
            <input name="name" onChange={handleFormChange} type="text" />
          </label>
          <label>
            <p>Email</p>
            <input name="email" onChange={handleFormChange} type="text" />
          </label>
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
      </div>
    );
}

export default SignUp;
