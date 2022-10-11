
import ManageNavbar from "./ManageNavbar";
import Footer from "./Footer";
import { Outlet, useNavigate } from "react-router";
import BackToTop from "../components/BackToTop";
import RightSideBar from "./RightSideBar";
import { useEffect } from "react";

export const ManageLayout = () => {

  const navigate = useNavigate()

  useEffect(() => {
    if(!localStorage.getItem("authToken")) {
      navigate("/login")
    }
  }, [navigate]);

return (
    <>
        <div className="bg-dark sticky-top shadow-sm" style={{ height: "90px" }}>
          <ManageNavbar />
        </div>
        <div style={{height: "auto", backgroundColor: "white"}}>

        <div className="container-xxl bg-white p-0">
          {
            localStorage.getItem("userLoginedRole") === "ADMIN" ? <RightSideBar /> : null
          }
          
          <div className="bg-white p-4" style={{borderLeft: '2px solid black', marginLeft: '300px', minHeight: '500px'}}>
            <Outlet />
          </div>
        </div>
        </div>
        <BackToTop />
        <Footer />
    </>
  );
};
