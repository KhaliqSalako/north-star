import { NavLink } from "react-router-dom";
import LogOut from "./Accounts/LogOut";
import { useToken } from "./Accounts/auth";

function Nav() {
  const { token } = useToken();

  return (
    <nav className="navbar navbar-expand-lg bg-nav-translucent sticky-top">
      <div className="container-fluid ">
        <NavLink className="container me-4 ms-1 text-white nav-link"
        to={ token ? "/trips" : "/" }>
          <img
            src={require("./north_star_logo.png")}
            alt="Logo"
            width="50"
            height="45"
            className="d-flex align-content-center glow"
            style={{
              border: "1px solid white",
            }}
          />
          <div className="row">North Star</div>
        </NavLink>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul
            className="navbar-nav"
            style={{
              width: "10%",
            }}
          >
          </ul>
          <ul
            className="navbar-nav d-flex flex-row-reverse"
            style={{
              width: "90%",
            }}
          >
            <li className="nav-item d-flex align-items-center">
              <LogOut />
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Nav;
