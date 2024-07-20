import api from '../api/api';
import { useQuery, useMutation, useQueryClient } from 'react-query';

const cartUrl = '/cart';

export const fetchCartByUserId = async (userId) => {
    const { data } = await api.get(`${cartUrl}/${userId}`);
    return data;
};

export const addItemToCart = async ({ userId, productId, quantity, price }) => {
    const { data } = await api.post(`${cartUrl}/add`, { userId, productId, quantity, price });
    return data;
};

export const addMultipleItemsToCart = async ({ userId, products }) => {
    const { data } = await api.post(`${cartUrl}/add-multiple`, { userId, products });
    return data;
};

export const updateItemQuantity = async ({ userId, productId, quantity }) => {
    const { data } = await api.put(`${cartUrl}/update`, { userId, productId, quantity });
    return data;
};

export const removeItemFromCart = async ({ userId, productId }) => {
    const { data } = await api.delete(`${cartUrl}/remove`, { data: { userId, productId } });
    return data;
};

const fetchProductInCart = async ({ userId, productId }) => {
    const { data } = await api.get(`${cartUrl}/${userId}/product/${productId}`);
    return data;
};


export const useCart = (userId) => {
    return useQuery(['cart', userId], () => fetchCartByUserId(userId), {
        enabled: !!userId,
    });
};

export const useAddItemToCart = () => {
    const queryClient = useQueryClient();
    return useMutation(addItemToCart, {
        onSuccess: () => {
            // queryClient.invalidateQueries(['cart']);
        },
    });
};

export const useAddMultipleItemsToCart = () => {
    const queryClient = useQueryClient();
    return useMutation(addMultipleItemsToCart, {
        onSuccess: () => {
            // queryClient.invalidateQueries(['cart']);
        },
    });
};

export const useUpdateItemQuantity = () => {
    const queryClient = useQueryClient();
    return useMutation(updateItemQuantity, {
        onSuccess: () => {
            queryClient.invalidateQueries(['cart']);
        },
    });
};

export const useRemoveItemFromCart = () => {
    const queryClient = useQueryClient();
    return useMutation(removeItemFromCart, {
        onSuccess: () => {
            // queryClient.invalidateQueries(['cart']);
        },
    });
};

export const useCheckProductInCart = ({ userId, productId }) => {

    return useQuery(['checkProductInCart', userId, productId], () => fetchProductInCart({ userId, productId }), {
        enabled: !!userId && !!productId, // Only run query if userId and productId are provided
        retry: false, // Disable automatic retries
        refetchOnWindowFocus: false // Disable refetching on window focus
    });
};
