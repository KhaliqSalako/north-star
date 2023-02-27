import { useEffect, useState } from "react";
import ErrorNotification from "./Misc/ErrorNotification";
import "./App.css";
import MainPage from "./MainPage.js";
import Nav from "./Nav";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./Accounts/Login";
import SignUp from "./Accounts/SignUp";
import { AuthProvider, useToken } from "./Accounts/auth";
import TripList from "./Trips/TripList";
import CreateTripForm from "./Trips/CreateTripForm";
import EditTripForm from "./Trips/EditTripForm";
import SingleTripList from "./Trips/SingleTripList";

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
          <Route path="/trips/create" element={<CreateTripForm />} />
          <Route path="/trips/edit" element={<EditTripForm />} />
          <Route path="/trips/" element={<SingleTripList />} />
          {/* <ErrorNotification error={error} /> */}
          {/* <Construct info={launch_info} /> */}
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
