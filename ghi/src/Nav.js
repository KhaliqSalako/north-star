import { NavLink } from "react-router-dom";
import LogOut from "./Accounts/LogOut";
import { useToken, getToken } from "./Accounts/auth";


function Nav() {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-gradient-to-l from-blue to-gray-dark nav-sticky">
      <div className="container-fluid">
        <div id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="mt-3">
              <NavLink
                className="navbar-brand text-2xl font-['Orbitron']"
                to="/"
              >
                North Star
              </NavLink>
            </li>
            <li className="nav-item dropdown">
              <NavLink
                className="nav-link dropdown-toggle"
                to="/login"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                Login
              </NavLink>
            </li>
            <li className="nav-item dropdown">
              <LogOut />
            </li>
            <li className="nav-item dropdown">
              <NavLink
                className="nav-link dropdown-toggle"
                to="/signup"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                Sign Up
              </NavLink>
            </li>
            <li className="nav-item dropdown">
              <NavLink
                className="nav-link dropdown-toggle"
                to="/trips"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                Trips
              </NavLink>
            </li>
            <li className="nav-item dropdown">
              <NavLink
                className="nav-link dropdown-toggle"
                to="/trips/create"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                Create a Trip
              </NavLink>
            </li>
          </ul>
        </div>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0"></ul>
        </div>
      </div>
    </nav>
  );
}

export default Nav;
