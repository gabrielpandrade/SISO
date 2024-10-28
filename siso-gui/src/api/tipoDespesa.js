import api from './api';

const API_BASE_URL = '/despesa';

export const fetchDespesa = async () => {
    try {
        const response = await api.get(API_BASE_URL);
        if (response.status !== 200) {
            throw new Error('Failed to fetch despesa');
        }
        console.log(response.data);
        return response.data;
    } catch (error) {
        console.error('Erro ao buscar despesa:', error);
        throw error;
    }
};

export const fetchDespesaById = async (id) => {
    try {
        const response = await api.get(`${API_BASE_URL}/${id}`);
        if (response.status !== 200) {
            throw new Error('Failed to fetch despesa');
        }
        return response.data;
    } catch (error) {
        console.error('Erro ao buscar despesa:', error);
        throw error;
    }
};

export const createDespesa = async (despesa) => {
    try {
        const payload = {
            descricao: despesa.descricao || '',
        };


        const response = await api.post(API_BASE_URL, payload);

        if (response.status !== 201) {
            throw new Error('Failed to create despesa');
        }

        return response.data;
    } catch (error) {
        console.error('Erro ao criar despesa:', error.response?.data || error.message);
        throw error;
    }
};

export const updateDespesa = async (id, despesa) => {
    try {
        const payload = {
            descricao: despesa.descricao || '',
        };

        const response = await api.put(`${API_BASE_URL}/${id}`, payload);

        if (response.status !== 200 && response.status !== 204) {
            throw new Error('Failed to update despesa');
        }
        return response.data;
    } catch (error) {
        console.error('Erro ao atualizar despesa:', error.response?.data || error.message);
        throw error;
    }
};

export const deleteDespesa = async (id) => {
    try {
        const response = await api.delete(`${API_BASE_URL}/${id}`);
        if (response.status !== 204) {
            throw new Error('Failed to delete despesa');
        }
    } catch (error) {
        console.error('Erro ao excluir despesa:', error);
        throw error;
    }
};
