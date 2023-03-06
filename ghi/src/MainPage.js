import React, { useEffect, useState } from "react";
import Tripsidebar from "./Trips/Tripsidebar";

function MainPage() {

  return (
      <div 
        className="text-center bg-black vh-100 vw-100"
        style={{
          backgroundImage:`url(background.jpg)`,
          backgroundRepeat: 'no-repeat',
          backgroundSize: "cover"
        }}
      >
        <h1 className="pt-5 fw-bold font-['Orbitron']">North Star</h1>
        <div className="col-lg-6 mx-auto">
          <p className="lead mb-4"></p>
        </div>
      </div>
  );
}

export default MainPage;
