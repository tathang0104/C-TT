import React, { Fragment } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import PrivateRoute from "./components/routing/PrivateRoute";

import Home from "./components/pages/Home";
import Login from "./components/pages/Login";
import Register from "./components/pages/Register";
import ForgotPassword from "./components/pages/ForgotPassword";
import ResetPassword from "./components/pages/ResetPassword";
import Dashboard from "./components/pages/Dashboard";

import './index.css';

function App() {
  return (
    <Router>
      <Fragment>
        <div className="app">
          <Routes>
            <Route exact path="/" element={<Home />} />

            <Route
              path="/dashboard"
              element={
                <PrivateRoute>
                  <Dashboard />
                </PrivateRoute>
              }
            />

            {/* authorization */}
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/forgotpassword" element={<ForgotPassword />} />
            <Route
              path="/passwordreset/:resetToken"
              element={<ResetPassword />}
            />
          </Routes>
        </div>
      </Fragment>
    </Router>
  );
}

export default App;
