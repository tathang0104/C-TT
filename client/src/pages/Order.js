import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import * as actions from '../redux/actions';
import { ordersState } from '../redux/selectors';

const Order = () => {
  const dispatch = useDispatch();
  const orders = useSelector(ordersState);
  const [data, setData] = useState(null)
  const navigate = useNavigate();
  const [option, setOption] = useState({
    page: 1,
    size: 50,
  });
  console.log({orders})

  const [searchInput, setSearchInput] = useState("");

  useEffect(()=>{
  },[orders])
  
  useEffect(() => {
    dispatch(actions.getAllOrders.getAllOrdersRequest(option));
    setData(orders)
    // dispatch(actions.getProducts.getProductsRequest());
  }, [dispatch, option]);

  const handleEdit = (id) => {
    navigate(`update/${id}`)
  } 
  
  const handleDelete = (id) => {
    console.log(id)
    // dispatch(actions.deleteProduct.deleteProductRequest(id))
    // console.log(option)
    // dispatch(actions.getProducts.getProductsRequest(option));
  } 

  const handerChange = (e) => {
    setSearchInput(e.target.value)
  }

  const handerSubmit = (e) => {
    e.preventDefault()
    const payload = {
      page: 1,
      size: 10,
      search: searchInput
    }
    // dispatch(actions.searchProduct.searchProductRequest(payload));
}

  return (
    <>
      <div className='d-flex justify-content-between align-items-center'>
        <h1 className='text-primary'>Orders list</h1>
        <div className='menu-search'>
          <form className='d-flex justify-content-center align-items-center' onSubmit={(e) => handerSubmit(e)}>
            <i className='fa fa-search text-primary' style={{fontSize: "16px"}}></i>
            <input type="text" className="" placeholder="Search" value={searchInput} onChange={(e) => handerChange(e)}/>
          </form>
        </div>
        <div></div>
        {/* <Link to={'create'} className="btn btn-primary">Add new product</Link> */}
      </div>
      <table className="table table-striped mt-3">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col" className='w-20'>User name</th>
            <th scope="col">Order time</th>
            <th scope="col">Special request</th>
            <th scope="col" className='w-50'>Detail order</th>
            <th scope="col">Actions</th>
          </tr>
        </thead>
        <tbody>
          {
            data?.map((order) => {
              return (
                <tr key={order?._id}>
                  <td>{order?._id}</td>
                  <td>{order?.user_id?.username}</td>
                  <td>{order?.order_time}</td>
                  <td>{order?.special_request}</td>
                  <td className='w-50'>
                    {
                      order.detail_order.map((item)=>{
                        return (
                          <div className='d-flex'>
                            <div>{item?.product_id?._id}</div>
                            <div>{item?.product_id?.name}</div>
                            <div>{item?.product_id?.price}</div>
                            <div>
                              <img style={{height: "80px", width: "80px"}} src={`http://${item?.product_id?.photo_url}`} alt="product_img" />
                            </div>
                            <div>{item?.product_id?.category}</div>
                          </div>
                        )
                      })
                    }
                  </td>
                  <td>
                    <img style={{height: '25px', width: '25px'}} src='/img/edit.png' alt="" className='p-1 cursor-pointer' onClick={() => handleEdit(order._id)}/>
                    <img style={{height: '25px', width: '25px'}} src='/img/delete.png' alt="" className='p-1 cursor-pointer' onClick={() => {if (window.confirm('Are you sure to delete this order?')) {handleDelete(order._id)}}}/>
                  </td>
                </tr>
              )
            })
          }
          
        </tbody>
      </table>
    </>
  )
}

export default Order