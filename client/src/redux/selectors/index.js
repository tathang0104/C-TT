
//users
export const usersState = (state) => state.users.data;
export const currentUser = (state) => state.users.currentData;
export const currentUserLogined = (state) => state.users.currentUserLogined;
export const currentUserLoginedToken = (state) => state.users.currentUserLoginedToken;

//products
export const productsState$ = (state) => state.products.data;
export const currentProduct$ = (state) => state.products.currentData;