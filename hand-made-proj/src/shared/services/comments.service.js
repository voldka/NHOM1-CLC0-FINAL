import axiosClient from '../interceptors';

const CommentsService = {
  getCommentsByProductId: async (productId) => {
    const { data: responseResults } = await axiosClient.get(`/api/comment/products/${productId}`);
    return responseResults.data;
  },

  create: async (data) => {
    const path = '/api/comment/create';
    const { data: responseResults } = await axiosClient.post(path, data);
    return responseResults.data;
  },

  update: async (commentId, data) => {
    const path = `/api/comment/update/${commentId}`;
    const { data: responseResults } = await axiosClient.patch(path, data);
    return responseResults.data;
  },

  remove: async (commentId) => {
    await axiosClient.delete(`/api/comment/remove/${commentId}`);
    return null;
  },
};

export default CommentsService;
