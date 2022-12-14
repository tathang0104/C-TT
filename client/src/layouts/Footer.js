import React from 'react'
import { Link } from 'react-router-dom'
import clsx from 'clsx'
import useInView from '../hooks/useInView'

export default function Footer() {
    const footer = useInView()

  return (
    <>
        <div ref={footer.ref} className={clsx("container-fluid bg-dark text-light footer pt-5", {"animate__animated animate__fadeIn": footer.isInView})}>
            <div className="container py-5">
                <div className="row g-5">
                    <div className="col-lg-3 col-md-6">
                        <h4 className="section-title ff-secondary text-start text-primary fw-normal mb-4">Company</h4>
                        <Link className="btn btn-link" to={"/about"}>About Us</Link>
                        <Link className="btn btn-link" to={"/contact"}>Contact Us</Link>
                        <Link className="btn btn-link" to={"/reservation"}>Reservation</Link>
                        <Link className="btn btn-link" to={"/about"}>Privacy Policy</Link>
                        <Link className="btn btn-link" to={"terms"}>Terms & Condition</Link>
                    </div>
                    <div className="col-lg-3 col-md-6">
                        <h4 className="section-title ff-secondary text-start text-primary fw-normal mb-4">Contact</h4>
                        <p className="mb-2"><i className="fa fa-map-marker-alt me-3"></i>102 Trường Chinh</p>
                        <p className="mb-2"><i className="fa fa-phone-alt me-3"></i>+84 388366323</p>
                        <p className="mb-2"><i className="fa fa-envelope me-3"></i>tathang0104@gmail.com</p>
                        <div className="d-flex pt-2">
                            <a className="btn btn-outline-light btn-social" href="twitter"><i className="fab fa-twitter"></i></a>
                            <a className="btn btn-outline-light btn-social" href="facebook"><i className="fab fa-facebook-f"></i></a>
                            <a className="btn btn-outline-light btn-social" href="youtube"><i className="fab fa-youtube"></i></a>
                            <a className="btn btn-outline-light btn-social" href="linkedin"><i className="fab fa-linkedin-in"></i></a>
                        </div>
                    </div>
                    <div className="col-lg-3 col-md-6">
                        <h4 className="section-title ff-secondary text-start text-primary fw-normal mb-4">Opening</h4>
                        <h5 className="text-light fw-normal">Monday - Saturday</h5>
                        <p>09AM - 09PM</p>
                        <h5 className="text-light fw-normal">Sunday</h5>
                        <p>10AM - 08PM</p>
                    </div>
                    <div className="col-lg-3 col-md-6">
                        <h4 className="section-title ff-secondary text-start text-primary fw-normal mb-4">Newsletter</h4>
                        <p>Dolor amet sit justo amet elitr clita ipsum elitr est.</p>
                        <div className="position-relative mx-auto" style={{maxWidth: "400px"}}>
                            <input className="form-control border-primary w-100 py-3 ps-4 pe-5" type="text" placeholder="Your email" />
                            <button type="button" className="btn btn-primary py-2 position-absolute top-0 end-0 mt-2 me-2">SignUp</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </>
  )
}
