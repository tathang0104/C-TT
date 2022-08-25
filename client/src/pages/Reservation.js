import React, { useState } from 'react'
import useInView from '../hooks/useInView'
import clsx from "clsx"
import YouTube from 'react-youtube'
import Modal from '../components/Modal'
import { OrderedMenu } from '../components/OrderedMenu'
import { useContext} from "react";
import CartContext from "../CartContext";

export default function Reservation() {
    const title = useInView()
    const [showModal, setShowModal] = useState(false);
    const handerShow = () => {
        setShowModal(prev => !prev)
    }
    const [orderSuccess, setOrderSuccess] = useState(false);
      
    const { orders } = useContext(CartContext);

    const menuOrdered = orders.map(order => {
        return (
            <OrderedMenu 
                key={order.menu_detail_id}
                menu_detail_id={order.menu_detail_id}
                photo={order.photo}
                name={order.name}
                price={order.price}
                quantity={order.quantity}
                quantityOrdered={order.quantityOrdered}
            />
        )
    })

    let sum = 0

    orders.forEach(order => {
        sum += order.price * order.quantityOrdered
    })
    // const totalPrice = orders.reduce((previousValue, currentValue) => previousValue.price * previousValue.quantityOrdered + currentValue.price * currentValue.quantityOrdered, sum )

    // console.log(sum)
    // const orderSuccessFul

    const handerSubmitFormOrderd = (e, orders) => {
        e.preventDefault()
        if (orders.length === 0) {
            console.log(orders.length)
            document.getElementsByClassName('err')[0].innerHTML = 'Please select a new order in menu'
        } else {
            setOrderSuccess(true)
            console.log(orders)
        }
    }

    return (
    <>
        <div ref={title.ref} className={clsx("container-xxl py-5 px-0", {"animate__animated animate__fadeInUp": title.isInView})}>
            <div className="row g-0">
                <div className="col-md-6">
                    <div className="video">
                        <button type="button" className="btn-play" onClick={handerShow} >
                            <span></span>
                        </button>
                    </div>
                </div>
                <div className="col-md-6 bg-dark d-flex align-items-center">
                    <div ref={title.ref} className={clsx("p-5", {"animate__animated animate__fadeInUp animate__delay-1s": title.isInView})}>
                        <h5 className="section-title ff-secondary text-start text-primary fw-normal">Reservation</h5>
                        <h1 className="text-white mb-4">Book A Table Online</h1>
                        {menuOrdered}
                        <h5 className="text-end text-primary">Total price: {sum} $</h5>
                        <form className='mt-3' onSubmit={(e)=>handerSubmitFormOrderd(e, orders)}>
                            <div className="row g-3">
                                <div className="col-md-6">
                                    <div className="form-floating">
                                        <input type="text" className="form-control" required id="name" placeholder="Your Name" />
                                        <label htmlFor="name">Your Name</label>
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="form-floating">
                                        <input type="email" className="form-control" required id="email" placeholder="Your Email" />
                                        <label htmlFor="email">Your Email</label>
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="form-floating date" id="date3" data-target-input="nearest">
                                        <input type="text" className="form-control datetimepicker-input" required id="datetime" placeholder="Date & Time" data-target="#date3" data-toggle="datetimepicker" />
                                        <label htmlFor="datetime">Date & Time</label> 
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="form-floating">
                                        <select className="form-select" required id="select1">
                                          <option value="1">People 1</option>
                                          <option value="2">People 2</option>
                                          <option value="3">People 3</option>
                                        </select>
                                        <label htmlFor="select1">No Of People</label>
                                      </div>
                                </div>
                                <div className="col-12">
                                    <div className="form-floating">
                                        <textarea className="form-control" placeholder="Special Request" id="message" style={{height: "100px"}}></textarea>
                                        <label htmlFor="message">Special Request</label>
                                    </div>
                                </div>
                                <h6 className="d-flex w-100 err text-danger">{null}</h6>
                                <div className="col-12">
                                    <button className="btn btn-primary w-100 py-3" type="submit">Book Now</button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
        {
            orderSuccess && <Modal isShow={orderSuccess} title="You have successfully ordered your food" handlerShow={setOrderSuccess}></Modal>
        }

        {
            showModal &&
            <Modal isShow={showModal} title="Youtube Video" handlerShow={handerShow} >
                <YouTube videoId="lOLHRvsqaMU"/>
            </Modal>
        }

    </>
  )
}
