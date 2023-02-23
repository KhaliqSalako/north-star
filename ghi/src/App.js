import { useEffect, useState } from 'react';
// import Construct from './Construct.js'
import ErrorNotification from './ErrorNotification';
import './App.css';
import MainPage from './MainPage.js';
import Nav from "./Nav";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./Login.js";
import SignUp from "./SignUp";
import { AuthProvider, useToken } from "./auth";




function App() {

  function GetToken() {
    // Get token from JWT cookie (if already logged in)
    useToken();
    return null;
  }

  return (

    <BrowserRouter>
    <Nav />
      <AuthProvider>
        <GetToken />
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          {/* <ErrorNotification error={error} /> */}
          {/* <Construct info={launch_info} /> */}
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
