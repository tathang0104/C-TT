import { INIT_STATE } from '../../constant';
import { getProducts, searchProduct, getType, createProduct, updateProduct, getOneProduct, deleteProduct } from '../actions'

export default function productsReducers(state = INIT_STATE.product, action) {
  switch (action.type) {
    case getType(getOneProduct.getOneProductRequest):
      return {
        ...state,
        isLoading: true,
      };
    case getType(getOneProduct.getOneProductSuccess):
      return {
        ...state,
        isLoading: true,
        currentData: action.payload.data,
      };
    case getType(getOneProduct.getOneProductFailure):
      return {
        ...state,
        isLoading: false,
        currentData: null,
      };
    case getType(getProducts.getProductsRequest):
      return {
        ...state,
        isLoading: true,
      };
    case getType(getProducts.getProductsSuccess):
      return {
        ...state,
        isLoading: false,
        data: action.payload.data,
        totalPage: action.payload.totalPage, 
      };
    case getType(getProducts.getProductsFailure):
      return {
        ...state,
        isLoading: false,
      };
    case getType(searchProduct.searchProductRequest):
      return {
        ...state,
        isLoading: true,
      };
    case getType(searchProduct.searchProductSuccess):
      return {
        ...state,
        isLoading: false,
        data: action.payload.data,
        totalPage: action.payload.totalPage, 
      };
    case getType(searchProduct.searchProductFailure):
      return {
        ...state,
        isLoading: false,
      };
    case getType(createProduct.createProductSuccess):
      return {
        ...state,
        data: [...state.data, action.payload],
      };
    case getType(updateProduct.updateProductSuccess):
      return {
        ...state,
        data: state.data.map((product) =>
          product._id === action.payload._id ? action.payload : product
        ),
      };
    case getType(deleteProduct.deleteProductSuccess):
      return {
        ...state,
        data: state.data.filter((product) =>
          product._id === action.payload
        ),
      };
    default:
      return state;
  }
}
