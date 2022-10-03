
//users
export const usersState = (state) => state.users.data;
export const currentUser = (state) => state.users.currentData;
export const currentUserLogined = (state) => state.users.currentUserLogined;
export const currentUserLoginedToken = (state) => state.users.currentUserLoginedToken;
export const totalPageUser = (state) => state.users.totalPageUser;

//products
export const productsState = (state) => state.products.data;
export const currentProduct = (state) => state.products.currentData;
export const totalPage = (state) => state.products.totalPage;

//products
export const ordersState = (state) => state.orders.data;
export const currentOrder = (state) => state.orders.currentData;
export const selfOrder = (state) => state.orders.selfData;