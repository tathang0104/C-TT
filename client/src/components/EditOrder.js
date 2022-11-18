import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { updateOrder } from "../api"
import * as actions from "../redux/actions";
import { currentOrder } from "../redux/selectors";

const EditOrder = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const order = useSelector(currentOrder);
  const navigate = useNavigate();
  const [data, setData] = useState(null);
  const [totalPrice, setTotalPrice] = useState();
  
  useEffect(() => {
    setData(order);
  }, [order]);

  useEffect(() =>{
    let sum = 0
    for (let i = 0; i < data?.detail_order.length; i++) {
      sum = sum + data?.detail_order[i].quantity_order * data?.detail_order[i].product_id.price
    }
    setTotalPrice(sum)
  },[data])

  useEffect(() => {
    dispatch(actions.getOneOrder.getOneOrderRequest(id));
  }, [dispatch, id]);

  const increaseOrderedValue = (id, value) => {
    const newDetail = data?.detail_order?.map((order) => {
      return order.product_id._id === id
        ? { ...order, quantity_order: value + 1 }
        : order;
    });
    setData((prev) => ({ ...prev, detail_order: newDetail }));
  };

  const decreaseOrderedValue = (id, value) => {
    let newOders;
    if (value < 2) {
      document.getElementById(
        `err-${id}`
      ).innerHTML = `Can not decrease quantity ordered`;
      newOders = data?.detail_order?.map((order) => {
        return order.product_id._id === id
          ? { ...order, quantity_order: 1 }
          : order;
      });
      setData((prev) => ({ ...prev, detail_order: newOders }));
    } else {
      newOders = data?.detail_order?.map((order) => {
        return order.product_id._id === id
          ? { ...order, quantity_order: value - 1 }
          : order;
      });
      setData((prev) => ({ ...prev, detail_order: newOders }));
      document.getElementById(`err-${id}`).innerHTML = ``;
    }
  };

  const handerDelete = (id) => {
    const deteledOrder = data?.detail_order?.find(
      (item) => item.product_id._id === id
    );
    const newDetail = data?.detail_order?.filter(
      (item) => item.product_id._id !== deteledOrder.product_id._id
    );  
    setData((prev) => ({ ...prev, detail_order: newDetail }));
  };
  
  const handerBack = () => {
    navigate(-1)
  }

  const onSubmit = (e) => {
    e.preventDefault();
    updateOrder(data).then(()=> {
      navigate('/dashboard/order');
    })
  };

  return (
    <>
      <h1 className="text-primary">Order {id}</h1>
      <div className="row">
        <div className="col-md-12">
          <form onSubmit={onSubmit}>
            <div className="row g-3 mt-1">
              {data?.detail_order?.map((item) => {
                return (
                  <div className="col-md-7" key={item._id}>
                    <div
                      className="d-flex align-items-center position-relative"
                      data-id={`detail-menu-${item.product_id._id}`}
                    >
                      <div className="row">
                        <div className="col-md-12 d-flex align-items-center position-relative">
                          <img
                            style={{ width: "80px", height: "80px" }}
                            className="flex-shrink-0 img-fluid rounded"
                            src={`http://${item.product_id.photo_url}`}
                            alt="img_menu"
                          />
                          <div className="w-100 d-flex flex-column text-start ps-3">
                            <h5 className="d-flex justify-content-between border-bottom pb-2">
                              <span className="text-primary">
                                {item.product_id.name}
                              </span>
                              <span className="text-primary">
                                ${item.product_id.price}
                              </span>
                            </h5>
                            <span>{item.product_id.category}</span>
                          </div>
                        </div>
                        <div className="d-flex flex-column">
                          <div className="row">
                            <div className="col-md-6 col-sm-4"></div>
                            <div className="col-md-6 col-sm-8 d-flex justify-content-between align-items-center">
                              <i
                                className="fa fa-minus-square text-primary cursor-pointer"
                                onClick={() =>
                                  decreaseOrderedValue(
                                    item.product_id._id,
                                    item.quantity_order
                                  )
                                }
                              ></i>
                              <input
                                type="text"
                                readOnly={true}
                                className="w-10 text-center"
                                value={item.quantity_order}
                              />
                              <i
                                className="fa fa-plus-square text-primary cursor-pointer"
                                onClick={() =>
                                  increaseOrderedValue(
                                    item.product_id._id,
                                    item.quantity_order
                                  )
                                }
                              ></i>
                              <div className="text-end w-50">
                                <span style={{ fontWeight: "bold" }}>
                                  Total:{" "}
                                  {item.quantity_order * item.product_id.price}{" "}
                                  $
                                </span>
                              </div>
                              <div className="cursor-pointer">
                                <i
                                  className="bi bi-x-circle-fill text-primary"
                                  onClick={() =>
                                    handerDelete(item.product_id._id)
                                  }
                                ></i>
                              </div>
                            </div>
                            <h6
                              className="d-flex w-100 err text-danger justify-content-end"
                              id={`err-${item.product_id._id}`}
                            >
                              {null}
                            </h6>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
              <div className="col-md-7">
                <div className="form-floating">
                    <select className="form-select" required id="select1"
                        value={data?.role || ''}
                        onChange={(e) => setData({ ...data, role: e.target.value })}
                    >
                      <option value="PREPARE">PREPARE</option>
                      <option value="COMPLETE">COMPLETE</option>
                      <option value="PAYED">PAYED</option>
                    </select>
                    <label htmlFor="select1">Status</label>
                  </div>
              </div>
              <h4 className="col-12">Total price: {totalPrice}</h4>
              <div className="col-4">
                <button
                  className="btn btn-primary w-50 py-3 mr-5"
                  type="submit"
                >
                  Edit Order
                </button>
              </div>
              <div className="col-4">
                <button
                  onClick={handerBack}
                  className="btn btn-danger w-50 py-3"
                >
                  Cancel
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default EditOrder;
