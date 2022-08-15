import React from 'react'
import useInView from '../hooks/useInView'
import clsx from "clsx"

export default function TeamMember() {
    const title = useInView()

  return (
    <div className="container-xxl pt-5 pb-3">
    <div className="container">
        <div ref={title.ref} className={clsx("text-center", {"animate__animated animate__fadeInUp": title.isInView})}>
            <h5 className="section-title ff-secondary text-center text-primary fw-normal">Team Members</h5>
            <h1 className="mb-5">Our Master Chefs</h1>
        </div>
        <div className="row g-4">
            <div ref={title.ref} className={clsx("col-lg-3 col-md-6", {"animate__animated animate__fadeInUp animate__delay-1s": title.isInView})}>
                <div className="team-item text-center rounded overflow-hidden">
                    <div className="rounded-circle overflow-hidden m-4">
                        <img className="img-fluid" src="img/team-1.jpg" alt="" />
                    </div>
                    <h5 className="mb-0">Full Name</h5>
                    <small>Designation</small>
                    <div className="d-flex justify-content-center mt-3">
                        <a className="btn btn-square btn-primary mx-1" href="facebook"><i className="fab fa-facebook-f"></i></a>
                        <a className="btn btn-square btn-primary mx-1" href="twitter"><i className="fab fa-twitter"></i></a>
                        <a className="btn btn-square btn-primary mx-1" href="instagram"><i className="fab fa-instagram"></i></a>
                    </div>
                </div>
            </div>
            <div ref={title.ref} className={clsx("col-lg-3 col-md-6", {"animate__animated animate__fadeInUp animate__delay-2s": title.isInView})}>
                <div className="team-item text-center rounded overflow-hidden">
                    <div className="rounded-circle overflow-hidden m-4">
                        <img className="img-fluid" src="img/team-2.jpg" alt="" />
                    </div>
                    <h5 className="mb-0">Full Name</h5>
                    <small>Designation</small>
                    <div className="d-flex justify-content-center mt-3">
                        <a className="btn btn-square btn-primary mx-1" href="facebook"><i className="fab fa-facebook-f"></i></a>
                        <a className="btn btn-square btn-primary mx-1" href="twitter"><i className="fab fa-twitter"></i></a>
                        <a className="btn btn-square btn-primary mx-ins1" href="instagram"><i className="fab fa-instagram"></i></a>
                    </div>
                </div>
            </div>
            <div ref={title.ref} className={clsx("col-lg-3 col-md-6", {"animate__animated animate__fadeInUp animate__delay-3s": title.isInView})}>
                <div className="team-item text-center rounded overflow-hidden">
                    <div className="rounded-circle overflow-hidden m-4">
                        <img className="img-fluid" src="img/team-3.jpg" alt="" />
                    </div>
                    <h5 className="mb-0">Full Name</h5>
                    <small>Designation</small>
                    <div className="d-flex justify-content-center mt-3">
                        <a className="btn btn-square btn-primary mx-1" href="facebook"><i className="fab fa-facebook-f"></i></a>
                        <a className="btn btn-square btn-primary mx-1" href="twitter"><i className="fab fa-twitter"></i></a>
                        <a className="btn btn-square btn-primary mx-ins1" href="instagram"><i className="fab fa-instagram"></i></a>
                    </div>
                </div>
            </div>
            <div ref={title.ref} className={clsx("col-lg-3 col-md-6", {"animate__animated animate__fadeInUp animate__delay-4s": title.isInView})}>
                <div className="team-item text-center rounded overflow-hidden">
                    <div className="rounded-circle overflow-hidden m-4">
                        <img className="img-fluid" src="img/team-4.jpg" alt="" />
                    </div>
                    <h5 className="mb-0">Full Name</h5>
                    <small>Designation</small>
                    <div className="d-flex justify-content-center mt-3">
                        <a className="btn btn-square btn-primary mx-1" href="facebook"><i className="fab fa-facebook-f"></i></a>
                        <a className="btn btn-square btn-primary mx-1" href="twitter"><i className="fab fa-twitter"></i></a>
                        <a className="btn btn-square btn-primary mx-ins1" href="instagram"><i className="fab fa-instagram"></i></a>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
  )
}
