import React, { useState } from 'react'
import useInView from '../../hooks/useInView'
import clsx from "clsx"
import {data, menuBar} from "./data";
import { MenuDetail } from './MenuDetail';
import { Link } from 'react-router-dom';

export default function Menu() {
    const title = useInView()
    

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
                                addToCard={data.addToCard}
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
                description={item.description}
                addToCard={item.addToCard}
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
                { !notSearch ? (
                        <div id="tab-search" className={clsx("tab-pane animate__animated animate__fadeIn p-0 show active")}>
                            <div className="row g-4">
                                { searchDatas }
                            </div>
                        </div>
                    ) :
                    menus
                }
            </div>
        </div>
    </div>
</div>
  )
}
