import { useContext, useState } from "react";
import CartContext from "../CartContext";


export const OrderedMenu = (props) => {

    // const { orders, setOrders } = useContext(CartContext)

    const { orders, setOrdersContext, handerChangeQuantity, handerDelete } = useContext(CartContext);
    const [quantityOrderedValue, setquantityOrderedValue] = useState(props.quantityOrdered);
    let newOders

    const increaseOrderedValue = (quantityOrderedValue, id) => {
        setquantityOrderedValue(prev => {
            if (prev < quantityOrderedValue) {
                document.getElementById(`err-${id}`).innerHTML = ``
                newOders = orders.map(order => {
                    return order.menu_detail_id === id ? {...order, quantityOrdered : prev + 1 } : order
                })
                setOrdersContext(newOders)
                return prev + 1
            } else {
                newOders = orders.map(order => {
                    return order.menu_detail_id === id ? {...order, quantityOrdered : quantityOrderedValue } : order
                })
                setOrdersContext(newOders)
                document.getElementById(`err-${id}`).innerHTML = `Can not increase quantity ordered`
                return quantityOrderedValue
            }
        })
    }

    const decreaseOrderedValue = (quantityOrderedValue, id) => {
        setquantityOrderedValue(prev => {
            if (quantityOrderedValue < 2) {
                // document.getElementById(`err-${id}`).innerHTML = `Can not decrease quantity ordered`
                newOders = orders.map(order => {
                    return order.menu_detail_id === id ? {...order, quantityOrdered : 1 } : order
                })
                setOrdersContext(newOders)
                return 1
            } else {    
                newOders = orders.map(order => {
                    return order.menu_detail_id === id ? {...order, quantityOrdered : prev - 1 } : order
                })
                setOrdersContext(newOders)
                document.getElementById(`err-${id}`).innerHTML = ``
                return prev - 1
            }
        })
    }


  return (
    <>
        <div className="d-flex align-items-center position-relative" data-id={`detail-menu-${props.menu_detail_id}`}>
            <div className="row">
                <div className="col-md-12 d-flex align-items-center position-relative">
                    <img
                        className="flex-shrink-0 img-fluid rounded"
                        src={`/img/${props.photo}`}
                        alt="img_menu"
                    />
                    <div className="w-100 d-flex flex-column text-start ps-3">
                        <h5 className="d-flex justify-content-between border-bottom pb-2">
                        <span className="text-white">{props.name}</span>
                        <span className="text-primary">${props.price}</span>
                        </h5>
                    </div>
                </div>
                <div className="d-flex flex-column">
                    <div className='d-flex justify-content-between align-items-center text-white'>
                        <div>{props.quantity} {props.quantity > 1 ? "products" : "product"} are available</div>
                        <i className="fa fa-minus-square text-primary" onClick={()=>decreaseOrderedValue(quantityOrderedValue, props.menu_detail_id)}></i>
                        <input type="text" readOnly={true} className='w-10 text-center' value={quantityOrderedValue} onChange={(e)=>handerChangeQuantity(e)} />
                        <i className="fa fa-plus-square text-primary" onClick={()=>increaseOrderedValue(props.quantity, props.menu_detail_id)}></i>
                        <div className="text-end w-25">
                            <span className=''>Total: </span>
                            <span className="w-15 text-end">{props.quantityOrdered * props.price } $</span>
                        </div>
                        <div><i className="bi bi-x-circle-fill text-primary" onClick={()=> handerDelete(props.menu_detail_id)}></i></div>
                    </div>
                    <h6 className="d-flex w-100 err text-danger justify-content-end" id={`err-${props.menu_detail_id}`}>{null}</h6>
                </div>
            </div>

        </div>
    </>
  );
};
