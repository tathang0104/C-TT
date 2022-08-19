import React from "react";
import clsx from "clsx"
import useInView from "../../hooks/useInView";

export default function Contact() {
  const contact = useInView()

  return (
    <div ref={contact.ref} className="container-xxl py-5">
      <div className="container">
        <div className={clsx("text-center", {"animate__animated animate__fadeInUp" : contact.isInView})}>
          <h5 className="section-title ff-secondary text-center text-primary fw-normal">
            Contact Us
          </h5>
          <h1 className="mb-5">Contact For Any Query</h1>
        </div>
        <div className="row g-4">
          <div className="col-12">
            <div className="row gy-4">
              <div className="col-md-4">
                <h5 className="section-title ff-secondary fw-normal text-start text-primary">
                  Booking
                </h5>
                <p>
                  <i className="fa fa-envelope-open text-primary me-2"></i>
                  book@example.com
                </p>
              </div>
              <div className="col-md-4">
                <h5 className="section-title ff-secondary fw-normal text-start text-primary">
                  General
                </h5>
                <p>
                  <i className="fa fa-envelope-open text-primary me-2"></i>
                  info@example.com
                </p>
              </div>
              <div className="col-md-4">
                <h5 className="section-title ff-secondary fw-normal text-start text-primary">
                  Technical
                </h5>
                <p>
                  <i className="fa fa-envelope-open text-primary me-2"></i>
                  tech@example.com
                </p>
              </div>
            </div>
          </div>
          <div className={clsx("col-md-6", {"animate__animated animate__fadeIn animate__delay-3s" : contact.isInView})}>
            <iframe
              title="map"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1862.4099688329347!2d105.83418895807448!3d20.999853796503523!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3135add060df17f3%3A0xa487860b389b610!2sHH2%20MecoComplex!5e0!3m2!1svi!2s!4v1660294153413!5m2!1svi!2s"
              style={{width: "100%", height: "100%", border: "0"}}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
          <div className="col-md-6">
            <div className={clsx("", {"animate__animated animate__fadeInUp animate__delay-3s" : contact.isInView})}>
              <form>
                <div className="row g-3">
                  <div className="col-md-6">
                    <div className="form-floating">
                      <input
                        type="text"
                        className="form-control"
                        id="name"
                        placeholder="Your Name"
                      />
                      <label htmlFor="name">Your Name</label>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-floating">
                      <input
                        type="email"
                        className="form-control"
                        id="email"
                        placeholder="Your Email"
                      />
                      <label htmlFor="email">Your Email</label>
                    </div>
                  </div>
                  <div className="col-12">
                    <div className="form-floating">
                      <input
                        type="text"
                        className="form-control"
                        id="subject"
                        placeholder="Subject"
                      />
                      <label htmlFor="subject">Subject</label>
                    </div>
                  </div>
                  <div className="col-12">
                    <div className="form-floating">
                      <textarea
                        className="form-control"
                        placeholder="Leave a message here"
                        id="message"
                        style={{ minHeight: "150px" }}
                      ></textarea>
                      <label htmlFor="message">Message</label>
                    </div>
                  </div>
                  <div className="col-12">
                    <button
                      className="btn btn-primary w-100 py-3"
                      type="submit"
                    >
                      Send Message
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
