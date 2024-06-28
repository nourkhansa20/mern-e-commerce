import { useQuery, useMutation, useQueryClient } from 'react-query';
import api from '../api/api';
import { addItemToLocalStorage, getItemToLocalStorage } from '../helpers/localStorageHelper';

const apiUrl = '/users';

const fetchUsers = async () => {
    const { data } = await api.get(apiUrl);
    return data;
};

const fetchUserById = async (id) => {
    const { data } = await api.get(`${apiUrl}/${id}`);
    return data;
};

const createUser = async (newUser) => {
    const { data } = await api.post(apiUrl, newUser);
    return data;
};

const updateUser = async ({ id, updatedUser }) => {
    const { data } = await api.put(`${apiUrl}/${id}`, updatedUser);
    return data;
};

const deleteUser = async (id) => {
    const { data } = await api.delete(`${apiUrl}/${id}`);
    return data;
};

export const useUsers = () => {
    return useQuery(['users'], fetchUsers);
};

export const useUser = (id) => {
    return useQuery(['user', id], () => fetchUserById(id), {
        enabled: !!id,
    });
};

export const useCreateUser = () => {
    const queryClient = useQueryClient();
    return useMutation(createUser, {
        onSuccess: () => {
            queryClient.invalidateQueries(['users']);
        },
    });
};

export const useUpdateUser = () => {
    const queryClient = useQueryClient();
    return useMutation(({ id, updatedUser }) => updateUser({ id, updatedUser }), {
        onSuccess: (data) => {
            queryClient.invalidateQueries(['users']);
            queryClient.invalidateQueries(['user']);
        },
        onError: (err) => {
            // return err
        }
    });
};

export const useDeleteUser = () => {
    const queryClient = useQueryClient();
    return useMutation(deleteUser, {
        onSuccess: () => {
            queryClient.invalidateQueries(['users']);
        },
    });
};
