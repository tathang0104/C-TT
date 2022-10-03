import { useContext, useState } from "react";
import CartContext from "../CartContext";


export const OrderedMenu = (props) => {

    // const { orders, setOrders } = useContext(CartContext)

    const { orders, setOrdersContext, handerChangeQuantity, handerDelete } = useContext(CartContext);
    const [quantityOrderedValue, setquantityOrderedValue] = useState(props.quantity_order);
    let newOders

    const increaseOrderedValue = (id) => {
        setquantityOrderedValue(prev => {    
            document.getElementById(`err-${id}`).innerHTML = ``
            newOders = orders.map(order => {
                return order.product_id === id ? {...order, quantity_order : prev + 1 } : order
            })
            setOrdersContext(newOders)
            return prev + 1
        })
    }

    const decreaseOrderedValue = (quantityOrderedValue, id) => {
        setquantityOrderedValue(prev => {
            if (quantityOrderedValue < 2) {
                document.getElementById(`err-${id}`).innerHTML = `Can not decrease quantity ordered`
                newOders = orders.map(order => {
                    return order.product_id === id ? {...order, quantity_order : 1 } : order
                })
                setOrdersContext(newOders)
                return 1
            } else {    
                newOders = orders.map(order => {
                    return order.product_id === id ? {...order, quantity_order : prev - 1 } : order
                })
                setOrdersContext(newOders)
                document.getElementById(`err-${id}`).innerHTML = ``
                return prev - 1
            }
        })
    }


  return (
    <>
        <div className="d-flex align-items-center position-relative" data-id={`detail-menu-${props.product_id}`}>
            <div className="row">
                <div className="col-md-12 d-flex align-items-center position-relative">
                    <img
                        style={{width: '80px', height: '80px'}}
                        className="flex-shrink-0 img-fluid rounded"
                        src={`http://${props.photo_url}`}
                        alt="img_menu"
                    />
                    <div className="w-100 d-flex flex-column text-start ps-3">
                        <h5 className="d-flex justify-content-between border-bottom pb-2">
                        <span className="text-white">{props.name}</span>
                        <span className="text-primary">${props.price}</span>
                        </h5>
                    </div>
                </div>
                <div className="d-flex flex-column text-white">
                    <div className="row">
                        <div className="col-md-6 col-sm-4"></div>
                        <div className='col-md-6 col-sm-8 d-flex justify-content-between align-items-center'>
                            <i className="fa fa-minus-square text-primary cursor-pointer" onClick={()=>decreaseOrderedValue(props.quantity_order, props.product_id)}></i>
                            <input type="text" readOnly={true} className='w-10 text-center' value={quantityOrderedValue} onChange={(e)=>handerChangeQuantity(e)} />
                            <i className="fa fa-plus-square text-primary cursor-pointer" onClick={()=>increaseOrderedValue(props.product_id)}></i>
                            <div className="text-end w-50">
                                <span style={{fontWeight: 'bold'}}>Total: {props.quantity_order * props.price } $</span>
                            </div>
                            <div className="cursor-pointer"><i className="bi bi-x-circle-fill text-primary" onClick={()=> handerDelete(props.product_id)}></i></div>
                        </div>
                        <h6 className="d-flex w-100 err text-danger justify-content-end" id={`err-${props.product_id}`}>{null}</h6>
                    </div>
                </div>
            </div>
        </div>
    </>
  );
};
