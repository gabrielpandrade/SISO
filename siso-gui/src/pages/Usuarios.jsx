import React, { useState, useEffect } from 'react';
import Dashboard from '../components/Dashboard';
import Table from '../components/Table';
import Footer from '../components/Footer';
import styles from '../styles/pages/Usuario.module.css';
import { useNavigate } from 'react-router-dom';
import { fetchUsers, updateUsuario } from '../api/user';
import UserEditModal from '../components/UserEditModal';  // Novo Modal de Edição

function Usuarios() {
    const navigate = useNavigate();
    const [usuarios, setUsuarios] = useState([]);
    const [generalError, setGeneralError] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [userToEdit, setUserToEdit] = useState(null);

    useEffect(() => {
        const loadUsuarios = async () => {
            try {
                const data = await fetchUsers();
                setUsuarios(data);
            } catch (error) {
                handleBackendError(error);
            }
        };
        loadUsuarios();
    }, []);

    const handleBackendError = (error) => {
        if (error.response && error.response.data) {
            setGeneralError('Erro ao carregar usuários: ' + (error.response.data.message || 'Erro desconhecido'));
        } else {
            setGeneralError('Erro de conexão ou problema desconhecido ao carregar usuários.');
        }
        console.error('Erro ao buscar usuários:', error);
    };

    const handleAddUsuario = () => {
        navigate('/novo-usuario');
    };

    const handleEditClick = (user) => {
        setUserToEdit(user);
        setIsModalOpen(true);
    };

    const handleModalClose = async () => {
        setIsModalOpen(false);
        setUserToEdit(null);
        try {
            const updatedList = await fetchUsers(); // Atualiza a lista de usuários ao fechar o modal
            setUsuarios(updatedList);
        } catch (error) {
            handleBackendError(error);
        }
    };

    const handleUpdateUser = async (updatedUser) => {
        try {
            await updateUsuario(updatedUser.id, updatedUser);
            handleModalClose(); // Fecha o modal e atualiza a tabela após a atualização
        } catch (error) {
            handleBackendError(error);
        }
    };

    const columns = [
        { key: 'login', label: 'Login' },
        { key: 'email', label: 'Email' },
        {
            key: 'isAdmin',
            label: 'Admin',
            render: (row) => (row.permissoes.includes('ROLE_ADMIN') ? 'Sim' : 'Não')
        }
    ];

    const buttons = [
        { type: 'add', text: 'Adicionar Usuário', onClick: handleAddUsuario }
    ];

    return (
        <Dashboard title="Usuários" error={generalError}>
            <div className={styles.formWrapper}>
                <h1 className={styles.title}>{'Usuários'}</h1>
                <Table
                    data={usuarios}
                    columns={columns}
                    onEditClick={handleEditClick}
                    caixas={true}
                />
                <Footer buttons={buttons} />
            </div>

            {isModalOpen && userToEdit && (
                <UserEditModal
                    isOpen={isModalOpen}
                    onClose={handleModalClose}
                    user={userToEdit}
                    onUpdateUser={handleUpdateUser}
                />
            )}
        </Dashboard>
    );
}

export default Usuarios;
