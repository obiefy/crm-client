import React, { useState, useEffect } from "react";

import Users from "./components/users/Users";
import AddUser from "./components/users/AddUser";
import User from "./components/users/User";
import EditUser from "./components/users/EditUser";

import Leads from "./components/leads/Leads";
import AddLead from "./components/leads/AddLead";
import Lead from "./components/leads/Lead";
import EditLead from "./components/leads/EditLead";

import Login from "./components/auth/Login";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { Provider } from "react-redux";
import Menu from "./components/Menu";
import store from "./store";
import Feedback from "./components/Feedback";
import { loadUser } from "./store/actions/authActions";
import Profile from "./components/auth/Profile";
import Home from "./components/Home";
function App() {
  useEffect(() => {
    store.dispatch(loadUser());
  }, []);
  return (
    <Provider store={store}>
      <Router>
        <Menu />

        <div className="container">
          <div className="row">
            <div className="col-md-8 offset-md-2">
              <Feedback />
              <Switch>
                <Route path="/users/create">
                  <AddUser />
                </Route>
                <Route path="/users/:id/edit">
                  <EditUser />
                </Route>
                <Route path="/users/:id">
                  <User />
                </Route>
                <Route path="/users">
                  <Users />
                </Route>

                <Route path="/leads/create">
                  <AddLead />
                </Route>
                <Route path="/leads/:id/edit">
                  <EditLead />
                </Route>
                <Route path="/leads/:id">
                  <Lead />
                </Route>
                <Route path="/leads">
                  <Leads />
                </Route>

                <Route path="/login">
                  <Login />
                </Route>
                <Route path="/profile">
                  <Profile />
                </Route>
                <Route path="/">
                  <Home />
                </Route>
                <Route path="*">
                  <h1>404</h1>
                </Route>
              </Switch>
            </div>
          </div>
        </div>
      </Router>
    </Provider>
  );
}

export default App;
