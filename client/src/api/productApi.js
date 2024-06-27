import axios from "axios";
import api from "./api";

export const fetchAllProducts = (config) =>
    axios.get(`https://fakestoreapi.com/products`, config).then((res) => res.data);

export const fetchProduct = (product_id, config) =>
    axios.get(`https://fakestoreapi.com/products/${product_id}`, config).then((res) => res.data);


export const fetchProductsByCategory = (category, config) =>
    axios.get(`https://fakestoreapi.com/products/category/${category}`, config).then((res) => res.data);

