import api from "./api";

export const login = (config) =>
    api.post(`auth/login`, config);


export const checkToken = () =>
    api.post('auth/validate-token')

export function logout() {
    localStorage.removeItem('ACCESS_TOKEN');
    localStorage.removeItem('USER');
}