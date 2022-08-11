import React, { Fragment } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import PrivateRoute from "./components/routing/PrivateRoute";

import Home from "./components/pages/Home";
import Login from "./components/pages/Login";
import Register from "./components/pages/Register";
import ForgotPassword from "./components/pages/ForgotPassword";
import ResetPassword from "./components/pages/ResetPassword";
import Dashboard from "./components/pages/Dashboard";
import About from "./components/pages/About";
import Service from "./components/pages/Service";
import Menu from "./components/pages/Menu";
import Reservation from "./components/pages/Reservation";
import TeamMember from "./components/pages/TeamMember";
import GlobleStyle from "./GlobalStyle";

import "./index.css";
import Testimonial from "./components/pages/Testimonial";
import Footer from "./components/pages/Footer";
import Contact from "./components/pages/Contact";
import Navbar from "./components/Navbar";

function App() {
  return (
    <GlobleStyle>
      <Router>
        <Fragment>
          <div className="app">
            <Routes>
              <Route exact path="/" element={<Home />} />
              <Route exact path="/about" element={<About />} />
              <Route exact path="/contact" element={<Contact />} />
              <Route exact path="/service" element={<Service />} />
              <Route exact path="/menu" element={<Menu />} />
              <Route exact path="/reservation" element={<Reservation />} />
              <Route exact path="/team" element={<TeamMember />} />
              <Route exact path="/testimonial" element={<Testimonial />} />
              <Route exact path="/footer" element={<Footer />} />
              <Route exact path="/navbar" element={<Navbar />} />
              {/* <Route exact path="/header" element={<Header />} /> */}

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
    </GlobleStyle>
  );
}

export default App;
