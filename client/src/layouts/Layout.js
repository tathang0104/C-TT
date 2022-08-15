import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { Outlet } from "react-router";
import Spinner from "../components/Spinner";

export const Layout = () => {

  const [cln, setCln] = useState("show bg-white position-fixed translate-middle w-100 vh-100 top-50 start-50 d-flex align-items-center justify-content-center")
  

  useEffect(() => {
    const timer = setTimeout(() => {
      setCln("bg-white position-fixed translate-middle w-100 vh-100 top-50 start-50 d-flex align-items-center justify-content-center")
    }, 250)
    return () => {
      clearTimeout(timer)
    };
  }, []);
  return (
    <>
      
        <Spinner cln={cln}/>
          <div className="container-xxl bg-white p-0">
            <Navbar />
            <Outlet />
            <Footer />
          </div>
    </>
  );
};
