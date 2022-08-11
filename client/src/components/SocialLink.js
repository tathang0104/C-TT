import React from "react";

export default function SocialLink(prop) {
  return (
    <div className="d-flex justify-content-center mt-3">
      <a className="btn btn-square btn-primary mx-1" href={prop.linkFacebook}>
        <i className="fab fa-facebook-f"></i>
      </a>
      <a className="btn btn-square btn-primary mx-1" href={prop.linkTwitter}>
        <i className="fab fa-twitter"></i>
      </a>
      <a className="btn btn-square btn-primary mx-1" href={prop.linkInstagram}>
        <i className="fab fa-instagram"></i>
      </a>
    </div>
  );
}
