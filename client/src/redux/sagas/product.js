import { takeLatest, call, put } from 'redux-saga/effects';
import * as actions from '../actions';
import * as api from '../../api';

function* fetchProductsSaga(action) {
  try {
    const payload = action?.payload ? action?.payload : {page: 1, size: 10, category: '', search: ''}
    const products = yield call(api.fetchProducts, payload);
    yield put(actions.getProducts.getProductsSuccess(products.data));
  } catch (err) {
    console.error(err);
    yield put(actions.getProducts.getProductsFailure(err));
  }
}

function* searchProductSaga(action) {
  try {
    const payload = action?.payload 
    const products = yield call(api.searchProduct, payload);
    yield put(actions.searchProduct.searchProductSuccess(products.data));
  } catch (err) {
    console.error(err);
    yield put(actions.searchProduct.searchProductFailure(err));
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
    yield call(api.deleteProduct, action.payload );
    yield fetchProductsSaga()
  } catch (err) {
    console.error(err);
    yield put(actions.deleteProduct.deleteProductFailure(err));
  }
}

function* ProductSaga() {
  yield takeLatest(actions.getType(actions.getProducts.getProductsRequest) , fetchProductsSaga);
  yield takeLatest(actions.getType(actions.searchProduct.searchProductRequest) , searchProductSaga);
  yield takeLatest(actions.getType(actions.getOneProduct.getOneProductRequest) , fetchOneProductSaga);
  yield takeLatest(actions.getType(actions.createProduct.createProductRequest), createProductSaga);
  yield takeLatest(actions.getType(actions.updateProduct.updateProductRequest), updateProductSaga);
  yield takeLatest(actions.getType(actions.deleteProduct.deleteProductRequest), deleteProductSaga);
}


export default ProductSaga;
