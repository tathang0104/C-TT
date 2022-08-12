import React from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { Outlet } from "react-router";
import Spinner from "../components/Spinner";

export const Layout = () => {

  return (
    <>
      <Spinner />
      <div className="container-xxl bg-white p-0">
        <Navbar />
        <Outlet />
        <Footer />
      </div>
    </>
  );
};
