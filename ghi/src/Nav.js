import { NavLink } from "react-router-dom";
import LogOut from "./Accounts/LogOut";
import { useToken, getToken } from "./Accounts/auth";

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
            <li
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
            </li>
          </ul>
        </div>
        {/* <div className="navbar-header">
          <NavLink className="nav-item text-3xl font-['Orbitron']" to="/">
            North Star
          </NavLink>
        </div>
        <ul className="nav navbar-nav navbar-right">
          <li>
            <NavLink className="nav-item" to="/trips">
              Trips
            </NavLink>
          </li>
          <li>
            <NavLink className="nav-item" to="/signup">
              Sign Up
            </NavLink>
          </li>
          <li>
            <NavLink to="/login" className="nav-item">
              Login
            </NavLink>
          </li>

          <li className="nav-item">
            <LogOut />
          </li>
        </ul> */}
      </div>
    </nav>
  );
}

export default Nav;



    {/* // <nav className="navbar navbar-expand-lg bg-body-tertiary">
    //   <div className="container-fluid">
    //     <div>
    //       <ul className="navbar-nav">
    //         <li className="mt-3">
    //           <NavLink className="nav-item text-2xl font-['Orbitron']" to="/">
    //             North Star
    //           </NavLink>
    //         </li>
    //         <li>
    //           <NavLink to="/login" className="nav-item">
    //             Login
    //           </NavLink>
    //         </li>
    //         <li className="nav-item">
    //           <LogOut />
    //         </li>
    //         <li>
    //           <NavLink className="nav-item" to="/signup">
    //             Sign Up
    //           </NavLink>
    //         </li>
    //         <li className="nav-item">
    //           <NavLink className="nav-item" to="/trips">
    //             Trips
    //           </NavLink>
    //         </li>
    //       </ul>
    //     </div>
    //     <button
    //       className="navbar-toggler"
    //       type="button"
    //       data-bs-toggle="collapse"
    //       data-bs-target="#navbarSupportedContent"
    //       aria-controls="navbarSupportedContent"
    //       aria-expanded="false"
    //       aria-label="Toggle navigation"
    //     >
    //       <span className="navbar-toggler-icon"></span>
    //     </button>
    //     <div className="collapse navbar-collapse" id="navbarSupportedContent">
    //       <ul className="navbar-nav me-auto mb-2 mb-lg-0"></ul>
    //     </div>
    //   </div>
    // </nav> */}
