// src/api/user.js

import api from './api';

export const getMyInfo = async () => {
    try {
        const response = await api.get(`/me`);
        return response.data;
    } catch (error) {
        console.error('Erro ao obter dados do usuário:', error);
        throw error;
    }
};

export const getUserName = async () => {
    try {
        const response = await api.get(`/me`);
        console.log(response.data);
        const usuario = response.data;
        const login = usuario.login;
        return login;
    } catch (error) {
        console.error("Erro ao verificar nome do usuário:", error);
        throw error;
    }
};

export const isAdmin = async () => {
    try {
        const response = await api.get(`/me`);
        const usuario = response.data;

        return usuario.permissoes.includes("ROLE_ADMIN");
    } catch (error) {
        console.error("Erro ao verificar permissões do usuário:", error);
        throw error;
    }
};


export const updateMyInfo = async (email) => {
    try {
        const payload = {
            email: email || '',
        };

        const response = await api.put(`/me`, payload);

        if (response.status !== 200 && response.status !== 204) {
            throw new Error('Failed to update user');
        }
        return response.data;
    } catch (error) {
        console.error('Erro ao atualizar usuario:', error.response?.data || error.message);
        throw error;
    }
};

export const updateMySenha = async (old, newSenha) => {
    try {
        const payload = {
            senha_old: old || '',
            senha_new: newSenha,
        };

        const response = await api.put(`/me/senha`, payload);

        if (response.status !== 200 && response.status !== 204) {
            throw new Error('Failed to update user');
        }
        return response.data;
    } catch (error) {
        console.error('Erro ao atualizar usuario:', error.response?.data || error.message);
        throw error;
    }
};

export const fetchUsers = async () => {
    try {
        const response = await api.get('/admin/usuarios');
        if (response.status !== 200) {
            throw new Error('Failed to fetch users');
        }
        return response.data;
    } catch (error) {
        console.error('Erro ao buscar users:', error);
        throw error;
    }
};

export const createUser = async (user) => {
    try {
        const payload = {
            login:user.username|| '', senha: user.password||"", email:user.email||"", ativo:"true",
        };


        const response = await api.post('/admin/usuario', payload);

        if (response.status !== 201) {
            throw new Error('Failed to create user');
        }

        return response.data;
    } catch (error) {
        console.error('Erro ao criar usuario:', error.response?.data || error.message);
        throw error;
    }
};

export const fetchUserById = async (id) => {
    try {
        const response = await api.get(`/admin/usuario/${id}`);
        if (response.status !== 200) {
            throw new Error('Falha ao buscar usuário');
        }
        return response.data;
    } catch (error) {
        console.error('Erro ao buscar usuário:', error);
        throw error;
    }
};

export const updateUsuario = async (id, user) => {
    try {
        const payload = {
            email: user.email,
            ativo: user.ativo,  // Certifique-se de que o campo 'ativo' seja manipulado corretamente
            permissoes: user.permissoes,  // Permissões em formato de array
        };

        const response = await api.put(`/admin/usuario/${id}`, payload);

        if (response.status !== 200 && response.status !== 204) {
            throw new Error('Falha ao atualizar usuário');
        }
        return response.data;
    } catch (error) {
        console.error('Erro ao atualizar usuário:', error.response?.data || error.message);
        throw error;
    }
};

export const updateUserSenhaAdmin = async (id, user) => {
    try {
        const payload = {
            senha: user.senha,
        };

        const response = await api.put(`/admin/usuario/${id}`, payload);

        if (response.status !== 200 && response.status !== 204) {
            throw new Error('Falha ao atualizar usuário');
        }
        return response.data;
    } catch (error) {
        console.error('Erro ao atualizar usuário:', error.response?.data || error.message);
        throw error;
    }
};


export const deleteUser = async (id) => {
    try {
        const response = await api.delete(`/admin/usuario/${id}`);
        if (response.status !== 204) {
            throw new Error('Falha ao excluir usuário');
        }
    } catch (error) {
        console.error('Erro ao excluir usuário:', error);
        throw error;
    }
};


export const fetchCaixasFromUser = async (id) => {
    try {
        const response = await api.get(`/admin/caixas/${id}`);
        if (response.status !== 204) {
            throw new Error('Failed to get caixas from user');
        }
    } catch (error) {
        console.error('Erro ao buscar caixas do usuario:', error);
        throw error;
    }
};

export async function fetchCaixaDetails(userId, caixaId) {
    const response = await fetch(`/admin/caixa/${caixaId}/movimentos`);
    if (!response.ok) {
        throw new Error('Erro ao buscar detalhes do caixa');
    }
    return await response.json();
}

