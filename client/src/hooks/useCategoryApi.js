import api from '../api/api';
import { useQuery, useMutation, useQueryClient } from 'react-query';

const apiUrl = '/categories';

const fetchCategories = async () => {
    const { data } = await api.get(apiUrl);
    return data;
};

const fetchCategoryById = async (id) => {
    const { data } = await api.get(`${apiUrl}/${id}`);
    return data;
};

const createCategory = async (newCategory) => {
    const { data } = await api.post(apiUrl, newCategory);
    return data;
};

const updateCategory = async ({ id, updatedCategory }) => {
    const { data } = await api.put(`${apiUrl}/${id}`, updatedCategory);
    return data;
};

const deleteCategory = async (id) => {
    const { data } = await api.delete(`${apiUrl}/${id}`);
    return data;
};


// Fetch all categories
export const useCategories = () => {
    return useQuery(['categories'], fetchCategories);
};

// Fetch a single category by ID
export const useCategory = (id) => {
    return useQuery(['category', id], () => fetchCategoryById(id), {
        enabled: !!id, // Only run query if id is provided
    });
};

// Create a new category
export const useCreateCategory = () => {
    const queryClient = useQueryClient();
    return useMutation(createCategory, {
        onSuccess: () => {
            queryClient.invalidateQueries(['categories']);
        },
    });
};

// Update an existing category
export const useUpdateCategory = () => {
    const queryClient = useQueryClient();
    return useMutation(({ id, updatedCategory }) => updateCategory({ id, updatedCategory }), {
        onSuccess: (data) => {
            queryClient.invalidateQueries(['categories']);
            queryClient.invalidateQueries(['category', data._id]);
        },
    });
};

// Delete a category
export const useDeleteCategory = () => {
    const queryClient = useQueryClient();
    return useMutation(deleteCategory, {
        onSuccess: () => {
            queryClient.invalidateQueries(['categories']);
        },
    });
};
