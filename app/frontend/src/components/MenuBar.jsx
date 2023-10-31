import React from "react";
import { Link, useNavigate } from "react-router-dom";

function MenuBar() {
  const navigate = useNavigate();
  const logout = () => {
    localStorage.clear();
    navigate("/login");
  };
  const auth = localStorage.getItem("jwt");
  return (
    <div>
      <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container-fluid">
          <Link className="navbar-brand" to={"/"}>
            PassSec
          </Link>

          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-auto">
              {/* <li className="nav-item">
                <Link
                  className="nav-link active"
                  aria-current="page"
                  to={"/signup"}
                >
                  Sign Up
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to={"/login"}>
                  Log In
                </Link>
              </li>
              <li onClick={logout} className="nav-item">
                <Link className="nav-link" to={"/logout"}>
                  LogOut
                </Link> */}
              {/* </li> */}
              <li onClick={logout} className="nav-link">
                {" "}
                {auth ? (
                  <Link to="/logout">LogOut</Link>
                ) : (
                  <li>
                    <Link to="/login">Login</Link>
                  </li>
                )}
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
}

export default MenuBar;
