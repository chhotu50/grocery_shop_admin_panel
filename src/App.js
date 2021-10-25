import React, { Component } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import axios from "axios";
import { helper } from "./helper";
import "./scss/style.scss";

const loading = (
    <div className="pt-3 text-center">
        <div className="sk-spinner sk-spinner-pulse"></div>
    </div>
);
const TheLayout = React.lazy(() => import("./containers/TheLayout"));
// Pages
const Login = React.lazy(() => import("./views/pages/login/Login"));
const Register = React.lazy(() => import("./views/pages/register/Register"));

axios.defaults.baseURL = helper.BASEURL + "api/";
axios.defaults.headers.post["Content-Type"] = "application/json";

class App extends Component {
    componentDidMount() {
        localStorage.getItem("user.token");
    }
    render() {
        const token = localStorage.getItem("user.token");
        return (
            <BrowserRouter>
                <React.Suspense fallback={loading}>
                    <Switch>
                        <Route
                            exact
                            path="/login"
                            name="Login Page"
                            render={(props) => <Login {...props} />}
                        />
                        <Route
                            exact
                            path="/register"
                            name="Register Page"
                            render={(props) => <Register {...props} />}
                        />

                        <Route
                            path="/"
                            name="Home"
                            render={
                                token
                                    ? (props) => <TheLayout {...props} />
                                    : (props) => <Login {...props} />
                            }
                        />
                    </Switch>
                </React.Suspense>
            </BrowserRouter>
        );
    }
}

export default App;
