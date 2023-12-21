import axiosClient from '../interceptors';

const PromotionsService = {
  getAll: async () => {
    const { data: responseResults } = await axiosClient.get('/api/promotions');
    return responseResults.data;
  },

  create: async (payload) => {
    const { data: responseResults } = await axiosClient.post('/api/promotions/create', payload);
    return responseResults.data;
  },

  update: async (productTypeId, payload) => {
    const path = `/api/promotions/update/${productTypeId}`;
    const { data: responseResults } = await axiosClient.patch(path, payload);
    return responseResults.data;
  },

  remove: async (promotionId) => {
    await axiosClient.delete(`/api/promotions/delete/${promotionId}`);
    return null;
  },
};

export default PromotionsService;
