import api from './api';

export const openCaixa = async () => {
    try {
        const response = await api.post(`/caixa`);
        if (response.status === 201) {
            return true;
        } else {
            throw new Error('Failed to open caixa');
        }
    } catch (error) {
        console.error('Error opening caixa:', error);
        throw error;
    }
};

export const closeCaixa = async () => {
    try {
        const response = await api.put(`/caixa`);
        if (response.status === 204) {
            console.log('caixa fechado');
            return;
        } else {
            throw new Error('Failed to close caixa');
        }
    } catch (error) {
        console.error('Error closing caixa:', error);
        throw error;
    }
};

export const checkCaixaStatus = async () => {
    try {
        const response = await api.get(`/caixa`);
        if (response.status === 200) {
            return true;
        }else{
            return false;
        }
    } catch (error) {
        console.error('Erro ao verificar status do caixa:', error);
        throw error;
    }
};


export const fetchMovimentoById = async (movimentoId) => {
    try {
        const response = await api.get(`/movimento/${movimentoId}`);
        console.log("resposta:",response);
        if (response.status === 200) {
            console.log(response);
            return response.data;
        } else {
            throw new Error('Failed to fetch movimento');
        }
    } catch (error) {
        console.error('Error fetching movimento:', error.response?.data || error.message);
        throw error;
    }
};

export const fetchMovimentosByCaixa = async () => {
    try {
        const response = await api.get(`/caixa/movimentos`);
        console.log('Response data:', response.data);
        if (response.status === 200) {
            return response.data;
        } else {
            throw new Error('Failed to fetch movements');
        }
    } catch (error) {
        console.error('Error fetching movements:', error);
        throw error;
    }
};

export const getCaixaId = async() =>{
    try{
        const response = await api.get(`/caixa`);
        console.log("response:", response);
        if (response.status === 200) {
            return response.data;
        }else{
            return null;
        }
    }catch(error){
        console.log("erro, não foi possível buscar o id do caixa");
        throw error;}
}

export const addMovimento = async (movimento) => {
    try {
        const payload = {
            operacao: movimento.operacao || '',
            modalidadePagamento: movimento.modalidade || '',
            valor: movimento.valor !== undefined ? movimento.valor : 0,
            id_tipo_despesa: movimento.id_tipo_despesa || null,
            id_tipo_receita: movimento.id_tipo_receita||null,
            id_dentista: movimento.id_dentista||null,
            id_fornecedor:movimento.id_fornecedor||null,
            id_caixa: await getCaixaId(),
        };
        const response = await api.post(`/movimento`, payload);
        return response.data;
    } catch (error) {
        console.error("Erro ao adicionar movimento:", error.response ? error.response.data : error.message);
        throw error;
    }
};


export const updateMovimento = async (id, movimento) => {
    try {
        const payload = {
            operacao: movimento.operacao || '',
            modalidadePagamento: movimento.modalidade || '',
            valor: movimento.valor !== undefined ? movimento.valor : 0,
            id_tipo_despesa: movimento.id_tipo_despesa || null,
            id_tipo_receita: movimento.id_tipo_receita||null,
            id_dentista: movimento.id_dentista||null,
            id_fornecedor:movimento.id_fornecedor||null,
            id_caixa: await getCaixaId(),
        };

        const response = await api.put(`/movimento/${id}`, payload);
        return response.data;
    } catch (error) {
        console.error('Erro ao atualizar movimento:', error.response?.data || error.message);
        throw error;
    }
};

export const deleteMovimento = async (id) => {
    try {
        await api.delete(`movimento/${id}`);
    } catch (error) {
        console.error('Erro ao deletar movimento:', error.response?.data || error.message);
        throw error;
    }
};

export const downloadRelatorioCaixas = async () => {
    try {
        const response = await api.get(`/caixas`, {
            responseType: 'blob'
        });

        const url = window.URL.createObjectURL(new Blob([response.data]));
        return url;
    } catch (error) {
        console.error('Erro ao gerar o relatório:', error);
        throw error;
    }
};
