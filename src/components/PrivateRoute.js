import React from "react";
import { Redirect, Route } from "react-router-dom";

const PrivateRoute = ({ component: Component, ...rest }) => {
  return !localStorage.getItem("token") ? (
    <Route {...rest} component={Component} />
  ) : (
    <Redirect to="/Auth" />
  );
};

export default PrivateRoute;
