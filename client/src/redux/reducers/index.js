import { combineReducers } from 'redux';
import users from './user';
import products from './product';
import orders from './order';
import dashboard from './dashboard';

export default combineReducers({
  users,
  products,
  orders,
  dashboard,
});