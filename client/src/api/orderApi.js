import api from '../api/api';

const orderUrl = '/orders';

export const fetchOrderById = async (orderId) => {
    const { data } = await api.get(`${orderUrl}/${orderId}`);
    return data;
};

export const fetchOrdersByUserId = async (userId) => {
    const { data } = await api.get(`${orderUrl}/user/${userId}`);
    return data;
};

export const createOrder = async (orderData) => {
    const { data } = await api.post(orderUrl, orderData);
    return data;
};

export const updateOrder = async (orderId, orderData) => {
    const { data } = await api.put(`${orderUrl}/${orderId}`, orderData);
    return data;
};

export const deleteOrder = async (orderId) => {
    const { data } = await api.delete(`${orderUrl}/${orderId}`);
    return data;
};
