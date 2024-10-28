import api from './api';

const API_BASE_URL = '/dentista';

export const fetchDentistas = async () => {
    try {
        const response = await api.get(API_BASE_URL);
        if (response.status !== 200) {
            throw new Error('Failed to fetch dentistas');
        }
        return response.data;
    } catch (error) {
        console.error('Erro ao buscar dentistas:', error);
        throw error;
    }
};

export const fetchDentistaById = async (id) => {
    try {
        const response = await api.get(`${API_BASE_URL}/${id}`);
        if (response.status !== 200) {
            throw new Error('Failed to fetch dentista');
        }
        return response.data;
    } catch (error) {
        console.error('Erro ao buscar dentista:', error);
        throw error;
    }
};

export const createDentista = async (dentista) => {
    try {
        const payload = {
            nome: dentista.nome || '',
            cro: dentista.cro || '',
            fone: dentista.fone || '',
            percentualRecebido: dentista.percentualRecebido !== undefined ? dentista.percentualRecebido : 0};


        const response = await api.post(API_BASE_URL, payload);

        if (response.status !== 201) {
            throw new Error('Failed to create dentista');
        }

        return response.data;
    } catch (error) {
        console.error('Erro ao criar dentista:', error.response?.data || error.message);
        throw error;
    }
};

export const updateDentista = async (id, dentista) => {
    try {
        const payload = {
            nome: dentista.nome || '',  // Garantir que o campo não esteja null
            cpf: dentista.cpf || '',    // Garantir que o campo não esteja null
            cro: dentista.cro || '',    // Garantir que o campo não esteja null
            fone: dentista.fone || '',  // Garantir que o campo não esteja null
            percentualRecebido: dentista.percentualRecebido !== undefined ? dentista.percentualRecebido : 0
        };

        const response = await api.put(`${API_BASE_URL}/${id}`, payload);

        if (response.status !== 200 && response.status !== 204) {
            throw new Error('Failed to update dentista');
        }
        return response.data;
    } catch (error) {
        console.error('Erro ao atualizar dentista:', error.response?.data || error.message);
        throw error;
    }
};

export const deleteDentista = async (id) => {
    try {
        const response = await api.delete(`${API_BASE_URL}/${id}`);
        if (response.status !== 204) {
            throw new Error('Failed to delete dentista');
        }
    } catch (error) {
        console.error('Erro ao excluir dentista:', error);
        throw error;
    }
};
