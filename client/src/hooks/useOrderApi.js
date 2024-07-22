import { useQuery, useMutation, useQueryClient } from 'react-query';
import {
    fetchOrderById,
    fetchOrdersByUserId,
    createOrder,
    updateOrder,
    deleteOrder,
} from '../api/orderApi.js';

export const useOrder = (orderId) => {
    return useQuery(['order', orderId], () => fetchOrderById(orderId), {
        enabled: !!orderId,
    });
};

export const useOrdersByUserId = (userId) => {
    return useQuery(['orders', userId], () => fetchOrdersByUserId(userId), {
        enabled: !!userId,
    });
};

export const useCreateOrder = () => {
    const queryClient = useQueryClient();
    return useMutation(createOrder, {
        onSuccess: () => {
            queryClient.invalidateQueries('orders');
        },
    });
};

export const useUpdateOrder = () => {
    const queryClient = useQueryClient();
    return useMutation(updateOrder, {
        onSuccess: () => {
            queryClient.invalidateQueries('orders');
        },
    });
};

export const useDeleteOrder = () => {
    const queryClient = useQueryClient();
    return useMutation(deleteOrder, {
        onSuccess: () => {
            queryClient.invalidateQueries('orders');
        },
    });
};
