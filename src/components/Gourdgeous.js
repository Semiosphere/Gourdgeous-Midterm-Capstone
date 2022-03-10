import React from "react"
import { Route, Redirect } from "react-router-dom";
import { NavBar } from "./nav/NavBar"
import { ApplicationViews } from "./ApplicationViews";
import { Login } from "./auth/Login";
import { Register } from "./auth/Register";

export const Gourdgeous = () => (
    <>
    <Route
      render={() => {
        if (localStorage.getItem("gourdgeous_customer")) {
          return (
            <>
              <NavBar />
              <ApplicationViews />
            </>
          );
        } else {
          return <Redirect to="/login" />;
        }
      }}
    />

    <Route path="/login">
      <Login />
    </Route>
    <Route path="/register">
      <Register />
    </Route>
  </>
);