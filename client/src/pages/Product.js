import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import * as actions from '../redux/actions';
import { productsState, totalPage } from '../redux/selectors';
import clsx from 'clsx';

const Product = () => {
  const dispatch = useDispatch();
  const products = useSelector(productsState);
  const total = useSelector(totalPage);
  const navigate = useNavigate();
  const [searchInput, setSearchInput] = useState("");
  const pagination = []
  const [option, setOption] = useState({
    page: 1,
    size: 10,
    category: '',
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
    dispatch(actions.searchProduct.searchProductRequest(option));
  }, [dispatch, option]);

  const handleEdit = (id) => {
    navigate(`update/${id}`)
  } 
  
  const handleDelete = (id) => {
    dispatch(actions.deleteProduct.deleteProductRequest(id))
    setOption({
      page: 1,
      category: '',
      search: '',
    })
  } 

  const handerChange = (e) => {
    setSearchInput(e.target.value)
  }

  const handerSubmit = (e) => {
    e.preventDefault()
    setOption(prev => ({...prev, 
      page: 1,
      category: '',
      search: searchInput 
    }))
  }
  
  return (
    <>
      <div className='d-flex justify-content-between align-items-center'>
        <h1 className='text-primary'>Product list</h1>
        <div className='menu-search'>
          <form className='d-flex justify-content-center align-items-center' onSubmit={(e) => handerSubmit(e)}>
            <i className='fa fa-search text-primary' style={{fontSize: "16px"}}></i>
            <input type="text" className="" placeholder="Search" value={searchInput} onChange={(e) => handerChange(e)}/>
          </form>
        </div>
        <Link to={'create'} className="btn btn-primary">Add new product</Link>
      </div>
      <table className="table table-striped mt-3">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col" className='w-20'>Product name</th>
            <th scope="col">Description</th>
            <th scope="col">Price</th>
            <th scope="col">Photo</th>
            <th scope="col">Category</th>
            <th scope="col">Actions</th>
          </tr>
        </thead>
        <tbody>
          { total !== 0 ? (
            products.map((product, index) => {
              return (
                <tr key={product._id}>
                  <td>{(option.page-1)*option.size+index+1}</td>
                  <td>{product.name}</td>
                  <td>{product.description}</td>
                  <td>{product.price}</td>
                  <td>
                    <img style={{height: '60px', width: '60px'}} src={`http://${product.photo_url}`} alt="" />
                  </td>
                  <td>{product.category}</td>
                  <td>
                    <img style={{height: '25px', width: '25px'}} src='/img/edit.png' alt="" className='p-1 cursor-pointer' onClick={() => handleEdit(product._id)}/>
                    <img style={{height: '25px', width: '25px'}} src='/img/delete.png' alt="" className='p-1 cursor-pointer' onClick={() => {if (window.confirm('Are you sure to delete this product?')) {handleDelete(product._id)}}}/>
                  </td>
                </tr>
              )
            }))
            : (<td style={{marginTop: "30px", textAlign: 'center'}} colSpan={7}>No result</td>)
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

export default Product