import { NavLink, useLocation } from "react-router-dom";
import LogOut from "./Accounts/LogOut";
import { useState, useEffect } from "react";
import { useToken } from "./Accounts/auth";


function Nav() {
  const { token } = useToken();
  const [name, setName] = useState("");
  const location = useLocation()

  const getName = async () => {
    const response = await fetch(
      `${process.env.REACT_APP_ACCOUNTS_HOST}/token`,
      {
        credentials: "include",
      }
    );
    if (response.ok) {
      const data = await response.json();
      setName(data?.account?.name);
    }
  };

  useEffect(() => {
    getName();
  }, [location]);

  return (
    <nav
      className="d-flex navbar navbar-expand-lg bg-nav-translucent sticky-top"
      style={{ height: "90px" }}
    >
      <div className="border-primary container-fluid">
        <NavLink
          className="me-4 ms-1 text-white nav-link"
          to={token ? "/trips" : "/"}
          style={{ width: "100px" }}
        >
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
          <div className="row logo-font">North Star</div>
        </NavLink>
        <div
          className="collapse navbar-collapse"
          id="navbarNav"
          style={{ width: "100%" }}
        >
            <div className="d-flex justify-content-end flex-row navbar-nav">
              {token ? (
                <div className="navbar-nav mx-auto">
                  <h4 className=" text-white cursive text-glow">
                    <span>Where to next, {name}?</span>
                  </h4>
                </div>
              ) : null}
              </div>
              <div className="nav-item bd-highlight ms-auto custom-font">
                <LogOut />
              </div>
        </div>
      </div>
    </nav>
  );
}

export default Nav;
