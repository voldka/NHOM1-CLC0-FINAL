import axiosClient from '../interceptors';

export const StatisticService = {
  getStatistics: async (filterOptions) => {
    const { data: responseResults } = await axiosClient.get('/api/statistic', {
      params: filterOptions,
    });
    return responseResults.data;
  },
};
