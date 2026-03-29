import axios from 'axios';
const BASE = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
export const getProducts = (search='', category='') =>
  axios.get(`${BASE}/products?search=${search}&category=${category}`);
export const getProduct = (id) => axios.get(`${BASE}/products/${id}`);
export const getCart = () => axios.get(`${BASE}/cart`);
export const addToCart = (product_id, quantity=1) =>
  axios.post(`${BASE}/cart`, { product_id, quantity });
export const updateCart = (id, quantity) =>
  axios.patch(`${BASE}/cart/${id}`, { quantity });
export const removeFromCart = (id) => axios.delete(`${BASE}/cart/${id}`);
export const placeOrder = (address, cart) =>
  axios.post(`${BASE}/orders`, { address, cart });
