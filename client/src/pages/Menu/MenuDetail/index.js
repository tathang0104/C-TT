import { useContext} from "react";
import CartContext from "../../../CartContext";

export const MenuDetail = (props) => {

  const { addToCard } = useContext(CartContext)

  return (
    <>
      <div className="col-lg-6" onClick={()=> addToCard(props.id)} >
        <div className="d-flex align-items-center detail-menu position-relative" id={`detail-menu-${props.id}`}>
          <div className="d-flex align-items-center justify-content-center position-absolute">
            <i className="fa fa-plus-circle fa-2x"></i>
          </div>
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
