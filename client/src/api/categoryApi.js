
import api from "./api";

export const fetchAllCategories = (config) =>
    api.get(`https://fakestoreapi.com/products/categories`, config).then((res) => res.data);


