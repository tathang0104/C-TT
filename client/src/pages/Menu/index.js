import React, { useEffect, useState } from 'react'
import useInView from '../../hooks/useInView'
import clsx from "clsx"
import { menuBar} from "./data";
import { MenuDetail } from './MenuDetail';
import { Link } from 'react-router-dom';
import Modal from '../../components/Modal';
import { useContext} from "react";
import CartContext from '../../CartContext';
import { productsState, totalPage } from '../../redux/selectors'; 
import { useDispatch, useSelector } from 'react-redux';
import dayjs from 'dayjs';
import * as actions from '../.././redux/actions';
import { deleteComment } from '../../api';

export default function Menu() {
    const title = useInView()
    
    const {showModal, addToCard, handerShow, currentMeal, quantityValue, handerChangeQuantity, increase, decrease, handerOder, voteData, commentData} = useContext(CartContext)
    
    const dispatch = useDispatch();
    const products = useSelector(productsState);
    const total = useSelector(totalPage);
    const [showTabPane, setShowTapPane] = useState([true, false, false, false]);
    const [inputSearch, setInputSearch] = useState("");
    const pagination = []
    const [option, setOption] = useState({
        page: 1,
        size: 10,
        category: '',
        search: ''
    });

    const handerCick = (id) => {
        if (id === 0) {
            setOption(prev => ({...prev, page: 1, category: '', search: ''}))
            setShowTapPane([true, false, false, false])
            setInputSearch("")
        }
        
        if (id === 1) {
            setOption(prev => ({...prev, page: 1, category: 'Breakfast'}))
            setShowTapPane([false, true, false, false])
        }

        if (id === 2) {
            setOption(prev => ({...prev, page: 1, category: 'Launch'}))
            setShowTapPane([false, false, true, false])
        }
        if (id === 3) {
            setOption(prev => ({...prev, page: 1, category: 'Dinner'}))
            setShowTapPane([false, false, false, true])
        }
    }

    const changePage = (i) => {
        setOption(prev => ({...prev, page: i}))
    }

    for (let i = 0; i < total; i++) {
        pagination.push(
            <li key={i}>
            <Link to={'#'} onClick={()=>{changePage(i+1)}} className={clsx({"active": i + 1 === option.page} )}>{i + 1}</Link>
            </li>
        )
    }

    const prev = (page)=>{
        if(option.page !== 1)
            setOption(prev => ({...prev, page: page-1}))
    }

    const next = (page)=>{
        if(option.page !== total)
            setOption(prev => ({...prev, page: page+1}))
    }
    
    const menuBars = menuBar.map((item, index) => {
        return (
            <li key={index} className="nav-item">
                <Link to={"#"} className={clsx("d-flex align-items-center text-start mx-3 ms-0 pb-3", {"active" : showTabPane[index]})} onClick={() => handerCick(index)}>
                    <i className={clsx("d-flex fa fa-2x text-primary", `${item.icon}` )} ></i>
                    <div className="ps-3">
                        <small className="text-body">{item.text}</small>
                        <h6 className="mt-n1 mb-0">{item.meal}</h6>
                    </div>
                </Link>
            </li>
        )
    }) 

    const productShow = products.map((product)=>{
        return (
            <MenuDetail
                key={product._id}
                _id={product._id}
                photo_url={product.photo_url}
                name={product.name}
                price={product.price}
                description={product.description}
                quantity={product.quantity}
                addToCard={addToCard}
            />
        )
    })

    useEffect(() => {
        dispatch(actions.searchProduct.searchProductRequest(option));
    }, [dispatch, option, inputSearch]);

    // Search for items
    const handerChange = (e) => {
        setInputSearch(e.target.value)
    }

    const handerSubmit = (e) => {
        e.preventDefault()
        setOption(prev => ({...prev, search: inputSearch }))
    }

    const comments = commentData?.data?.map((item)=>{
        return (
            <div className="comment-card" key={item._id} id={item._id}>
                <div className="row">
                    <div className="col-md-3">
                        <div className="comment-users">
                            <img src={`http://${item.user_id.avatar_url}`} alt="user_avt"/> 
                            <span className="border-0">{item.user_id.username}</span>
                        </div>
                    </div>
                    <div className="col-md-9">
                        <div className="comment-scrip">
                            <p className='comment-content'>{item.content}</p>
                            <div className="comment-time">
                                {
                                    ( localStorage.getItem('userLoginedRole') === "ADMIN" || localStorage.getItem("userLoginedname") === `${item.user_id.username}` ) 
                                    && (
                                        <div className="float-left delete-comment-btn" onClick={()=>{
                                            deleteComment(item._id);
                                            document.getElementById(`${item._id}`).remove();
                                        }}><i className="far fa-trash-alt icon-delete"></i></div> 
                                    )
                                }
                                <div className="float-right">
                                    Posted at { dayjs(item.updatedAt).format('DD-MM-YYYY hh:mm') }
                                </div>
                                <div className="float-clear"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    })

  return (
    <div className="container-xxl py-5">
        <div className="container">
            <div ref={title.ref} className={clsx("text-center", {"animate__animated animate__fadeInUp": title.isInView})}>
                <h5 className="section-title ff-secondary text-center text-primary fw-normal">Food Menu</h5>
                <h1 className="mb-5">Most Popular Items</h1>
            </div>
            <div className='d-flex justify-content-center menu-search'>
                <form className='d-flex justify-content-center align-items-center mb-4' onSubmit={(e) => handerSubmit(e)}>
                    <i className='fa fa-search text-primary' style={{fontSize: "16px"}}></i>
                    <input type="text" className="" placeholder="Search" value={inputSearch} onChange={(e) => handerChange(e)}/>
                </form>
            </div>
            <div ref={title.ref} className={clsx("text-center tab-class", {"animate__animated animate__fadeInUp animate__delay-1s": title.isInView})}>
                <ul className="nav nav-pills d-inline-flex justify-content-center border-bottom mb-5">
                    { menuBars }
                </ul>
                <div className="tab-content mb-4">
                    <div className='tab-pane animate__animated animate__fadeIn p-0 show active'>
                        <div className='row g-4'>
                            { productShow?.length ? productShow : (
                                <div>No result</div>
                            )}
                        </div>
                    </div>
                </div>
                {
                    total !== 0 && (
                    <ul id="pagination">
                        <li><Link to={'#'} onClick={()=>prev(option.page)}>«</Link></li>
                        {pagination}
                        <li><Link to={'#'} onClick={()=>next(option.page)}>»</Link></li>
                    </ul> 
                    )
                }
            </div>
        </div>
    {
        showModal &&
        <Modal isShow={showModal} title="Your order" handlerShow={handerShow} >
            <div className="row g-4 m-4 mt-1">
                <h1 className="text-center text-primary m-0 p-0">Order</h1>
                <MenuDetail _id={currentMeal._id} photo_url={currentMeal.photo_url} name={currentMeal.name} price={currentMeal.price} description={currentMeal.description}/>
                <div className="col-lg-6 d-flex flex-column mt-1">
                    <div className='d-flex justify-content-between align-items-center'>
                        <div>Products are available</div>
                        <div className="mr-2 text-end">Among: </div>
                        <i className="fa fa-minus-square text-primary cursor-pointer" onClick={()=>decrease(currentMeal)}></i>
                        <input type="text" readOnly={true} className='w-15 text-center' value={quantityValue} onChange={(e)=>handerChangeQuantity(e)} />
                        <i className="fa fa-plus-square text-primary cursor-pointer" onClick={()=>increase(currentMeal)}></i>
                    </div>
                    <h6 className='d-flex w-100 error text-danger justify-content-end'>{null}</h6>
                    <div className="d-flex justify-content-end align-items-center" style={{height: "30px"}}>
                        <div className=''>Total price: </div>
                            <div className="w-25 fw-bold text-end">{quantityValue * currentMeal.price } $</div>
                    </div>
                    <div className='d-flex justify-content-end align-items-center'>
                        <button className='btn btn-primary d-flex justify-content-around align-items-center' onClick={()=>handerOder(currentMeal)}>
                            <i className='fa fa-cart-arrow-down'></i>
                            <div className='' style={{fontSize: "12px", marginLeft: "10px"}}>Add to cart</div>
                        </button>
                    </div>
                </div>
                {comments}
            </div>
        </Modal>
    }
    </div>
  )
}
