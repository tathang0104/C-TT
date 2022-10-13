import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom'
import { createProduct } from '../api'

const CreateProduct = () => {

  const [selectedFile, setSelectedFile] = useState();

  const [preview, setPreview] = useState();

  const [data, setData] = useState({
    name: '',
    price: '',
    productPhoto: '',
    category: '',
    description: '',
  });
  
  const navigate = useNavigate();

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
    
    setSelectedFile(e.target.files[0]);
    setData({ ...data, productPhoto: e.target.files[0]})
  };
  
  const onSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('name', data.name);
    formData.append('description', data.description);
    formData.append('price', data.price);
    formData.append('category', data.category);
    formData.append('productPhoto', data.productPhoto);

    createProduct(formData).then(data => {
      navigate('/dashboard/product');
    }).catch(err => {
      console.log(err)
    })
  };

  return (
    <>
      <h1 className="text-primary">Create Product</h1>
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
                {selectedFile && (
                  <img src={preview} alt="productImg" className="img-preview" />
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
                    placeholder="Price"
                    onChange={(e) => setData({ ...data, price: e.target.value })}
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
                    style={{ minHeight: "150px" }}
                    onChange={(e) => setData({ ...data, description: e.target.value })}
                  ></textarea>
                  <label htmlFor="description">Description</label>
                </div>
              </div>
              <div className="col-12">
                <button className="btn btn-primary w-100 py-3" type="submit">
                  Create Product
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default CreateProduct;
