import React from "react"
import { Route, Redirect } from "react-router-dom";
import { ApplicationViews } from "./ApplicationViews";
import { Login } from "./auth/Login";
import { Register } from "./auth/Register";

export const Gourdgeous = () => (
    <>
    <Route
      render={() => {
        if (localStorage.getItem("gourdgeous_user")) {
          return (
            <>
              <ApplicationViews />
            </>
          );
        } else {
          return <Redirect to="/login" />;
        }
      }}
    />

    <Route exact path="/login">
      <Login />
    </Route>
    <Route exact path="/register">
      <Register />
    </Route>
  </>
);