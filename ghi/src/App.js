import { useEffect, useState } from "react";
// import Construct from './Construct.js'
import ErrorNotification from "./Misc/ErrorNotification";
import "./App.css";
import MainPage from "./MainPage.js";
import Nav from "./Nav";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./Accounts/Login";
import SignUp from "./Accounts/SignUp";
import { AuthProvider, useToken } from "./Accounts/auth";
import TripList from "./Trips/TripList";

function App() {
  function GetToken() {
    // Get token from JWT cookie (if already logged in)
    useToken();
    return null;
  }

  return (
    <BrowserRouter>
      <AuthProvider>
        <GetToken />
        <Nav />
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/trips" element={<TripList />} />
          {/* <ErrorNotification error={error} /> */}
          {/* <Construct info={launch_info} /> */}
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
