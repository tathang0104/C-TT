import React from 'react'
import useInView from '../hooks/useInView'
import clsx from "clsx"

const Service = () => { 
    const title = useInView()
    
    return (
        <div className="container-xxl py-5">
            <div className="container">
                <div className="row g-4">
                    <div ref={title.ref} className={clsx("text-center", {"animate__animated animate__fadeInUp": title.isInView})}>
                        <h5 className="section-title ff-secondary text-center text-primary fw-normal">Our Services</h5>
                        <h1 className="mb-5">Explore Our Services</h1>
                    </div>
                    <div ref={title.ref} className={clsx("col-lg-3 col-sm-6", {"animate__animated animate__fadeInUp animate__delay-1s": title.isInView})}>
                        <div className="service-item rounded pt-3">
                            <div className="p-4">
                                <i className="fa fa-3x fa-user-tie text-primary mb-4"></i>
                                <h5>Master Chefs</h5>
                                <p>Diam elitr kasd sed at elitr sed ipsum justo dolor sed clita amet diam</p>
                            </div>
                        </div>
                    </div>
                    <div ref={title.ref} className={clsx("col-lg-3 col-sm-6", {"animate__animated animate__fadeInUp animate__delay-2s": title.isInView})}>
                        <div className="service-item rounded pt-3">
                            <div className="p-4">
                                <i className="fa fa-3x fa-utensils text-primary mb-4"></i>
                                <h5>Quality Food</h5>
                                <p>Diam elitr kasd sed at elitr sed ipsum justo dolor sed clita amet diam</p>
                            </div>
                        </div>
                    </div>
                    <div ref={title.ref} className={clsx("col-lg-3 col-sm-6", {"animate__animated animate__fadeInUp animate__delay-3s": title.isInView})}>
                        <div className="service-item rounded pt-3">
                            <div className="p-4">
                                <i className="fa fa-3x fa-cart-plus text-primary mb-4"></i>
                                <h5>Online Order</h5>
                                <p>Diam elitr kasd sed at elitr sed ipsum justo dolor sed clita amet diam</p>
                            </div>
                        </div>
                    </div>
                    <div ref={title.ref} className={clsx("col-lg-3 col-sm-6", {"animate__animated animate__fadeInUp animate__delay-4s": title.isInView})}>
                        <div className="service-item rounded pt-3">
                            <div className="p-4">
                                <i className="fa fa-3x fa-headset text-primary mb-4"></i>
                                <h5>24/7 Service</h5>
                                <p>Diam elitr kasd sed at elitr sed ipsum justo dolor sed clita amet diam</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Service;
