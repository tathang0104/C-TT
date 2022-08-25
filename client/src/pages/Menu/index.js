import React, { useState } from 'react'
import useInView from '../../hooks/useInView'
import clsx from "clsx"
import {data, menuBar} from "./data";
import { MenuDetail } from './MenuDetail';
import { Link } from 'react-router-dom';
import Modal from '../../components/Modal';
import { useContext} from "react";
import CartContext from '../../CartContext';

export default function Menu() {
    const title = useInView()
    
  const {showModal, addToCard, handerShow, currentMeal, quantityValue, handerChangeQuantity, increase, decrease, handerOder} = useContext(CartContext)



    const [showTabPane, setShowTapPane] = useState([true, false, false]);
    const [notSearch, setNotSearch] = useState([false]);
    const [inputSearch, setInputSearch] = useState("");
    const [searchData, setSearchData] = useState([]);

    
    const handerCick = (id) => {
        if (id === 0) setShowTapPane([true, false, false])
        if (id === 1) setShowTapPane([false, true, false])
        if (id === 2) setShowTapPane([false, false, true])
        setNotSearch(true)
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

    let menu = [ [], [], [] ]
    data.forEach((item) => {
        if (item.category === "Breakfast") menu[0].push(item)
        if (item.category === "Launch") menu[1].push(item)
        if (item.category === "Diner") menu[2].push(item)
    })
    
    const menus = menu.map((item, index) => {
        return (
            <div key={index} id={`tab-${index + 1}`} className={clsx("tab-pane animate__animated animate__fadeIn p-0 ", {"show active" : showTabPane[index]})}>
                <div className="row g-4">
                    {
                        item.map((data) => {
                            return (
                              <MenuDetail
                                key={data.id}
                                id={data.id}
                                photo={data.photo}
                                name={data.name}
                                price={data.price}
                                description={data.description}
                                quantity={data.quantity}
                                addToCard={addToCard}
                              />
                            );
                        })
                    }
                </div>
            </div>
        )
    })

    // Search for items
    const handerChange = (e) => {
        setInputSearch(e.target.value)
    }

    const handerSubmit = (e) => {
        e.preventDefault()
        const menuData = data.filter(item => item.name.toLowerCase().includes(inputSearch) || item.price === parseFloat(inputSearch))
        setSearchData(menuData)
        setNotSearch(false)
    }

    const searchDatas = searchData.map((item) => {
        return (
            <MenuDetail 
                key={item.id}
                id={item.id}
                photo={item.photo}
                name={item.name}
                price={item.price}
                quantity={item.quantity}
                description={item.description}
                addToCard={addToCard}
            />
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
                <i className='fa fa-search text-primary'></i>
                <input type="text" className="" placeholder="Search" value={inputSearch} onChange={(e) => handerChange(e)}/>
            </form>
        </div>
        <div ref={title.ref} className={clsx("text-center tab-class", {"animate__animated animate__fadeInUp animate__delay-1s": title.isInView})}>
            <ul className="nav nav-pills d-inline-flex justify-content-center border-bottom mb-5">
                { menuBars }
            </ul>
            <div className="tab-content">
                { !notSearch ? ( searchData.length > 0 ? (
                        <div id="tab-search" className={clsx("tab-pane animate__animated animate__fadeIn p-0 show active")}>
                            <div className="row g-4">
                                { searchDatas }
                            </div>
                        </div>
                ) : (
                    <div>No result</div>
                )
                    ) :
                    menus
                }
            </div>
        </div>


    </div>
    {
        showModal &&
        <Modal isShow={showModal} title="Your order" handlerShow={handerShow} >
            <div className="row g-4 m-4">
                <h1 className="text-center text-primary m-0 p-0">Order</h1>
                <MenuDetail id={currentMeal.id} photo={currentMeal.photo} name={currentMeal.name} price={currentMeal.price} description={currentMeal.description}/>
                <div className="col-lg-6 d-flex flex-column">
                    <div className='d-flex justify-content-around align-items-center'>
                    <div>{currentMeal.quantity} {currentMeal.quantity > 1 ? "products" : "product"} are available</div>
                        <div className="mr-2 text-end">Among: </div>
                        <i className="fa fa-minus-square text-primary" onClick={()=>decrease(currentMeal)}></i>
                        <input type="text" readOnly={true} className='w-15 text-center' value={quantityValue} onChange={(e)=>handerChangeQuantity(e)} />
                        <i className="fa fa-plus-square text-primary" onClick={()=>increase(currentMeal)}></i>
                    </div>
                    <h6 className="d-flex w-100 error text-danger justify-content-end ">{null}</h6>
                    <div className="d-flex justify-content-end align-items-center" style={{height: "50px"}}>
                        <div className=''>Total price: </div>
                            <div className="w-25 text-end">{quantityValue * currentMeal.price } $</div>
                    </div>
                    <div className='d-flex justify-content-end align-items-center'>
                        <button className='btn btn-primary d-flex justify-content-around align-items-center' onClick={()=>handerOder(currentMeal)}>
                            <i className='fa fa-cart-arrow-down p-1'></i>
                            <div className=''>Add to cart</div>
                        </button>
                    </div>
                </div>
            </div>
        </Modal>
    }
</div>
  )
}
