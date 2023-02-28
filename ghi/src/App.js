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
import Itinerary from "./Events/Itinerary";
import EventDetail from "./Events/EventDetail";
import EditEventForm from "./Events/EditEvent";
import CreateEventForm from "./Events/CreateEventForm";

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
          <Route path="/trips/edit/:id" element={<EditTripForm />} />
          <Route path="/trips/:id" element={<SingleTripList />} />
          <Route path="/trips/:id/itinerary/:date" element={<Itinerary />} />
          <Route
            path="/trips/:trip_id/events/detail/:event_id"
            element={<EventDetail />}
          />
          <Route
            path="/trips/:trip_id/events/detail/:event_id/edit"
            element={<EditEventForm />}
          />
          <Route
            path="/trips/:trip_id/events/:date/create"
            element={<CreateEventForm />}
          />
          {/* <ErrorNotification error={error} /> */}
          {/* <Construct info={launch_info} /> */}
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
