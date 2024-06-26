
import api from "./api";

export const fetchAllCategories = (config) =>
    api.get(`products/categories`, config).then((res) => res.data);


