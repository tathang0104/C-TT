import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import * as actions from '../redux/actions';
import { selfOrder, totalPageSelfOrder } from '../redux/selectors';
import clsx from 'clsx';

export const SelfOrder = () => {
  const dispatch = useDispatch();
  const orders = useSelector(selfOrder);
  const total = useSelector(totalPageSelfOrder);
  const pagination = []
  const [option, setOption] = useState({
    page: 1,
    size: 4,
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
    dispatch(actions.getSelfOrders.getSelfOrdersRequest(option));
  }, [dispatch, option]);

  return (
    <>
      <div className='d-flex justify-content-between align-items-center'>
        <h1 className='text-primary'>Your orders list</h1>
      </div>
      <table className="table table-striped mt-3">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Order time</th>
            <th scope="col" className='w-15'>Special request</th>
            <th scope="col" className='w-50'>Detail order</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th scope="col"></th>
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