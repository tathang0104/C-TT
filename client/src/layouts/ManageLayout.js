import React from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { Outlet } from "react-router";
import BackToTop from "../components/BackToTop";
import RightSideBar from "./RightSideBar";

export const ManageLayout = () => {
return (
    <>
        <div className="bg-dark" style={{ height: '90px'}}>
          <Navbar />
        </div>
        <div className="container-xxl bg-white p-0">
          <RightSideBar />
          <div className="bg-white p-4" style={{borderLeft: '2px solid black', marginLeft: '300px', minHeight: '500px'}}>
            <Outlet />
          </div>
        </div>
        <BackToTop />
        <Footer />
    </>
  );
};
