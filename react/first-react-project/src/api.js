import axios from "axios";

const API = "http://localhost:5000/api";

export const fetchProducts = () => axios.get(`${API}/products`);
export const addProduct = (product) => axios.post(`${API}/products`, product);
export const addToCart = (item) => axios.post(`${API}/cart`, item);
export const fetchCart = () => axios.get(`${API}/cart`);
