import React from "react";
import { Link } from "react-router-dom";
import Button from "./Button";

export default function HeroBanner() {

  return (
    <div className="container my-5 py-5">
      <div className="row align-items-center g-5">
        <div className="col-lg-6 text-center text-lg-start">
          <h1 className="display-3 text-white animate__animated animate__slideInLeft">
            Enjoy Our <br/> Delicious Meal
          </h1>
          <p className="text-white animate__animated animate__slideInLeft mb-4 pb-2">
            Tempor erat elitr rebum at clita. Diam dolor diam ipsum sit. Aliqu
            diam amet diam et eos. Clita erat ipsum et lorem et sit, sed stet
            lorem sit clita duo justo magna dolore erat amet
          </p>
          <div className="mt-2 me-3 animate__animated animate__slideInLeft">
            <Link to={"/reservation"}>
                <Button><span className="d-block py-2 px-4 py-sm-2 px-sm-4">Book A Table</span></Button>
            </Link>
          </div>
        </div>
        <div className="col-lg-6 text-center text-lg-end overflow-hidden animate__animated animate__zoomIn">
          <img className="img-fluid" src="/img/hero.png" alt="" />
        </div>
      </div>
    </div>
  );
}
