import api from './api';

const API_BASE_URL = '/receita';

export const fetchReceita = async () => {
    try {
        const response = await api.get(API_BASE_URL);
        if (response.status !== 200) {
            throw new Error('Failed to fetch receita');
        }
        return response.data;
    } catch (error) {
        console.error('Erro ao buscar receita:', error);
        throw new Error (error);
    }
};

export const fetchReceitaById = async (id) => {
    try {
        const response = await api.get(`${API_BASE_URL}/${id}`);
        if (response.status !== 200) {
            throw new Error('Failed to fetch receita');
        }
        return response.data;
    } catch (error) {
        console.error('Erro ao buscar receita:', error);
        throw new Error (error);
    }
};

export const createReceita = async (receita) => {
    try {
        const payload = {
            descricao: receita.descricao || '',
        };


        const response = await api.post(API_BASE_URL, payload);

        if (response.status !== 201) {
            throw new Error('Failed to create receita');
        }

        return response.data;
    } catch (error) {
        console.error('Erro ao criar receita:', error.response?.data || error.message);
        throw new Error (error);
    }
};

export const updateReceita = async (id, receita) => {
    try {
        const payload = {
            descricao: receita.descricao || '',
        };

        const response = await api.put(`${API_BASE_URL}/${id}`, payload);

        if (response.status !== 200 && response.status !== 204) {
            throw new Error('Failed to update receita');
        }
        return response.data;
    } catch (error) {
        console.error('Erro ao atualizar receita:', error.response?.data || error.message);
        throw new Error (error);
    }
};

export const deleteReceita = async (id) => {
    try {
        const response = await api.delete(`${API_BASE_URL}/${id}`);
        if (response.status !== 204) {
            throw new Error('Failed to delete receita');
        }
    } catch (error) {
        console.error('Erro ao excluir receita:', error);
        throw new Error (error);
    }
};
