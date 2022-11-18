import axios from 'axios';

const URL = '/api';
const User_URL = `${URL}/auth`;
const Product_URL = `${URL}/product`;
// const Client_URL = `${URL}/client`;
const Order_URL = `${URL}/order`;
const Vote_URL = `${URL}/vote`;
const Comment_URL = `${URL}/comment`;

const config = {
  headers: {
    "Content-Type": "application/json",
  },
};

// const configAuth = {
//   headers: {
//     "Content-Type": "application/json",
//     Authorization: `Bearer ${localStorage.getItem("authToken")}`,
//   }
// }

//Auth
export const login = (payload) => axios.post(`${User_URL}/login`, payload, config);

export const register = (payload) => axios.post(`${User_URL}/register`, payload, config);

export const getProfile = (payload) => axios.get(`${User_URL}/getprofile`, {
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${payload}`,
  },
});

//dashboard
export const dashboard = () => axios.get(`${URL}/private`, {
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${localStorage.getItem("authToken")}`,
  }
});

// User
export const fetchAllUsers = (payload) => axios.get(`${User_URL}?page=${payload.page}&size=${payload.size}&search=${payload.search}`, {
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${localStorage.getItem("authToken")}`,
  }
})


export const fetchOneUser = (payload) => axios.get(`${User_URL}/${payload}`, {
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${localStorage.getItem("authToken")}`,
  }
});

export const createUser = (payload) => axios.post(`${User_URL}/create`, payload, {
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${localStorage.getItem("authToken")}`,
  }
});

export const updateUser = (payload) => axios.put(`${User_URL}/updateprofile/${payload.get('_id')}`, payload, {
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${localStorage.getItem("authToken")}`,
  }
});

export const deleteUser = (id) => axios.delete(`${User_URL}/delete/${id}`, {
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${localStorage.getItem("authToken")}`,
  }
});


// Product
export const fetchProducts = (payload) => axios.get(`${Product_URL}?page=${payload.page}&size=${payload.size}&category=${payload.category}`, {
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${localStorage.getItem("authToken")}`,
  }
});

export const searchProduct = (payload) => axios.get(`${Product_URL}/search/?page=${payload.page}&size=${payload.size}&category=${payload.category}&search=${payload.search}`);

export const fetchOneProduct = (payload) => axios.get(`${Product_URL}/${payload}`, {
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${localStorage.getItem("authToken")}`,
  }
});

export const createProduct = (payload) => axios.post(`${Product_URL}/create`, payload, {
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${localStorage.getItem("authToken")}`,
  }
});

export const updateProduct = (payload) => axios.put(`${Product_URL}/update/${payload.get('_id')}`, payload, {
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${localStorage.getItem("authToken")}`,
  }
});

export const deleteProduct = (id) => axios.delete(`${Product_URL}/delete/${id}`, {
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${localStorage.getItem("authToken")}`,
  }
});

//orders

// export const sendMailOrder = (payload) => axios.post(`${Client_URL}/bookingtable`, payload, {
//   headers: {
//     "Content-Type": "application/json",
//   }
// });

export const createOrder = (payload) => axios.post(`${Order_URL}/create`, payload, {
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${localStorage.getItem("authToken")}`,
  }
});

export const getAllOrders = (payload) => axios.get(`${Order_URL}?page=${payload.page}&size=${payload.size}`, {
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${localStorage.getItem("authToken")}`,
  }
});

export const getSelfOrders = (payload) => axios.get(`${Order_URL}/getselforder?page=${payload.page}&size=${payload.size}`, {
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${localStorage.getItem("authToken")}`,
  }
});

export const searchOrder = (payload) => axios.get(`${Order_URL}/search?page=${payload.page}&size=${payload.size}&search=${payload.search}`, {
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${localStorage.getItem("authToken")}`,
  }
});

export const fetchOneOrder = (payload) => axios.get(`${Order_URL}/viewoder/${payload}`, {
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${localStorage.getItem("authToken")}`,
  }
});

export const updateOrder = (payload) => axios.put(`${Order_URL}/update/${payload._id}`, payload, {
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${localStorage.getItem("authToken")}`,
  }
});

export const deleteOrder = (id) => axios.delete(`${Order_URL}/delete/${id}`, {
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${localStorage.getItem("authToken")}`,
  }
});

// vote on product

export const getVoteById = (id) => axios.get(`${Vote_URL}/${id}`, {
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${localStorage.getItem("authToken")}`,
  }
});

//comment on product

export const getCommentById = (id) => axios.get(`${Comment_URL}/${id}`, {
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${localStorage.getItem("authToken")}`,
  }
});
