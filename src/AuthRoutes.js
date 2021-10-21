import React from "react";
import { Route, Redirect, withRouter } from "react-router-dom";

const AuthRoutes = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={(props) =>
      localStorage.getItem("user.token") ? (
        <Component {...props} />
      ) : (
        <Redirect to={{ pathname: "/login" }} />
      )
    }
  />
);

export default withRouter(AuthRoutes);
