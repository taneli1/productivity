import React from "react";
import {
  AiFillHome,
  AiOutlineAreaChart,
  AiOutlineLogout,
  AiOutlineUser,
} from "react-icons/ai";
import { Link } from "react-router-dom";
import { useAuth } from "../../data/hooks/useAuth";
import { TimeTracker } from "./timeTracker";

interface NavBarProps {}

export const NavBar: React.FunctionComponent<NavBarProps> = () => {
  const auth = useAuth();
  const [expanded, setExpanded] = React.useState(false);

  const toggleNav = () => {
    setExpanded(!expanded);
  };

  return (
    <nav className="navbar navbar-expand-md navbar-dark bg-primary fixed-left align-items-center">
      <p className="navbar-brand text-center header-title text-break">
        <AiOutlineUser className="me-1" size="1.6em" color="white" />
        {auth.user?.data?.username}
      </p>

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

      <div
        className={`pt-3 navbar-collapse collapse ${expanded ? "show" : ""}`}
      >
        <TimeTracker />
        <h1 className="navbar-brand pop pt-5 fw-bold">Navigation</h1>
        <ul className="navbar-nav ps-2">
          <li className="nav-item d-flex align-items-center">
            <AiFillHome size="1.4em" color="white" />
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
            <AiOutlineAreaChart size="1.4em" color="white" />
            <Link className="nav-link" to="/overview">
              <p className="m-0 pop">Overview</p>
            </Link>
          </li>
        </ul>
      </div>
      <button
        className="btn btn-primary pop fw-bold"
        style={{ position: "absolute", bottom: 20, background: "white" }}
        onClick={auth.logout}
      >
        <AiOutlineLogout size="1.4em" color="black" className="me-2" />
        Logout
      </button>
    </nav>
  );
};
