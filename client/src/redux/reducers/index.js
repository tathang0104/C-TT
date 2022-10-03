import { combineReducers } from 'redux';
import users from './user';
import products from './product';
import orders from './order';

export default combineReducers({
  users,
  products,
  orders,
});