import axiosClient from '../interceptors';

const CarouselsService = {
  getAll: async () => {
    const { data: responseResults } = await axiosClient.get('/api/carousels');
    return responseResults.data;
  },

  create: async (formData) => {
    const { data: responseResults } = await axiosClient.post('/api/carousels/create', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return responseResults.data;
  },

  update: async (carouselId, formData) => {
    const path = `/api/carousels/update/${carouselId}`;
    const { data: responseResults } = await axiosClient.patch(path, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return responseResults.data;
  },

  delete: async (carouselId) => {
    await axiosClient.delete(`/api/carousels/delete/${carouselId}`);
    return null;
  },
};

export default CarouselsService;
