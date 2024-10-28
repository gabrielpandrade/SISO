import React, { useState, useEffect } from 'react';
import Dashboard from '../components/Dashboard';
import Table from '../components/Table';
import Footer from '../components/Footer';
import styles from '../styles/pages/Usuario.module.css';
import { useNavigate } from 'react-router-dom';
import { fetchUsers} from '../api/user';

function Usuarios() {
    const navigate = useNavigate();
    const [usuarios, setUsuarios] = useState([]);
    const [generalError, setGeneralError] = useState(null);

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

    const handleViewCaixas = (id) => {
        navigate(`/usuarios/${id}/caixas`);
    };

    const columns = [
        { key: 'nome', label: 'Nome' },
        { key: 'email', label: 'Email' }
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
                    onEditClick={(id) => navigate(`/usuarios/${id}`)}
                    onActionClick={handleViewCaixas}
                    actionLabel="Ver Caixas"
                />
                <Footer buttons={buttons} />
            </div>
        </Dashboard>
    );
}

export default Usuarios;
