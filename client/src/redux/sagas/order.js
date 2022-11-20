import { takeLatest, call, put } from 'redux-saga/effects';
import * as actions from '../actions';
import * as api from '../../api';

function* fetchAllOrderSaga(action) {
  try {
    const payload = action?.payload
    const orders = yield call(api.getAllOrders, payload);
    yield put(actions.getAllOrders.getAllOrdersSuccess(orders.data));
  } catch (err) {
    console.error(err);
    yield put(actions.getAllOrders.getAllOrdersFailure(err));
  }
}

function* fetchSelfOrderSaga(action) {
  try {
    const payload = action?.payload
    const orders = yield call(api.getSelfOrders, payload);
    yield put(actions.getSelfOrders.getSelfOrdersSuccess(orders.data));
  } catch (err) {
    console.error(err);
    yield put(actions.getSelfOrders.getSelfOrdersFailure(err));
  }
}

function* searchOrderSaga(action) {
  try {
    const payload = action?.payload ? action?.payload : {page: 1, size: 5, search: ''}
    const orders = yield call(api.searchOrder, payload);
    yield put(actions.searchOrder.searchOrderSuccess(orders.data));
  } catch (err) {
    console.error(err);
    yield put(actions.searchOrder.searchOrderFailure(err));
  }
}

function* fetchOneOrderSaga(action) {
  try {
    const order = yield call(api.fetchOneOrder, action.payload);
    yield put(actions.getOneOrder.getOneOrderSuccess(order.data));
  } catch (err) {
    console.error(err);
    yield put(actions.getOneOrder.getOneOrderFailure(err));
  }
}

function* createOrderSaga(action) {
  try {
    
    const order = yield call(api.createOrder, action.payload);
    yield put(actions.createOrder.createOrderSuccess(order.data));
  } catch (err) {
    console.error(err);
    yield put(actions.createOrder.createOrderFailure(err));
  }
}

function* updateOrderSaga(action) {
  try {
    const updatedOrder = yield call(api.updateOrder, action.payload);
    yield put(actions.updateOrder.updateOrderSuccess(updatedOrder.data));
  } catch (err) {
    yield put(actions.updateOrder.updateOrderFailure(err));
  }
}

function* deleteOrderSaga(action) {
  try {
    yield call(api.deleteOrder, action.payload );
    yield searchOrderSaga()
  } catch (err) {
    console.error(err);
    yield put(actions.deleteOrder.deleteOrderFailure(err));
  }
}

function* OrderSaga() {
  yield takeLatest(actions.getType(actions.getAllOrders.getAllOrdersRequest) , fetchAllOrderSaga);
  yield takeLatest(actions.getType(actions.getSelfOrders.getSelfOrdersRequest) , fetchSelfOrderSaga);
  yield takeLatest(actions.getType(actions.searchOrder.searchOrderRequest) , searchOrderSaga);
  yield takeLatest(actions.getType(actions.getOneOrder.getOneOrderRequest) , fetchOneOrderSaga);
  yield takeLatest(actions.getType(actions.createOrder.createOrderRequest), createOrderSaga);
  yield takeLatest(actions.getType(actions.updateOrder.updateOrderRequest), updateOrderSaga);
  yield takeLatest(actions.getType(actions.deleteOrder.deleteOrderRequest), deleteOrderSaga);
}


export default OrderSaga;
