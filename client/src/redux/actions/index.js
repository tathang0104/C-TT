import { createActions } from 'redux-actions';

export const getType = (reduxAction) => {
  return reduxAction().type;
};

// User actions
export const login = createActions({
  loginRequest: (payload) => payload,
  loginSuccess: (payload) => payload,
  loginFailure: (err) => err,
});

export const logout = createActions({
  logoutRequest: undefined,
  logoutSuccess: (payload) => payload,
  logoutFailure: (err) => err,
});

export const createUser = createActions({
  createUserRequest: (payload) => payload,
  createUserSuccess: (payload) => payload,
  createUserFailure: (err) => err,
});

export const getProfile = createActions({
  getProfileRequest: (payload) => payload,
  getProfileSuccess: (payload) => payload,
  getProfileFailure: (err) => err,
});

export const getOneUser = createActions({
  getOneUserRequest: undefined,
  getOneUserSuccess: (payload) => payload,
  getOneUserFailure: (err) => err,
});

export const getAllUsers = createActions({
  getAllUsersRequest: (payload) => payload,
  getAllUsersSuccess: (payload) => payload,
  getAllUsersFailure: (err) => err,
});

export const updateProfileUser = createActions({
  updateProfileUserRequest: (payload) => payload,
  updateProfileUserSuccess: (payload) => payload,
  updateProfileUserFailure: (err) => err,
});

export const deleteUser = createActions({
  deleteUserRequest: (payload) => payload,
  deleteUserSuccess: (payload) => payload,
  deleteUserFailure: (err) => err,
});

// Product actions
export const getOneProduct = createActions({
  getOneProductRequest: undefined,
  getOneProductSuccess: (payload) => payload,
  getOneProductFailure: (err) => err,
});

export const getProducts = createActions({
  getProductsRequest: (payload) => payload,
  getProductsSuccess: (payload) => payload,
  getProductsFailure: (err) => err,
});

export const searchProduct = createActions({
  searchProductRequest: (payload) => payload,
  searchProductSuccess: (payload) => payload,
  searchProductFailure: (err) => err,
});

export const createProduct = createActions({
  createProductRequest: (payload) => payload,
  createProductSuccess: (payload) => payload,
  createProductFailure: (err) => err,
});

export const updateProduct = createActions({
  updateProductRequest: (payload) => payload,
  updateProductSuccess: (payload) => payload,
  updateProductFailure: (err) => err,
});

export const deleteProduct = createActions({
  deleteProductRequest: (payload) => payload,
  deleteProductSuccess: (payload) => payload,
  deleteProductFailure: (err) => err,
});

// OrderedMenu

// export const sendMailOrder = createActions({
//   sendMailOrderRequest: (payload) => payload,
//   sendMailOrderSuccess: (payload) => payload,
//   sendMailOrderFailure: (err) => err,
// });

export const getAllOrders = createActions({
  getAllOrdersRequest: (payload) => payload,
  getAllOrdersSuccess: (payload) => payload,
  getAllOrdersFailure: (err) => err,
});

export const createOrder = createActions({
  createOrderRequest: (payload) => payload,
  createOrderSuccess: (payload) => payload,
  createOrderFailure: (err) => err,
});