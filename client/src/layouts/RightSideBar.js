
import clsx from 'clsx';
import { Link, useLocation } from 'react-router-dom';
import { AiOutlineDashboard } from 'react-icons/ai'
import { FaUserAlt } from 'react-icons/fa'
import { SiProducthunt } from 'react-icons/si'
import { TiShoppingCart } from 'react-icons/ti'
import "./RightSidebar.css"

const RightSideBar = () => {

    let location = useLocation()
    const pathName = location.pathname
    const pathNameSlice = pathName.slice(1) === 'dashboard' ? true : false
    const user = pathName.indexOf('/user') === 10 ? true : false
    const product = pathName.indexOf('/product') === 10 ? true : false
    const order = pathName.indexOf('/order') === 10 ? true : false
    return (
        <>
            <div className='sidebar p-3'>
                <div className="sidebar-menu">
                    <Link to={'/dashboard'}>
                        <div className={clsx("sidebar-menu-item", {"sidebar-active": pathNameSlice})}>
                            <div className={clsx("sidebar-menu-item-icon")}>
                                <AiOutlineDashboard />
                            </div>
                            <div className="sidebar-menu-item-text">Dashboard</div>
                        </div>
                    </Link>
                    <Link to={'/dashboard/user'}>
                        <div className={clsx("sidebar-menu-item", {"sidebar-active": user})}>
                            <div className={clsx("sidebar-menu-item-icon")}>
                                <FaUserAlt />
                            </div>
                            <div className="sidebar-menu-item-text">User</div>
                        </div>
                    </Link>
                    <Link to={'/dashboard/product'}>
                        <div className={clsx("sidebar-menu-item", {"sidebar-active": product})}>
                            <div className={clsx("sidebar-menu-item-icon")}>
                                <SiProducthunt />
                            </div>
                            <div className="sidebar-menu-item-text">Product</div>
                        </div>
                    </Link>
                    <Link to={'/dashboard/order'}>
                        <div className={clsx("sidebar-menu-item", {"sidebar-active": order})}>
                            <div className={clsx("sidebar-menu-item-icon")}>
                                <TiShoppingCart />
                            </div>
                            <div className="sidebar-menu-item-text">Order</div>
                        </div>
                    </Link>
                </div>
            </div>  
        </>
    )
}

export default RightSideBar