import axiosClient from '../interceptors';

const UserService = {
  getAllUsers: async () => {
    const { data: responseResults } = await axiosClient.get('/api/user/getAll');
    return responseResults.data;
  },

  updateUser: async (userId, data) => {
    const { data: responseResults } = await axiosClient.put(
      `/api/user/update-user/${userId}`,
      data,
    );
    return responseResults.data;
  },

  deleteUser: async (userId) => {
    await axiosClient.delete(`/api/user/delete-user/${userId}`);
    return null;
  },
};

export default UserService;
