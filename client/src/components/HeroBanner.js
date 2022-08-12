import React from "react";
import { Link } from "react-router-dom";
import Button from "./Button";

export default function HeroBanner(prop) {

  return (
    <div className="container my-5 py-5">
      <div className="row align-items-center g-5">
        <div className="col-lg-6 text-center text-lg-start">
          <h1 className="display-3 text-white animated slideInLeft">
            Enjoy Our Delicious Meal
          </h1>
          <p className="text-white animated slideInLeft mb-4 pb-2">
            Tempor erat elitr rebum at clita. Diam dolor diam ipsum sit. Aliqu
            diam amet diam et eos. Clita erat ipsum et lorem et sit, sed stet
            lorem sit clita duo justo magna dolore erat amet
          </p>
          <div className="animated slideInLeft">
            <Link to={"/reservation"} className="py-sm-3 px-sm-5 me-3">
                <Button className="py-3 px-5 mt-2" name="Book A Table"></Button>
            </Link>
          </div>
        </div>
        <div className="col-lg-6 text-center text-lg-end overflow-hidden">
          <img className="img-fluid" src="/img/hero.png" alt="" />
        </div>
      </div>
    </div>
  );
}
