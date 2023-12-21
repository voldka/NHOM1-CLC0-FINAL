import axiosClient from '../interceptors';

export const OrdersService = {
  createPaymentIntents: async (totalBill) => {
    const { data: responseResults } = await axiosClient.post('/api/order/payment_intents', {
      totalBill,
    });
    return responseResults.data;
  },

  createOrder: async (payload) => {
    const { data: responseResults } = await axiosClient.post('/api/order', payload);
    return responseResults.data;
  },

  getOrdersByUserId: async (userId) => {
    const { data: responseResults } = await axiosClient.get(`/api/order/users/${userId}`);
    return responseResults.data;
  },

  getOrders: async (filterOptions) => {
    const { data: responseResults } = await axiosClient.get('/api/order', {
      params: filterOptions,
    });
    return responseResults.data;
  },

  updateOrder: async (orderId, changes) => {
    const { data: responseResults } = await axiosClient.patch(`/api/order/${orderId}`, changes);
    return responseResults.data;
  },
};
