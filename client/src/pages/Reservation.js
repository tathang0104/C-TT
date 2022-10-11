import React, { useState } from 'react'
import axios from "axios";
import { useNavigate } from 'react-router-dom'
import useInView from '../hooks/useInView'
import clsx from "clsx"
import YouTube from 'react-youtube'
import Modal from '../components/Modal'
import { OrderedMenu } from '../components/OrderedMenu'
import { useContext} from "react";
import CartContext from "../CartContext";
import { useDispatch } from 'react-redux';
import * as actions from '../redux/actions';

export default function Reservation() {
    const title = useInView()
    const [showModal, setShowModal] = useState(false);
    const handerShow = () => {
        setShowModal(prev => !prev)
    }

    const [email, setEmail] = useState(`${localStorage.getItem('userLoginedEmail')}`);
    const [name, setName] = useState(`${localStorage.getItem('userLoginedname')}`);
    const [dateTime, setDateTime] = useState("");
    const [specialRequest, setSpecialRequest] = useState("");
    const [peopleEat, setPeopleEat] = useState("People 1");
    const [orderSuccess, setOrderSuccess] = useState(false);
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { orders, setOrdersContext } = useContext(CartContext);

    const menuOrdered = orders?.map(order => {
        return (
            <OrderedMenu 
                key={order.product_id}
                product_id={order.product_id}
                photo_url={order.photo_url}
                name={order.name}
                price={order.price}
                quantity={order.quantity}
                quantity_order={order.quantity_order}
            />
        )
    })

    let sum = 0

    orders?.forEach(order => {
        sum += order.price * order.quantity_order
    })

    const handerSubmitFormOrderd = async (e, orders) => {
        e.preventDefault()
        if (!localStorage.getItem('authToken')) {
            navigate("/login")
        } else if (!orders || orders.length === 0) {
            document.getElementsByClassName('err')[0].innerHTML = 'Please select a new order in menu'
            navigate("/menu")
        } else {
            setOrderSuccess(true)
            const data = {
                order_time: dateTime,
                special_request: specialRequest,
                detail_order: orders
            }
            console.log(data)
            dispatch(actions.createOrder.createOrderRequest(data));

            const config = {
                header: {
                "Content-Type": "application/json",
                },
            };

            try {
                const { data } = await axios.post(
                    "/api/client/bookingtable",
                    { email, orders, name, dateTime, peopleEat, specialRequest },
                    config
                );
                
                console.log(data)
                setOrdersContext([])
                navigate('/dashboard/selfOrder')
            } catch (error) {
                console.log(error.response.data.error);
            }
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
                        {
                            sum !== 0 &&
                            <h5 className="text-end text-primary">Total price: {sum} $</h5>
                        }
                        <form className='mt-3' onSubmit={(e)=>handerSubmitFormOrderd(e, orders)}>
                            <div className="row g-3">
                                { !localStorage.getItem('userLoginedname') && 
                                    <div className="col-md-6">
                                        <div className="form-floating">
                                            <input type="text" className="form-control" required id="name" placeholder="Your Name" 
                                                value={name}
                                                onChange={(e) => setName(e.target.value)}
                                            />
                                            <label htmlFor="name">Your Name</label>
                                        </div>
                                    </div>
                                }
                                { !localStorage.getItem('userLoginedEmail') &&
                                    <div className="col-md-6">
                                        <div className="form-floating">
                                            <input 
                                                type="email" className="form-control" required id="email" placeholder="Your Email" 
                                                value={email}
                                                onChange={(e) => setEmail(e.target.value)}
                                            />
                                            <label htmlFor="email">Your Email</label>
                                        </div>
                                    </div>
                                }
                                <div className="col-md-6">
                                    <div className="form-floating date" id="date3" data-target-input="nearest">
                                        <input type="text" className="form-control datetimepicker-input" required id="datetime" placeholder="Date & Time" data-target="#date3" data-toggle="datetimepicker" 
                                            value={dateTime}
                                            onChange={(e) => setDateTime(e.target.value)}
                                        />
                                        <label htmlFor="datetime">Date & Time</label> 
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="form-floating">
                                        <select className="form-select" required id="select1"
                                            value={peopleEat}
                                            onChange={(e) => setPeopleEat(e.target.value)}
                                        >
                                          <option value="People 1">People 1</option>
                                          <option value="People 2">People 2</option>
                                          <option value="People 3">People 3</option>
                                        </select>
                                        <label htmlFor="select1">No Of People</label>
                                      </div>
                                </div>
                                <div className="col-12">
                                    <div className="form-floating">
                                        <textarea className="form-control" placeholder="Special Request" id="message" style={{height: "100px"}}
                                            value={specialRequest}
                                            onChange={(e) => setSpecialRequest(e.target.value)}
                                        ></textarea>
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
            orderSuccess && <Modal isShow={orderSuccess} title="Notifications" handlerShow={setOrderSuccess}>
                <div className="container w-100 m-4">
                    <h3>Hi {name.toLocaleUpperCase()}, you have booked your table</h3>
                    <h6>Please check your email address: <a href='https://gmail.com' rel="noreferrer" target="_blank" className='text-primary'>{email}</a> to see your meal infomation</h6>
                </div>
            </Modal>
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
