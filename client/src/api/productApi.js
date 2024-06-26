import api from "./api";

export const fetchAllProducts = (config) =>
    api.get(`products`, config).then((res) => res.data);

export const fetchProduct = (product_id, config) =>
    api.get(`products/${product_id}`, config).then((res) => res.data);


export const fetchProductsByCategory = (category, config) =>
    api.get(`products/category/${category}`, config).then((res) => res.data);

