import api from "./api";

export const login = (config) =>
    api.post(`auth/login`, config);

