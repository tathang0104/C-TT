import { INIT_STATE } from '../../constant';
import { getType, createOrder, getAllOrders } from '../actions'

export default function productsReducers(state = INIT_STATE.order, action) {
  switch (action.type) {
    // case getType(getOneProduct.getOneProductRequest):
    //   return {
    //     ...state,
    //     isLoading: true,
    //   };
    // case getType(getOneProduct.getOneProductSuccess):
    //   return {
    //     ...state,
    //     isLoading: true,
    //     currentData: action.payload.data,
    //   };
    // case getType(getOneProduct.getOneProductFailure):
    //   return {
    //     ...state,
    //     isLoading: false,
    //     currentData: null,
    //   };
    case getType(getAllOrders.getAllOrdersRequest):
      return {
        ...state,
        isLoading: true,
      };
    case getType(getAllOrders.getAllOrdersSuccess):
      return {
        ...state,
        isLoading: false,
        data: action.payload.data,
      };
    case getType(getAllOrders.getAllOrdersFailure):
      return {
        ...state,
        isLoading: false,
      };
    // case getType(searchProduct.searchProductRequest):
    //   return {
    //     ...state,
    //     isLoading: true,
    //   };
    // case getType(searchProduct.searchProductSuccess):
    //   return {
    //     ...state,
    //     isLoading: false,
    //     data: action.payload.data,
    //   };
    // case getType(searchProduct.searchProductFailure):
    //   return {
    //     ...state,
    //     isLoading: false,
    //   };
    case getType(createOrder.createOrderSuccess):
      return {
        ...state,
        data: [...state.data, action.payload],
      };
    // case getType(updateOrder.updateOrderSuccess):
    //   return {
    //     ...state,
    //     data: state.data.map((order) =>
    //       order._id === action.payload._id ? action.payload : order
    //     ),
    //   };
    // case getType(deleteOrder.deleteOrderSuccess):
    //   return {
    //     ...state,
    //     data: state.data.filter((order) =>
    //       order._id === action.payload
    //     ),
    //   };
    default:
      return state;
  }
}
