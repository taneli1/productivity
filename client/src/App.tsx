import React from "react";
import { Outlet } from "react-router-dom";
import "./App.css";
import { NavBar } from "./interface/components/navbar";

export default function App() {
  return (
    <>
      <NavBar />
      <div className="main-content container">
        <Outlet />
      </div>
    </>
  );
}
