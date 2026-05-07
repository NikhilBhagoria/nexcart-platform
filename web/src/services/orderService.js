import { useApi } from '../hooks/useApi';

export const useOrderService = () => {
    const { get, post, loading, error } = useApi();

    const createOrder = async (orderData) => {
        return await post('/orders', orderData);
    };

    const fetchUserOrders = async () => {
        return await get('/orders');
    };

    return { createOrder, fetchUserOrders, loading, error };
};
