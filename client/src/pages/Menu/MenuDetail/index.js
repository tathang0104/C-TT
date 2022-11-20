import { useContext, useEffect, useMemo, useState} from "react";
import { getVoteById } from "../../../api";
import CartContext from "../../../CartContext";

export const MenuDetail = (props, {children}) => {

  const { addToCard } = useContext(CartContext)
  let star = []
  const [voteData, setVoteData] = useState({
    avgStar: 0,
    count: 0
  })

  useEffect(()=>{
    if (props._id) {
      getVoteById(props._id).then((data)=>{
        const vote = data.data.vote[0]
        if (vote) {
            setVoteData(vote)
        }
      })
    }

    return () => {
      star = []
  }
  },[props._id])


  for (let i = 1; i < 6; i++) {
    if ( i <= voteData.avgStar) {
        star.push(
            <span className="star voted-star" key={`star-${i}`}></span>
        )
    } else if ( typeof(voteData.avgStar) !== "integer" && i < voteData.avgStar + 1 ) {
        star.push(
            <span className="star half-star" key={`star-${i}`}></span>
        )
    } else {
        star.push(
            <span className="star" key={`star-${i}`}></span>
        )
    } 
  }

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
              <span className="d-flex justify-content-center align-item-center">
                {props.name}
                <span className='px-2'>{star}</span>
                <span style={{fontWeight: "500", fontSize: "14px"}}>({voteData.count})</span>
              </span>
              
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
