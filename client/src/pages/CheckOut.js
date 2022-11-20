
import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom"
import paypal from 'paypal-checkout';
import { useNavigate, useParams } from "react-router-dom";
import { fetchOneOrder, paymentSuccess } from "../api"

const ReactButton = paypal.Button.driver('react', { React, ReactDOM });

export const CheckOut = () => {
    const {id} = useParams()
    const navigate = useNavigate();
    const [data, setData] = useState({})
    const [totalPrice, setTotalPrice] = useState();

    useEffect(()=>{
        fetchOneOrder(id).then(data => {
            const order = data.data.data[0]
            setData(order)
        }).catch((err) =>{
            console.log(err)
        })
    },[])

    useEffect(() =>{
        let sum = 0
        if (data) {
          for (let i = 0; i < data?.detail_order?.length; i++) {
            sum = sum + data?.detail_order[i].quantity_order * data?.detail_order[i].product_id.price
          }
          setTotalPrice(sum)
        }
    },[data])

    const items = data?.detail_order?.map((item)=>{
        return {
            name: item.product_id.name,
            sku: item.product_id._id,
            price: `${item.product_id.price}`,
            currency: "USD",
            quantity: item.quantity_order
        }
    })

    const opts = {
        env: 'sandbox',
        client: {
          sandbox: "ATIfXKaRcICmD6EF-S18-BTFbZs-NHusyQ9r_YN6IeqVM4fA6nKwFj8xQOD4ZF4y4s76_pqUZbyI83Q9",
        //   production: client_id,
        },
        commit: true, // Show a 'Pay Now' button
        payment: function createPayment() {
            // eslint-disable-next-line react/prop-types
            const paymentId = paypal.rest.payment.create(this.props.env, this.props.client, {
                transactions: [{
                item_list: {
                    items
                },
                amount: {
                    currency: 'USD',
                    total: totalPrice
                },
                description: 'Purchase the listed reviews.',
                }],
            });
    
            paymentId.then((res) => {
                console.log(res)
            }).catch((err) => {
                console.log(err)
            });
    
            return paymentId;
        },
        onAuthorize: (data, actions) => actions.payment.execute().then((payment) => {
            console.log(payment)
            paymentSuccess(id).then((data) =>{
                
            }).catch((err)=>{
                console.log(err)
            })
            window.alert(`Thank ${payment.payer.payer_info.last_name} for checkout ${payment.id} succsesed`)
        }).catch((err) => {
            console.log(err)
        }),
    };

    return (
        <>
            {/* <h1 className="text-primary">Check out order {data?._id?.slice(17)}</h1> */}
            <h1 className="text-primary">Check out order {id}</h1>
            <div className="mt-4">
                {data?.detail_order?.map((item) => {
                    return (
                    <div className="col-md-7" key={item._id}>
                        <div
                        className="d-flex align-items-center position-relative"
                        data-id={`detail-menu-${item.product_id._id}`}
                        >
                        <div className="row">
                            <div className="col-md-12 d-flex align-items-center position-relative">
                            <img
                                style={{ width: "80px", height: "80px" }}
                                className="flex-shrink-0 img-fluid rounded"
                                src={`http://${item.product_id.photo_url}`}
                                alt="img_menu"
                            />
                            <div className="w-100 d-flex flex-column text-start ps-3">
                                <h5 className="d-flex justify-content-between border-bottom pb-2">
                                <span className="text-primary">
                                    {item.product_id.name}
                                </span>
                                <span className="text-primary">
                                    ${item.product_id.price}
                                </span>
                                </h5>
                                <span>{item.product_id.category}</span>
                            </div>
                            </div>
                            <div className="d-flex flex-column">
                            <div className="row">
                                <div className="col-md-6 col-sm-4"></div>
                                <div className="col-md-6 col-sm-8 d-flex justify-content-between align-items-center">
                                <i
                                    className="fa fa-minus-square text-primary cursor-pointer"
                                    onClick={()=>window.alert("Can not decrease quantity ordered")}
                                ></i>
                                <input
                                    type="text"
                                    readOnly={true}
                                    className="w-20 text-center"
                                    value={item.quantity_order}
                                />
                                <i
                                    className="fa fa-plus-square text-primary cursor-pointer"
                                    onClick={()=>window.alert("Can not increase quantity ordered")}
                                ></i>
                                <div className="text-end w-50">
                                    <span style={{ fontWeight: "bold" }}>
                                    Total:{" "}
                                    {item.quantity_order * item.product_id.price}{" "}
                                    $
                                    </span>
                                </div>
                                </div>
                                <h6
                                className="d-flex w-100 err text-danger justify-content-end"
                                id={`err-${item.product_id._id}`}
                                >
                                {null}
                                </h6>
                            </div>
                            </div>
                        </div>
                        </div>
                    </div>
                    );
                })}
            </div>
            <h6 className="col-12 mt-3" style={{fontWeight: 600}}>Oder time: {data?.order_time}</h6>
            <h6 className="col-12" style={{fontWeight: 600}}>Special request: {data?.special_request}</h6>
            <h4 className="col-12">Total price: {totalPrice} $</h4>
            <div className="mt-3">
                <ReactButton
                    env={opts.env}
                    client={opts.client}
                    payment={opts.payment}
                    commit={opts.commit}
                    onAuthorize={opts.onAuthorize}
                />
            </div>
        </>
    );
}

