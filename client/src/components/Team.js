import React from "react";
import SocialLink from "./SocialLink"

export default function Team(prop) {
  return (
    <div className="col-lg-3 col-md-6 wow fadeInUp" data-wow-delay="0.1s">
      <div className="team-item text-center rounded overflow-hidden">
        <div className="rounded-circle overflow-hidden m-4">
          <img className="img-fluid" src={prop.imgUrl} alt="" />
        </div>
        <h5 className="mb-0">{prop.fullName}</h5>
        <small>{prop.designation}</small>
        <SocialLink />
      </div>
    </div>
  );
}
