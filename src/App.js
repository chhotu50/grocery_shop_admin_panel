import React, { Component } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import axios from "axios";
import {helper} from './helper';
import "./scss/style.scss";

const loading = (
  <div className="pt-3 text-center">
    <div className="sk-spinner sk-spinner-pulse"></div>
  </div>
);

// Containers
const TheLayout = React.lazy(() => import("./containers/TheLayout"));

// Pages
const Login = React.lazy(() => import("./views/pages/login/Login"));

axios.defaults.baseURL = helper.BASEURL;
axios.defaults.headers.post['Content-Type'] = 'application/json';

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
