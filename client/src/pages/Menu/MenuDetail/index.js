import { useContext} from "react";
import CartContext from "../../../CartContext";

export const MenuDetail = (props) => {

  const { addToCard } = useContext(CartContext)

  return (
    <>
      <div className="col-lg-6 cursor-pointer" onClick={()=> addToCard(props._id)} >
        <div className="d-flex align-items-center detail-menu position-relative" id={`detail-menu-${props._id}`}>
          <div className="d-flex align-items-center justify-content-center position-absolute">
            <i className="fa fa-plus-circle fa-2x"></i>
          </div>
          <img
            style={{width: "80px", height: "80px"}}
            className="flex-shrink-0 img-fluid rounded"
            src={`http://${props.photo_url}`}
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
