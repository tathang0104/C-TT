import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { Outlet, useLocation } from "react-router";
import Spinner from "../components/Spinner";
import BackToTop from "../components/BackToTop";
import HeroBanner from "../components/HeroBanner";
import Banner from "../components/Banner";

export const Layout = () => {

  const [loading, setLoading] = useState(false)

  useEffect(() => {

    const timer = setTimeout(() => {
      setLoading(prev => !prev)
    }, 250)

    return () => {
      clearTimeout(timer)
    };
  }, []);

  let location = useLocation()
  const pathName = location.pathname
  const pathNameSlice = pathName.slice(1)

  const cln = !loading ? "show bg-white position-fixed translate-middle w-100 vh-100 top-50 start-50 d-flex align-items-center justify-content-center" 
                      : "bg-white position-fixed translate-middle w-100 vh-100 top-50 start-50 d-flex align-items-center justify-content-center"
  return (
    <>
        <Spinner cln={cln}/>
        <div className="container-xxl bg-white p-0">
          <Navbar>
            <div className="container-xxl py-5 bg-dark hero-header mb-5">
              { pathName === "/" ?
                <HeroBanner /> :
                <Banner name={pathNameSlice}/>
              }
            </div>
          </Navbar>
          <Outlet />
        </div>
        <BackToTop />
        <Footer />
    </>
  );
};
