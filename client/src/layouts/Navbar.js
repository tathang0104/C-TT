import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import Banner from '../components/Banner'
import Button from '../components/Button'
import HeroBanner from '../components/HeroBanner'


export default function Navbar() {
    let location = useLocation()
    const pathName = location.pathname
  return (
    <div className="container-xxl position-relative p-0">
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark px-4 px-lg-5 py-3 py-lg-0">
                <Link to={"/"} className="navbar-brand p-0">
                    <h1 className="text-primary m-0"><i className="fa fa-utensils me-3"></i>Restoran</h1>
                </Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarCollapse">
                    <span className="fa fa-bars"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarCollapse">
                    <div className="navbar-nav ms-auto py-0 pe-4">
                        <Link to={"/"} className="nav-item nav-link active">Home</Link>
                        <Link to={"/about"} className="nav-item nav-link">About</Link>
                        <Link to={"/service"} className="nav-item nav-link">Service</Link>
                        <Link to={"/menu"} className="nav-item nav-link">Menu</Link>
                        <div className="nav-item dropdown">
                            <Link to={""} className="nav-link dropdown-toggle" data-bs-toggle="dropdown">Pages</Link>
                            <div className="dropdown-menu m-0">
                                <Link to={"/reservation"} className="dropdown-item">Booking</Link>
                                <Link to={"/team"} className="dropdown-item">Our Team</Link>
                                <Link to={"/testimonial"} className="dropdown-item">Testimonial</Link>
                            </div>
                        </div>
                        <Link to={"/contact"} className="nav-item nav-link">Contact</Link>
                    </div>
                    <div className="px-2 py-4">
                        <Link to={"/reservation"}>
                            <Button name="Book A Table"></Button>
                        </Link>
                    </div>
                </div>
            </nav>
            
            <div className="container-xxl py-5 bg-dark hero-header mb-5">
                { pathName === "/" ?
                    <HeroBanner /> :
                    <Banner name={pathName.slice(1)}/>
                }
            </div>
        </div>
  )
}
