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
        <p className="navbar-brand ps-2">USERNAME</p>

        <button
          className="navbar-toggler collapsed show"
          type="button"
          data-toggle="collapse"
          data-target="#navbarsExampleDefault"
          aria-controls="navbarsExampleDefault"
          aria-expanded="false"
          aria-label="Toggle navigation"
          onClick={toggleNav}
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className={`navbar-collapse collapse ${expanded ? "show" : ""}`}>
          <div
            style={{
              padding: 16,
              width: "100%",
              height: 50,
              background: "#000",
            }}
          ></div>
          <h1 className="navbar-brand">Navigation</h1>
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link className="nav-link" to="/home">
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/projects">
                Projects
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/overview">
                Overview
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
