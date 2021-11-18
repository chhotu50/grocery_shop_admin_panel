import React from "react";
import { Route, Redirect, withRouter } from "react-router-dom";

const role = localStorage.getItem("user.role");

const AuthRoutes = ({ component: Component, ...rest }) => (
    <Route
        {...rest}
        render={(props) =>
            localStorage.getItem("user.token") && role === 1 ? (
                <Component {...props} />
            ) : (
                <Redirect to={{ pathname: "/login" }} />
            )
        }
    />
);

export default withRouter(AuthRoutes);
