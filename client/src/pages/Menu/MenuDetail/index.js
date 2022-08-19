import React from "react";

export const MenuDetail = (props) => {
  return (
    <>
      <div className="col-lg-6" id={`detail-menu-${props.id}`} onClick={props.addToCard}>
        <div className="d-flex align-items-center">
          <img
            className="flex-shrink-0 img-fluid rounded"
            src={`/img/${props.photo}`}
            alt="img_menu"
          />
          <div className="w-100 d-flex flex-column text-start ps-4">
            <h5 className="d-flex justify-content-between border-bottom pb-2">
              <span>{props.name}</span>
              <span className="text-primary">${props.price}</span>
            </h5>
            <small className="fst-italic">
              {props.description}
            </small>
          </div>
        </div>
      </div>
    </>
  );
};
