import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import App from "../../App";
import { ContextWrapper } from "../../data/context/contextWrapper";
import { RequireAuth } from "../components/requireAuth";
import { Home } from "../pages/home";
import Login from "../pages/login";
import { Overview } from "../pages/overview";
import { Project } from "../pages/project";
import { Projects } from "../pages/projects";
import { TaskArchive } from "../pages/taskArchive";

const wrapAuth = (children: JSX.Element) => {
  return <RequireAuth>{children}</RequireAuth>;
};

export const Router = () => {
  return (
    <ContextWrapper>
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
            <Route path="tasks" element={wrapAuth(<TaskArchive />)}>
              <Route path=":projectId" element={wrapAuth(<TaskArchive />)} />
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
    </ContextWrapper>
  );
};
