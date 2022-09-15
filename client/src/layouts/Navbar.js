import React, { useEffect, useState, useContext } from 'react'
import { Link, useLocation } from 'react-router-dom'
import Button from '../components/Button'
import CartContext from '../CartContext'


export default function Navbar({children}) {

    const { orders } = useContext(CartContext)
    const [isMenu, setIsMenu] = useState(false)
    const [isDropDown, setIsDropDown] = useState(false)

    let location = useLocation()
    const pathName = location.pathname
    const pathNameSlice = pathName.slice(1)
    const about = pathName.indexOf('/about')
    const service = pathName.indexOf('/service')
    const menu = pathName.indexOf('/menu')
    const reservation = pathName.indexOf('/reservation')
    const team = pathName.indexOf('/team')
    const testimonial = pathName.indexOf('/testimonial')
    const contact = pathName.indexOf('/contact')

    const showMenu = () => {
        setIsMenu(!isMenu)
    }

    const showDropdown = () => {
        setIsDropDown(true)
    }
    const hideDropdown = () => {
        setIsDropDown(false)
    }
    
    useEffect(()=> {
        const handleScroll =() => {
            const navbar = document.getElementById("navbar");
         
            if(document.documentElement.scrollTop > 150) {
                if(!navbar?.classList.contains("sticky-top")) {
                    navbar?.classList.add("sticky-top", "shadow-sm")
                }
            }else {

                if(navbar?.classList.contains("sticky-top", "shadow-sm")) {
                    navbar?.classList.remove("sticky-top", "shadow-sm")
                }
            }
        }
        window.addEventListener("scroll", handleScroll)

        return ()=> {
            window.removeEventListener("scroll", handleScroll)
        }
    }, [])

    const show = isDropDown ? "show" : ""
    return (


    <div className="container-xxl position-relative p-0">
            <nav id="navbar" className="navbar navbar-expand-lg navbar-dark bg-dark px-4 px-lg-5 py-3 py-lg-0">
                <Link to={"/"} className="navbar-brand p-0">
                    <h1 className="text-primary m-0"><i className="fa fa-utensils me-3"></i>Restoran</h1>
                </Link>
                <button className="navbar-toggler" type="button" onClick={()=>{showMenu()}} data-bs-toggle="collapse" data-bs-target="#navbarCollapse">
                    <span className="fa fa-bars"></span>
                </button>
                <div style={ isMenu ? {display: "block"} : {display: "none"}} className="collapse navbar-collapse" id="navbarCollapse">
                    <div className="navbar-nav ms-auto py-0 pe-4 ">
                        <Link to={"/"} className={pathNameSlice === "" ? "nav-item nav-link active" : "nav-item nav-link"}>Home</Link>
                        <Link to={"/about"} className={!about ? "nav-item nav-link active" : "nav-item nav-link"}>About</Link>
                        <Link to={"/service"} className={!service ? "nav-item nav-link active" : "nav-item nav-link"}>Service</Link>
                        <Link to={"/menu"} className={!menu ? "nav-item nav-link active" : "nav-item nav-link"}>Menu</Link>
                        <div className={"nav-item dropdown " + show} onMouseEnter={showDropdown} onMouseLeave={hideDropdown} >
                            <Link to={"#page"} className="nav-link dropdown-toggle" data-bs-toggle="dropdown">Pages</Link>
                            <div className={"dropdown-menu m-0 " + show}>
                                <Link to={"/reservation"} className={reservation ? "dropdown-item": "dropdown-item active"}>Booking</Link>
                                <Link to={"/team"} className={team ? "dropdown-item": "dropdown-item active"}>Our Team</Link>
                                <Link to={"/testimonial"} className={testimonial ? "dropdown-item": "dropdown-item active"}>Testimonial</Link>
                            </div>
                        </div>
                        <Link to={"/contact"} className={!contact ? "nav-item nav-link active" : "nav-item nav-link"}>Contact</Link>
                    </div>
                    <div className="px-2 py-4">
                        <Link to={"/reservation"}>
                            <Button name="Book A Table">
                                Book A Table
                                <span> ({orders.length})</span>
                            </Button>
                        </Link>
                    </div>
                </div>
            </nav>
            
            { children }
        </div>
  )
}
