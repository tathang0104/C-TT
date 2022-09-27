import React, { useEffect, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { logout } from '../redux/actions'
import { RiLogoutBoxRLine } from 'react-icons/ri'
import { ImProfile } from 'react-icons/im'
import * as actions from '../redux/actions';
import { currentUserLogined, currentUserLoginedToken } from "../redux/selectors";



export default function ManageNavbar() {

    const [isDropDown, setIsDropDown] = useState(false)
    const [userLogined, setUserLogined] = useState(null)
    const dispatch = useDispatch()
    const navigate = useNavigate();
    let location = useLocation()
    const pathName = location.pathname
    const profile = pathName.indexOf('/profile')
    const data = useSelector(currentUserLogined)
    const userLoginedToken = useSelector(currentUserLoginedToken);


    const showDropdown = () => {
        setIsDropDown(true)
    }
    const hideDropdown = () => {
        setIsDropDown(false)
    }
    
    const handleLogout = (e) => {
        e.preventDefault()
        if (localStorage.getItem('authToken')) {
            dispatch(logout.logoutRequest())
            localStorage.removeItem('authToken')
            navigate("/")
        }
    }

    useEffect(() => {
        dispatch(actions.getProfile.getProfileRequest(localStorage.getItem('authToken')));
      }, [dispatch, userLoginedToken]);
    
    useEffect(()=>{
        setUserLogined(data?.user)
    }, [data])

    useEffect(()=>{
        if (!localStorage.getItem('authToken')) {
            navigate("/")
        }
    }, [navigate])

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
              
                    <div className="navbar-nav ms-auto py-0 pe-4 ">
                        { userLogined ? (
                            <div className={"nav-item dropdown " + show} onMouseEnter={showDropdown} onMouseLeave={hideDropdown} >
                                <Link to={"#profile"} className="nav-link dropdown-toggle m-0" style={{padding: "20px 0px"}} data-bs-toggle="dropdown">
                                    {
                                        userLogined?.avatar_url ? (
                                            <img src={`http://${userLogined?.avatar_url}`} alt="user_avt" className='avatar-img'/>
                                        ) : (
                                            <img src='/img/default-avatar.jpg' alt="user_avt" className='avatar-img'/>
                                        )
                                    }
                                    
                                    {userLogined && userLogined?.username}
                                </Link>
                                <div className={"dropdown-menu m-0 " + show}>
                                    <Link to={"profile"} className={profile ? "dropdown-item": "dropdown-item active"}><ImProfile style={{marginRight: "10px"}} />Profile</Link>
                                    <Link to={"/logout"} onClick={(e)=>handleLogout(e)} className={"dropdown-item"} style={{borderTop: "1px solid #FEA116"}}><RiLogoutBoxRLine style={{marginRight: "10px"}}/>Logout</Link>
                                </div>  
                            </div>
                            ) : (
                                <Link to={"/logout"} onClick={(e)=>handleLogout(e)} className={"text-white"} ><RiLogoutBoxRLine style={{marginRight: "10px"}}/>Logout</Link>
                            ) 
                        }
                    </div>
            </nav>
        </div>
  )
}
