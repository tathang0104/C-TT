import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import * as actions from '../redux/actions';
import { productsState$ } from '../redux/selectors';

const Product = () => {
  const dispatch = useDispatch();
  const products = useSelector(productsState$);
  const navigate = useNavigate();
  const [option, setOption] = useState({
    page: 1,
    size: 50,
    category: '',
  });
  useEffect(() => {
    dispatch(actions.getProducts.getProductsRequest(option));
    // dispatch(actions.getProducts.getProductsRequest());
  }, [dispatch, option]);

  const handleEdit = (id) => {
    navigate(`update/${id}`)
  } 
  
  const handleDelete = (id) => {
    console.log(id)
    dispatch(actions.deleteProduct.deleteProductRequest(id))
  } 

  return (
    <>
      <div className='d-flex justify-content-between align-items-center'>
        <h1 className='text-primary'>Product list</h1>
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
          {
            products.map((product) => {
              return (
                <tr key={product._id}>
                  <td>{product._id}</td>
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
            })
          }
          
        </tbody>
      </table>
    </>
  )
}

export default Product