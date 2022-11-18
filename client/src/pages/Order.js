import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import * as actions from '../redux/actions';
import { ordersState, totalPageOrder } from '../redux/selectors';
import clsx from 'clsx';

const Order = () => {
  const dispatch = useDispatch();
  const orders = useSelector(ordersState);
  const total = useSelector(totalPageOrder);
  const navigate = useNavigate();
  const [searchInput, setSearchInput] = useState("");
  const pagination = []
  const [option, setOption] = useState({
    page: 1,
    size: 5,
    search: '',
  });
  
  const changePage = (i) => {
    setOption(prev => ({...prev, page: i}))
  } 
  for(let i = 0; i < total; i++) {
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

  useEffect(() => {
    dispatch(actions.searchOrder.searchOrderRequest(option));
  }, [dispatch, option]);

  const handleEdit = (id) => {
    navigate(`update/${id}`)
  } 
  
  const handleDelete = (id) => {
    dispatch(actions.deleteOrder.deleteOrderRequest(id))
    setOption(prev => ({...prev, page: 1}))
  } 

  const handerChange = (e) => {
    setSearchInput(e.target.value)
  }

  const handerSubmit = (e) => {
    e.preventDefault()
    setOption(prev => ({...prev, 
      page: 1,
      search: searchInput 
    }))
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
        <div></div>
        <div></div>
       
      </div>
      <table className="table table-striped mt-3">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col" className='w-15'>User name</th>
            <th scope="col">Order time</th>
            <th scope="col" className='w-15'>Special request</th>
            <th scope="col" className='w-50'>Detail order</th>
            <th scope="col">Actions</th>  
          </tr>
        </thead>
        <tbody>
          <tr>
            <th scope="col"></th>
            <th scope="col" className='w-15'></th>
            <th scope="col"></th>
            <th scope="col" className='w-15'></th>
            <th scope="col" className='w-50'>
                <div className='row'>
                    <div className='col-md-3'>Product name</div>
                    <div className='col-md-3'>Price</div>
                    <div className='col-md-3'>Photo</div>
                    <div className='col-md-3'>Quantity</div>
                </div>
            </th>
            <th scope="col"></th>
          </tr>
          {
            orders?.map((order, index) => {
              return (
                <tr key={order?._id}>
                  <td>{(option.page-1)*option.size+index+1}</td>
                  <td>{order?.user_id?.username}</td>
                  <td>{order?.order_time}</td>
                  <td>{order?.special_request}</td>
                  <td className='w-50'>
                    {
                      order?.detail_order?.map((item)=>{
                        return (
                          <div className='row mb-3' key={item._id}>
                            <div className='col-md-3'>{item?.product_id?.name}</div>
                            <div className='col-md-3'>{item?.product_id?.price}</div>
                            <div className='col-md-3'>
                              <img style={{height: "80px", width: "80px"}} src={`http://${item?.product_id?.photo_url}`} alt="product_img" />
                            </div>
                            <div className='col-md-3 text-center'>{item?.quantity_order}</div>
                          </div>
                        )
                      })
                    }
                  </td>
                  <td>
                    <img style={{height: '25px', width: '25px'}} src='/img/edit.png' alt="" className='p-1 cursor-pointer' onClick={() => handleEdit(order?._id)}/>
                    {/* <img style={{height: '25px', width: '25px'}} src='/img/delete.png' alt="" className='p-1 cursor-pointer' onClick={() => {if (window.confirm('Are you sure to delete this order?')) {handleDelete(order._id)}}}/> */}
                  </td>
                </tr>
              )
            })
          }
        </tbody>
      </table>
      {
        total !== 0 && (
          <ul id="pagination">
            <li><Link to={'#'} onClick={()=>prev(option.page)}>«</Link></li>
            {pagination}
            <li><Link to={'#'} onClick={()=>next(option.page)}>»</Link></li>
          </ul> 
        )
      }
    </>
  )
}

export default Order