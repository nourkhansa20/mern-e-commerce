import api from '../api/api';

const addressUrl = '/addresses';

export const fetchAddresses = async () => {
    const { data } = await api.get(addressUrl);
    return data;
};

export const fetchAddressById = async (id) => {
    const { data } = await api.get(`${addressUrl}/${id}`);
    return data;
};

export const createAddress = async (newAddress) => {
    const { data } = await api.post(addressUrl, newAddress);
    return data;
};

export const updateAddress = async ({ id, updatedAddress }) => {
    const { data } = await api.put(`${addressUrl}/${id}`, updatedAddress);
    return data;
};

export const deleteAddress = async (id) => {
    const { data } = await api.delete(`${addressUrl}/${id}`);
    return data;
};
