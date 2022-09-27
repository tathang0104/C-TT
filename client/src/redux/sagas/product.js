import { takeLatest, call, put } from 'redux-saga/effects';
import * as actions from '../actions';
import * as api from '../../api';

function* fetchProductsSaga(action) {
  try {
    const products = yield call(api.fetchProducts, action.payload);
    yield put(actions.getProducts.getProductsSuccess(products.data));
  } catch (err) {
    console.error(err);
    yield put(actions.getProducts.getProductsFailure(err));
  }
}

function* fetchOneProductSaga(action) {
  try {
    const product = yield call(api.fetchOneProduct, action.payload);
    yield put(actions.getOneProduct.getOneProductSuccess(product.data));
  } catch (err) {
    console.error(err);
    yield put(actions.getOneProduct.getOneProductFailure(err));
  }
}

function* createProductSaga(action) {
  try {
    const products = yield call(api.createProduct, action.payload);
    yield put(actions.createProduct.createProductSuccess(products.data));
    // yield fetchProductsSaga({page:1, size:5});
  } catch (err) {
    console.error(err);
    yield put(actions.createProduct.createProductFailure(err));
  }
}

function* updateProductSaga(action) {
  try {
    const updatedProduct = yield call(api.updateProduct, action.payload);
    yield put(actions.updateProduct.updateProductSuccess(updatedProduct.data));
  } catch (err) {
    yield put(actions.updateProduct.updateProductFailure(err));
  }
}

function* deleteProductSaga(action) {
  try {
    const deletedProduct = yield call(api.deleteProduct, action.payload );
    console.log(deletedProduct.data.data._id)
    yield fetchProductsSaga({page: 1, size: 5})
  } catch (err) {
    console.error(err);
    yield put(actions.deleteProduct.deleteProductFailure(err));
  }
}

function* ProductSaga() {
  yield takeLatest(actions.getType(actions.getProducts.getProductsRequest) , fetchProductsSaga);
  yield takeLatest(actions.getType(actions.getOneProduct.getOneProductRequest) , fetchOneProductSaga);
  yield takeLatest(actions.getType(actions.createProduct.createProductRequest), createProductSaga);
  yield takeLatest(actions.getType(actions.updateProduct.updateProductRequest), updateProductSaga);
  yield takeLatest(actions.getType(actions.deleteProduct.deleteProductRequest), deleteProductSaga);
}


export default ProductSaga;
