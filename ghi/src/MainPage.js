import React, { useEffect, useState } from "react";
import Tripsidebar from "./Trips/Tripsidebar";
import SignUp from "./Accounts/SignUp";
import Login from "./Accounts/Login";

function MainPage() {

  return (
    <>
      <div className="px-4 py-5 my-5 text-center">
        <h1 className="display-5 fw-bold font-['Orbitron']">North Star</h1>
        <div className="col-lg-6 mx-auto">
          <p className="lead mb-4"></p>
        </div>
      <div>
      < SignUp />
      </div>
      <div>
        < Login />
      </div>
    </div>

    </>
  );
}

export default MainPage;
