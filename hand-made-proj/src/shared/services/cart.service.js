import axiosClient from '../interceptors';

const CartService = {
  getCartByUserId: async (userId) => {
    const { data: responseResults } = await axiosClient.get(`/api/cart/users/${userId}`);
    return responseResults.data;
  },

  update: async (userId, data) => {
    const { data: responseResults } = await axiosClient.patch(`/api/cart/users/${userId}`, data);
    return responseResults.data;
  },
};

export default CartService;
