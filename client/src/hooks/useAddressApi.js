import { useQuery, useMutation, useQueryClient } from 'react-query';
import {
    fetchAddresses,
    fetchAddressById,
    createAddress,
    updateAddress,
    deleteAddress
} from '../api/addressApi';

export const useAddresses = () => {
    return useQuery(['addresses'], fetchAddresses);
};

export const useAddress = (id) => {
    return useQuery(['address', id], () => fetchAddressById(id), {
        enabled: !!id,
    });
};

export const useCreateAddress = () => {
    const queryClient = useQueryClient();
    return useMutation(createAddress, {
        onSuccess: () => {
            queryClient.invalidateQueries(['addresses']);
        },
    });
};

export const useUpdateAddress = () => {
    const queryClient = useQueryClient();
    return useMutation(({ id, updatedAddress }) => updateAddress({ id, updatedAddress }), {
        onSuccess: () => {
            queryClient.invalidateQueries(['addresses']);
            queryClient.invalidateQueries(['address']);
        },
    });
};

export const useDeleteAddress = () => {
    const queryClient = useQueryClient();
    return useMutation(deleteAddress, {
        onSuccess: () => {
            queryClient.invalidateQueries(['addresses']);
        },
    });
};
