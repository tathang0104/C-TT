import React from "react";
import SocialLink from "./SocialLink"
import clsx from "clsx";
import useInView from "../hooks/useInView";

export default function Team(prop) {
  const team = useInView()

  return (
    <div ref={team.ref} className={clsx("col-lg-3 col-md-6", {"animate__animated animate__fadeInUp" : team.isInView})}>
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
