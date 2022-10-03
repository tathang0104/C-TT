import { takeLatest, call, put } from 'redux-saga/effects';
import * as actions from '../actions';
import * as api from '../../api';

function* fetchAllOrderSaga(action) {
  try {
    const payload = action?.payload ? action?.payload : {page: 1, size: 5}
    const orders = yield call(api.getAllOrders, payload);
    yield put(actions.getAllOrders.getAllOrdersSuccess(orders.data));
  } catch (err) {
    console.error(err);
    yield put(actions.getAllOrders.getAllOrdersFailure(err));
  }
}

// function* searchProductSaga(action) {
//   try {
//     const payload = action?.payload 
//     const products = yield call(api.searchProduct, payload);
//     yield put(actions.searchProduct.searchProductSuccess(products.data));
//   } catch (err) {
//     console.error(err);
//     yield put(actions.searchProduct.searchProductFailure(err));
//   }
// }

// function* fetchOneProductSaga(action) {
//   try {
//     const product = yield call(api.fetchOneProduct, action.payload);
//     yield put(actions.getOneProduct.getOneProductSuccess(product.data));
//   } catch (err) {
//     console.error(err);
//     yield put(actions.getOneProduct.getOneProductFailure(err));
//   }
// }

function* createOrderSaga(action) {
  try {
    
    const order = yield call(api.createOrder, action.payload);
    yield put(actions.createOrder.createOrderSuccess(order.data));
    // yield fetchProductsSaga({page:1, size:5});
  } catch (err) {
    console.error(err);
    yield put(actions.createOrder.createOrderFailure(err));
  }
}

// function* updateProductSaga(action) {
//   try {
//     const updatedProduct = yield call(api.updateProduct, action.payload);
//     yield put(actions.updateProduct.updateProductSuccess(updatedProduct.data));
//   } catch (err) {
//     yield put(actions.updateProduct.updateProductFailure(err));
//   }
// }

// function* deleteProductSaga(action) {
//   try {
//     yield call(api.deleteProduct, action.payload );
//     yield fetchProductsSaga()
//   } catch (err) {
//     console.error(err);
//     yield put(actions.deleteProduct.deleteProductFailure(err));
//   }
// }

function* OrderSaga() {
  yield takeLatest(actions.getType(actions.getAllOrders.getAllOrdersRequest) , fetchAllOrderSaga);
//   yield takeLatest(actions.getType(actions.searchProduct.searchProductRequest) , searchProductSaga);
//   yield takeLatest(actions.getType(actions.getOneProduct.getOneProductRequest) , fetchOneProductSaga);
  yield takeLatest(actions.getType(actions.createOrder.createOrderRequest), createOrderSaga);
//   yield takeLatest(actions.getType(actions.updateProduct.updateProductRequest), updateProductSaga);
//   yield takeLatest(actions.getType(actions.deleteProduct.deleteProductRequest), deleteProductSaga);
}


export default OrderSaga;
