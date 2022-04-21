import { Link, Outlet } from "react-router-dom";
import "./App.css";

export default function App() {
  return (
    <>
      <nav className="navbar navbar-expand-md navbar-dark bg-primary fixed-left">
        <p className="navbar-brand ps-2">USERNAME</p>

        <div
          style={{ padding: 16, width: "100%", height: 50, background: "#000" }}
        ></div>

        <button
          className="navbar-toggler collapsed"
          type="button"
          data-toggle="collapse"
          data-target="#navbarsExampleDefault"
          aria-controls="navbarsExampleDefault"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse">
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
        </div>
      </nav>

      <div className="main-content container">
        <Outlet />
      </div>
    </>
  );
}
