import axios from 'axios';

const axiosClient = axios.create({
  baseURL: process.env.REACT_APP_BACKEND_BASE_URL,
});

axiosClient.interceptors.request.use(
  (config) => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user?.access_token) {
      config.headers['x-access-token'] = user.access_token;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);
export default axiosClient;
