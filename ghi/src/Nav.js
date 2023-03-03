import { NavLink } from "react-router-dom";
import LogOut from "./Accounts/LogOut";
import { useToken, getToken } from "./Accounts/auth";

function Nav() {
  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary">
      <div className="container-fluid">
            <NavLink class="navbar-brand" to="/">
      <img src="../public/north_star_logo.jpg" alt="Logo" width="30" height="24" className="d-inline-block align-text-top">
      Bootstrap
    </Navlink>
        <div className="navbar-header">
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
        </ul>
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
