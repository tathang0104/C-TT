import { createContext, useState } from "react";
import { data } from "./pages/Menu/data";

const CartContext = createContext();

export function CartProvider({children}) {

    const [showModal, setShowModal] = useState(false);
    const [orders, setOrders] = useState([]);
    const [currentMeal, setcurrentMeal] = useState(null);
    const [quantityValue, setquantityValue] = useState(0);


    const handerShow = () => {
        setShowModal(prev => !prev)
    }

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
        
        orders.length === 0 && setquantityValue(0)
        const detail = data.find(item => item.id === id)
        setcurrentMeal(detail)
        if (orders.length > 0) {
            const ordered = orders.find(item => item.menu_detail_id === id) 
            ordered === undefined
            ? setquantityValue(0)
            : setquantityValue(ordered.quantityOrdered)
        }
        handerShow()   
    }  

    const handerOder = (currentMeal) => {
        
        if (orders.length < 1 ) setquantityValue(0)
        if (quantityValue > 0) {
            document.getElementsByClassName("error")[0].innerHTML = ``
            const orderList = { menu_detail_id: currentMeal.id, quantityOrdered : quantityValue, price: currentMeal.price, quantity: currentMeal.quantity, name: currentMeal.name, photo: currentMeal.photo}

            if (orders.length > 0) {
                const index = orders.findIndex(item => item.menu_detail_id === currentMeal.id)
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
        const deteledOrder = orders.find(item => item.menu_detail_id === id)
        console.log(orders)
        const newOders = orders.filter(item => item.menu_detail_id !== deteledOrder.menu_detail_id)
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
