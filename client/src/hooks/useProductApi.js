import api from '../api/api';
import { useQuery, useMutation, useQueryClient } from 'react-query';
import { jsonToQueryParams } from '../helpers/wordhelper';

const apiUrl = '/products';

const fetchProducts = async (category_name = '', price = '') => {
    const { data } = await api.get(`${apiUrl}?category_name=${category_name}&price=${price}`);
    return data;
};

const fetchProductById = async (id) => {
    const { data } = await api.get(`${apiUrl}/${id}`);
    return data;
};

const createProduct = async (newProduct) => {
    const { data } = await api.post(apiUrl, newProduct);
    return data;
};

const updateProduct = async ({ id, updatedProduct }) => {
    const { data } = await api.put(`${apiUrl}/${id}`, updatedProduct);
    return data;
};

const deleteProduct = async (id) => {
    const { data } = await api.delete(`${apiUrl}/${id}`);
    return data;
};


const uploadImages = async ({ id, images }) => {
    const response = await api.post(`${apiUrl}/upload/${id}`, images, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    });

    return response.data;
};

// Fetch all products
export const useProducts = (category_name = '', price = '') => {
    return useQuery(['products', category_name, price], () => fetchProducts(category_name, price));
};

// Fetch a single product by ID
export const useProduct = (id) => {
    return useQuery(['product', id], () => fetchProductById(id), {
        enabled: !!id,
    });
};

// Create a new product
export const useCreateProduct = () => {
    const queryClient = useQueryClient();
    return useMutation(createProduct, {
        onSuccess: () => {
            queryClient.invalidateQueries(['products']);
        },
    });
};

// Update an existing product
export const useUpdateProduct = () => {
    const queryClient = useQueryClient();
    return useMutation(({ id, updatedProduct }) => updateProduct({ id, updatedProduct }), {
        onSuccess: (data) => {
            queryClient.invalidateQueries(['products']);
            queryClient.invalidateQueries(['product', data._id]);
        },
    });
};

// Delete a product
export const useDeleteProduct = () => {
    const queryClient = useQueryClient();
    return useMutation(deleteProduct, {
        onSuccess: () => {
            queryClient.invalidateQueries(['products']);
        },
    });
};

export const useImageUpload = () => {
    return useMutation(({ id, images }) => uploadImages({ id, images }))
};
