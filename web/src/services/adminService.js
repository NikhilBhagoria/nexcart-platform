import { useApi } from '../hooks/useApi';

export const useAdminService = () => {
    const { post, put, del, loading, error } = useApi();

    const createProduct = async (productData) => {
        return await post('/products', productData);
    };

    const updateProduct = async (id, productData) => {
        return await put(`/products/${id}`, productData);
    };

    const deleteProduct = async (id) => {
        return await del(`/products/${id}`);
    };

    return { createProduct, updateProduct, deleteProduct, loading, error };
};
