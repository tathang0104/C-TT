import { INIT_STATE } from '../../constant';
import { getType, createOrder, getAllOrders, searchOrder, getOneOrder, updateOrder, deleteOrder, getSelfOrders } from '../actions'

export default function productsReducers(state = INIT_STATE.order, action) {
  switch (action.type) {
    case getType(getOneOrder.getOneOrderRequest):
      return {
        ...state,
        isLoading: true,
      };
    case getType(getOneOrder.getOneOrderSuccess):
      // console.log(action.payload.data)
      return {
        ...state,
        isLoading: true,
        currentData: action.payload.data,
      };
    case getType(getOneOrder.getOneOrderFailure):
      return {
        ...state,
        isLoading: false,
        currentData: null,
      };
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
    case getType(getSelfOrders.getSelfOrdersRequest):
      return {
        ...state,
        isLoading: true,
      };
    case getType(getSelfOrders.getSelfOrdersSuccess):
      return {
        ...state,
        isLoading: false,
        selfData: action.payload.data,
        totalPageSelfOrder: action.payload.totalPage, 
      };
    case getType(getSelfOrders.getSelfOrdersFailure):
      return {
        ...state,
        isLoading: false,
      };
    case getType(searchOrder.searchOrderRequest):
      return {
        ...state,
        isLoading: true,
      };
    case getType(searchOrder.searchOrderSuccess):
      return {
        ...state,
        isLoading: false,
        data: action.payload.data,
        totalPageOrder: action.payload.totalPage, 
      };
    case getType(searchOrder.searchOrderFailure):
      return {
        ...state,
        isLoading: false,
      };
    case getType(createOrder.createOrderSuccess):
      return {
        ...state,
        data: [...state.data, action.payload],
      };
    case getType(updateOrder.updateOrderSuccess):
      return {
        ...state,
        data: state.data.map((order) =>
          order._id === action.payload._id ? action.payload : order
        ),
      };
    case getType(deleteOrder.deleteOrderSuccess):
      return {
        ...state,
        data: state.data.filter((order) =>
          order._id === action.payload
        ),
      };
    default:
      return state;
  }
}
