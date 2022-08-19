import { Link } from "react-router-dom";
import useInView from '../hooks/useInView'
import clsx from "clsx"
import CountUp from "../components/CountUp";

export default function About() { 
    const image = useInView()
    const about = useInView()
    const yearOfExperience = 15
    const populerMastersChefs = 50
    
    return (
        <div className="container-xxl py-5">
            <div className="container">
                <div className="row g-5 align-items-center">
                    <div ref={image.ref} className="col-lg-6">
                        <div className="row g-3">
                            <div className="col-6 text-start">
                                <img className={clsx("img-fluid rounded w-100", {"animate__animated animate__zoomIn animate__delay-1s": image.isInView})} src="/img/about-1.jpg" alt="about_img"/>
                            </div> 
                            <div className="col-6 text-start">
                                <img className={clsx("img-fluid rounded w-75", {"animate__animated animate__zoomIn animate__delay-2s": image.isInView})} src="/img/about-2.jpg" alt="about_img" style={{ marginTop: "25%"}}/>
                            </div>
                            <div className="col-6 text-end">
                                <img className={clsx("img-fluid rounded w-75", {"animate__animated animate__zoomIn animate__delay-3s": image.isInView})} src="/img/about-3.jpg" alt="about_img"/>
                            </div>
                            <div className="col-6 text-end">
                                <img className={clsx("img-fluid rounded w-100", {"animate__animated animate__zoomIn animate__delay-4s": image.isInView})} src="/img/about-4.jpg" alt="about_img"/>
                            </div>
                        </div>
                    </div>
                    <div ref={about.ref} className="col-lg-6">
                        <h5 className="section-title ff-secondary text-start text-primary fw-normal">About Us</h5>
                        <h1 className="mb-4">Welcome to <i className="fa fa-utensils text-primary me-2"></i>Restoran</h1>
                        <p className="mb-4">Tempor erat elitr rebum at clita. Diam dolor diam ipsum sit. Aliqu diam amet diam et eos erat ipsum et lorem et sit, sed stet lorem sit.</p>
                        <p className="mb-4">Tempor erat elitr rebum at clita. Diam dolor diam ipsum sit. Aliqu diam amet diam et eos. Clita erat ipsum et lorem et sit, sed stet lorem sit clita duo justo magna dolore erat amet</p>
                        {
                            about.isInView &&
                            <div className="row g-4 mb-4">
                                <div className="col-sm-6">
                                    <div className="d-flex align-items-center border-start border-5 border-primary px-3">
                                        <h1 className="flex-shrink-0 display-5 text-primary mb-0">
                                            <CountUp end={yearOfExperience} />
                                        </h1>
                                        <div className="ps-4">
                                            <p className="mb-0">Years of</p>
                                            <h6 className="text-uppercase mb-0">Experience</h6>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-sm-6">
                                    <div className="d-flex align-items-center border-start border-5 border-primary px-3">
                                        <h1 className="flex-shrink-0 display-5 text-primary mb-0">
                                            <CountUp end={populerMastersChefs} />
                                        </h1>
                                        <div className="ps-4">
                                            <p className="mb-0">Popular</p>
                                            <h6 className="text-uppercase mb-0">Master Chefs</h6>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        }
                        <Link className="btn btn-primary py-3 px-5 mt-2" to="/about">Read More</Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

