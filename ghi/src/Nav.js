import { NavLink } from "react-router-dom";
import LogOut from "./Accounts/LogOut";

function Nav() {
  return (
    <nav className="navbar navbar-expand-lg bg-dark">
      <div className="container-fluid ">
        <NavLink className="me-4 ms-1" to="/">
          <img
            src={require("./north_star_logo.png")}
            alt="Logo"
            width="50"
            height="45"
            className="d-flex align-content-center"
            style={{
              border:"1px solid white"
            }}
          />
        </NavLink>
        <div
          className="collapse navbar-collapse"
          id="navbarNav"
        >
          <ul
            className="navbar-nav"
            style={{
              width:"10%"
            }}
          >
            <li
              className="nav-item"
            >
              <NavLink
                to="/"
                className="text-white nav-link bg-blue rounded-pill"
              >
                North Star
              </NavLink>
            </li>
            <li
              className="nav-item"
            >
              <NavLink
                to="/trips"
                className="text-white nav-link"
              >
                Trips
              </NavLink>
            </li>
          </ul>
          <ul 
            className="navbar-nav d-flex flex-row-reverse"
            style={{
              width:"90%"
            }}
          >
            <li className="nav-item d-flex align-items-center">
              <LogOut />
            </li>
            {/* <li
              className="nav-item "
            >
              <NavLink
                to="/signup"
                className="text-white nav-link"
              >
                Sign Up
              </NavLink>
            </li>
            <li
              className="nav-item "
            >
              <NavLink
                to="/login"
                className="text-white nav-link"
              >
                Login
              </NavLink>
            </li> */}
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Nav;
