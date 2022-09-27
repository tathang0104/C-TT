import axios from 'axios';

const URL = 'http://localhost:5000/api';
const Product_URL = `${URL}/product`;
const User_URL = `${URL}/auth`;

const config = {
  headers: {
    "Content-Type": "application/json",
  },
};

const configAuth = {
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${localStorage.getItem("authToken")}`,
  }
}

//Auth
export const login = (payload) => axios.post(`${User_URL}/login`, payload, config);

export const getProfile = (payload) => axios.get(`${User_URL}/getprofile`, {
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${payload}`,
  },
});

//dashboard
// export const getPrivateData = () => axios.get(`${User_URL}/getprofile`, configAuth);

// User
export const fetchAllUsers = () => axios.get(`${User_URL}`, {
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


