import axiosClient from '../interceptors';

const ProductTypesService = {
  getAll: async () => {
    const { data: responseResults } = await axiosClient.get('/api/product-types');
    return responseResults.data;
  },

  create: async (formData) => {
    const path = '/api/product-types/create';
    const { data: responseResults } = await axiosClient.post(path, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return responseResults.data;
  },

  update: async (productTypeId, formData) => {
    const path = `/api/product-types/update/${productTypeId}`;
    const { data: responseResults } = await axiosClient.patch(path, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return responseResults.data;
  },

  delete: async (productTypeId) => {
    await axiosClient.delete(`/api/product-types/delete/${productTypeId}`);
    return null;
  },
};

export default ProductTypesService;
