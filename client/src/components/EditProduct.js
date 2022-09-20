import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";

import * as actions from '../redux/actions';
import { currentProduct$ } from "../redux/selectors";
// import { useNavigate } from 'react-router-dom'

const EditProduct = () => {

  const {id} = useParams()

  const [selectedFile, setSelectedFile] = useState();
  const [preview, setPreview] = useState();

  const dispatch = useDispatch();
  const product = useSelector(currentProduct$);
  const navigate = useNavigate();
  const [data, setData] = useState(null);

  useEffect(()=> {
    setData(product)
  }, [product])
  
  useEffect(() => {
    dispatch(actions.getOneProduct.getOneProductRequest(id));
  }, [dispatch, id]);

  // create a preview as a side effect, whenever selected file is changed
  useEffect(() => {
    if (!selectedFile) {
      setPreview(undefined);
      return;
    }

    const objectUrl = URL.createObjectURL(selectedFile);
    setPreview(objectUrl);

    // free memory when ever this component is unmounted
    return () => URL.revokeObjectURL(objectUrl);
  }, [selectedFile]);

  const onSelectFile = (e) => {
    if (!e.target.files || e.target.files.length === 0) {
      setSelectedFile(undefined);
      return;
    }

    // I've kept this example simple by using the first image instead of multiple
    setSelectedFile(e.target.files[0]);
    setData({ ...data, productPhoto: e.target.files[0]})
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('_id', data._id);
    formData.append('name', data.name);
    formData.append('description', data.description);
    formData.append('price', data.price);
    formData.append('category', data.category);
    formData.append('productPhoto', data.productPhoto);
    dispatch(actions.updateProduct.updateProductRequest(formData));
    navigate('/dashboard/product');
  };



  return (
    <>
      <h1 className="text-primary">Edit Product {id}</h1>
      <div className="row">
        <div className="col-md-12">
          <form onSubmit={onSubmit}>
            <div className="row">
              <div className="col-md-3">
                <input
                  type="file"
                  onChange={onSelectFile}
                  className="custom-file-input mb-3"
                />
              </div>
              <div className="col-md-6">
                  {selectedFile ? (
                    <img src={preview} alt="productImg" className="img-preview" />
                    ): ( 
                      <img src={`http://${data?.photo_url}`} alt="productImg" className="img-preview" />
                    )}
              </div>
            </div>
            <div className="row g-3 mt-1">
              <div className="col-md-6">
                <div className="form-floating">
                  <input
                    type="text"
                    className="form-control"
                    id="name"
                    value={data?.name}
                    placeholder="Product Name"
                    onChange={(e) => setData({ ...data, name: e.target.value })}
                  />
                  <label htmlFor="name">Product Name</label>
                </div>
              </div>
              <div className="col-md-6">
                <div className="form-floating">
                  <input
                    type="text"
                    className="form-control"
                    id="price"
                    value={data?.price}
                    onChange={(e) => setData({ ...data, price: e.target.value })}
                    placeholder="Price"
                  />
                  <label htmlFor="price">Price</label>
                </div>
              </div>
              <div className="col-12">
                <div className="form-floating">
                  <input
                    type="text"
                    className="form-control"
                    id="category"
                    value={data?.category}
                    placeholder="Category"
                    onChange={(e) => setData({ ...data, category: e.target.value })}
                  />
                  <label htmlFor="category">Category</label>
                </div>
              </div>
              <div className="col-12">
                <div className="form-floating">
                  <textarea
                    className="form-control"
                    placeholder="Leave a message here"
                    id="description"
                    value={data?.description}
                    style={{ minHeight: "150px" }}
                    onChange={(e) => setData({ ...data, description: e.target.value })}
                  ></textarea>
                  <label htmlFor="description">Description</label>
                </div>
              </div>
              <div className="col-6">
                <button className="btn btn-primary w-50 py-3 mr-5" type="submit">
                  Edit Product
                </button>
              </div>
              <div className="col-6">
                <Link to={'/dashboard/product'} className="btn btn-danger w-50 py-3">
                  Cancel
                </Link>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default EditProduct;
