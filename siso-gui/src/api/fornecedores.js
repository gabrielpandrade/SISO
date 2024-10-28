import api from './api';

const API_BASE_URL = '/fornecedor';

export const fetchFornecedores = async () => {
    try {
        const response = await api.get(API_BASE_URL);
        if (response.status !== 200) {
            throw new Error('Falha na busca por fornecedores');
        }
        return response.data;
    } catch (error) {
        console.error('Erro ao buscar fornecedores:', error);
        throw error;
    }
};

export const fetchFornecedorById = async (id) => {
    try {
        const response = await api.get(`${API_BASE_URL}/${id}`);
        if (response.status !== 200) {
            throw new Error('Falha ao buscar fornecedor');
        }
        return response.data;
    } catch (error) {
        console.error('Erro ao buscar fornecedor:', error);
        throw error;
    }
};

export const createFornecedor = async (fornecedor) => {
    try {
        const payload = {
            nome: fornecedor.nome || '',
            fone: fornecedor.fone || '',
        };


        const response = await api.post(API_BASE_URL, payload);

        if (response.status !== 201) {
            throw new Error('Failed to create fornecedor');
        }

        return response.data;
    } catch (error) {
        console.error('Erro ao criar fornecedor:', error.response?.data || error.message);
        throw error;
    }
};

export const updateFornecedor = async (id, fornecedor) => {
    try {
        const payload = {
            nome: fornecedor.nome || '',
            fone: fornecedor.fone || ''
        };

        const response = await api.put(`${API_BASE_URL}/${id}`, payload);

        if (response.status !== 200 && response.status !== 204) {
            throw new Error('Failed to update fornecedor');
        }
        return response.data;
    } catch (error) {
        console.error('Erro ao atualizar fornecedor:', error.response?.data || error.message);
        throw error;
    }
};

export const deleteFornecedor = async (id) => {
    try {
        const response = await api.delete(`${API_BASE_URL}/${id}`);
        if (response.status !== 204) {
            throw new Error('Failed to delete fornecedor');
        }
    } catch (error) {
        console.error('Erro ao excluir fornecedor:', error);
        throw error;
    }
};
