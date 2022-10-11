import { createContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { productsState } from "./redux/selectors"; 
import * as actions from './redux/actions';
import { useNavigate } from "react-router";

const CartContext = createContext();

export function CartProvider({children}) {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [showModal, setShowModal] = useState(false);
    const [orders, setOrders] = useState([]);
    const [currentMeal, setcurrentMeal] = useState(null);
    const [quantityValue, setquantityValue] = useState(0);
    const products = useSelector(productsState);
    const [option, setOption] = useState({
        page: 1,
        size: 10,
        category: '',
        search: '',
    });

    const handerShow = () => {
        setShowModal(prev => !prev)
    }

    useEffect(() => {
        dispatch(actions.searchProduct.searchProductRequest(option));
    }, [dispatch, option]);
  
    const handerChangeQuantity = (e) => {
        setquantityValue(e.target.value)
    }

    const decrease = (order) => {
        
        setquantityValue((prev)=>{
            if(prev < 1) {
                document.getElementsByClassName("error")[0].innerHTML = `More than 0`
                return 0
            }
            return prev - 1
        })
    } 

    const increase = (order) => {
        setquantityValue((prev)=>{
            if(prev >= order.quantity) {
                document.getElementsByClassName("error")[0].innerHTML = `Maximum quantity`
                return prev
            } else {
                document.getElementsByClassName("error")[0].innerHTML = ``
                return prev + 1
            }
        })
    }
    
    const addToCard = (id) => { 
        orders?.length === 0 && setquantityValue(0)
        const detail = products.find(item => item._id === id)
        setcurrentMeal(detail)
        if (!localStorage.getItem('authToken')) {
            navigate("/login")
        } else if (orders?.length > 0) {
            const ordered = orders.find(item => item.product_id === id) 
            ordered === undefined
            ? setquantityValue(0)
            : setquantityValue(ordered.quantity_order)
        }
        handerShow()   
    }  

    const handerOder = (currentMeal) => {
        
        if (orders?.length < 1 ) setquantityValue(0)
        if (quantityValue > 0) {
            document.getElementsByClassName("error")[0].innerHTML = ``
            const orderList = { product_id: currentMeal._id, quantity_order : quantityValue, price: currentMeal.price, name: currentMeal.name, photo_url: currentMeal.photo_url}

            if (orders?.length > 0) {
                const index = orders.findIndex(item => item.product_id === currentMeal._id)
                index !== -1 && orders.splice(index, 1)
            }

            orders.push(orderList)
            setOrders(orders)
            console.log(orderList)
            console.log(orders)
            console.log(currentMeal)
            handerShow()   
        } else {
            document.getElementsByClassName("error")[0].innerHTML = `Please select the quantity value`
        }
    }



    const handerDelete = (id) => {
        const deteledOrder = orders.find(item => item.product_id === id)
        console.log(orders)
        const newOders = orders.filter(item => item.product_id !== deteledOrder.product_id)
        console.log(newOders)
        setOrders(newOders)
    }

    const setOrdersContext = (OrdersContext) => {
        setOrders(OrdersContext)
    }

    return (
        <CartContext.Provider 
            value={{showModal, orders, currentMeal, quantityValue, setOrdersContext, handerShow, handerChangeQuantity, increase, decrease, addToCard, handerOder, handerDelete}}
        >
            {children}
        </CartContext.Provider>
    )
}

export default CartContext;
