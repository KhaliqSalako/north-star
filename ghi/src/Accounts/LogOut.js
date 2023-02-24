import { useToken } from "./auth";
import React, { useState } from "react";

function LogOut() {
  const { token, logout } = useToken();

  const handleLogout = async (e) => {
    e.preventDefault();
    await logout();
    console.log("token-----", token);
  };

  return (
    <div>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
}

export default LogOut;
