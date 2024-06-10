import axiosClient from '../interceptors';
const MaterialService = {
    getAll: async () => {
        const { data: responseResults } = await axiosClient.get('/api/material');
        return responseResults.data;
    },

    create: async (formData) => {
        const path = '/api/material/create';
        const { data: responseResults } = await axiosClient.post(path, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        return responseResults.data;
    },

    update: async (materialid, formData) => {
        const path = `/api/material/update/${materialid}`;
        const { data: responseResults } = await axiosClient.patch(path, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        return responseResults.data;
    },

    delete: async (materialid) => {
        await axiosClient.delete(`/api/material/delete/${materialid}`);
        return null;
    },
};

export default MaterialService;