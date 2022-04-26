import React from "react";
import { Link, Outlet } from "react-router-dom";
import "./App.css";
import { useAuth } from "./data/hooks/useAuth";

export default function App() {
  const auth = useAuth();
  const [expanded, setExpanded] = React.useState(false);

  const toggleNav = () => {
    setExpanded(!expanded);
  };

  return (
    <>
      <nav className="navbar navbar-expand-md navbar-dark bg-primary fixed-left align-items-center">
        <p className="navbar-brand text-center">{auth.user?.data?.username}</p>

        <button
          className="navbar-toggler collapsed show mx-2"
          type="button"
          data-toggle="collapse"
          aria-expanded="false"
          aria-label="Toggle navigation"
          onClick={toggleNav}
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className={`navbar-collapse collapse ${expanded ? "show" : ""}`}>
          <div
            style={{
              padding: 32,
              marginTop: 100,
              width: "100%",
              height: 50,
              background: "#000",
            }}
          ></div>
          <h1 className="navbar-brand pop">Navigation</h1>
          <ul className="navbar-nav">
            <li className="nav-item d-flex align-items-center">
              <svg
                style={{ width: 24, height: 24, color: "#fff" }}
                viewBox="0 0 24 24"
              >
                <path
                  fill="currentColor"
                  d="M10,20V14H14V20H19V12H22L12,3L2,12H5V20H10Z"
                />
              </svg>
              <Link className="nav-link" to="/home">
                <p className="m-0 pop">Home</p>
              </Link>
            </li>
            <li className="nav-item d-flex align-items-center">
              <svg
                style={{ width: 22, height: 22, color: "#fff" }}
                viewBox="0 0 24 24"
              >
                <path
                  fill="currentColor"
                  d="M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2Z"
                />
              </svg>
              <Link className="nav-link" to="/projects">
                <p className="m-0 pop">Projects</p>
              </Link>
            </li>
            <li className="nav-item d-flex align-items-center">
              <svg
                style={{ width: 24, height: 24, color: "#fff" }}
                viewBox="0 0 24 24"
              >
                <path
                  fill="currentColor"
                  d="M19 3H5C3.9 3 3 3.9 3 5V19C3 20.1 3.9 21 5 21H19C20.1 21 21 20.1 21 19V5C21 3.9 20.1 3 19 3M9 17H7V10H9V17M13 17H11V7H13V17M17 17H15V13H17V17Z"
                />
              </svg>
              <Link className="nav-link" to="/overview">
                <p className="m-0 pop">Overview</p>
              </Link>
            </li>
          </ul>
          <button className="btn" onClick={auth.logout}>
            logout
          </button>
        </div>
      </nav>

      <div className="main-content container">
        <Outlet />
      </div>
    </>
  );
}
