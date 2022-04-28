import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import App from "../../App";
import { AuthProvider } from "../../data/context/authProvider";
import { TrackerProvider } from "../../data/context/trackerProvider";
import { RequireAuth } from "../components/requireAuth";
import { Home } from "../pages/home";
import Login from "../pages/login";
import { Overview } from "../pages/overview";
import { Project } from "../pages/project";
import { Projects } from "../pages/projects";

const wrapAuth = (children: JSX.Element) => {
  return <RequireAuth>{children}</RequireAuth>;
};

export const Router = () => {
  return (
    <AuthProvider>
      <TrackerProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/" element={wrapAuth(<App />)}>
              <Route path="home" element={wrapAuth(<Home />)} />
              <Route path="overview" element={wrapAuth(<Overview />)} />
              <Route path="projects">
                <Route index element={wrapAuth(<Projects />)} />
                <Route path=":projectId" element={wrapAuth(<Project />)} />
              </Route>

              <Route
                path="*"
                element={
                  <main style={{ padding: "1rem" }}>
                    <p>There's nothing here!</p>
                  </main>
                }
              />
            </Route>
          </Routes>
        </BrowserRouter>
      </TrackerProvider>
    </AuthProvider>
  );
};
