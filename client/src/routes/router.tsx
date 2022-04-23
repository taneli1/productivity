import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import App from "../App";
import { RequireAuth } from "../components/requireAuth";
import { AuthProvider } from "../context/authProvider";
import Expenses from "../pages/expenses";
import { Home } from "../pages/home";
import Invoice from "../pages/invoice";
import Invoices from "../pages/invoices";
import Login from "../pages/login";
import { Overview } from "../pages/overview";
import { Projects } from "../pages/projects";
import Register from "../pages/register";

const wrapAuth = (children: JSX.Element) => {
  return <RequireAuth>{children}</RequireAuth>;
};

export const Router = () => {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/" element={wrapAuth(<App />)}>
            <Route path="home" element={wrapAuth(<Home />)} />
            <Route path="overview" element={wrapAuth(<Overview />)} />
            <Route path="projects" element={wrapAuth(<Projects />)} />
            <Route path="expenses" element={wrapAuth(<Expenses />)} />
            <Route path="invoices" element={wrapAuth(<Invoices />)}>
              <Route
                index
                element={
                  <main style={{ padding: "1rem" }}>
                    <p>Select an invoice</p>
                  </main>
                }
              />
              <Route path=":invoiceId" element={<Invoice />} />
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
    </AuthProvider>
  );
};
