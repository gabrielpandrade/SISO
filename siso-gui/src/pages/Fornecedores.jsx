import React, { useState, useEffect } from 'react';
import Dashboard from '../components/Dashboard';
import Table from '../components/Table';
import Footer from '../components/Footer';
import styles from '../styles/pages/Dentistas.module.css';
import { useNavigate } from 'react-router-dom';
import { fetchFornecedores } from '../api/fornecedores';

function Fornecedores() {
    const navigate = useNavigate();
    const [fornecedores, setFornecedores] = useState([]);
    const [generalError, setGeneralError] = useState(null);

    useEffect(() => {
        const loadFornecedores = async () => {
            try {
                const data = await fetchFornecedores();
                setFornecedores(data);
            } catch (error) {
                handleBackendError(error);
            }
        };
        loadFornecedores();
    }, []);

    const handleBackendError = (error) => {
        if (error.response && error.response.data) {
            setGeneralError('Erro ao carregar fornecedores: ' + (error.response.data.message || 'Erro desconhecido'));
        } else {
            setGeneralError('Erro de conexão ou problema desconhecido ao carregar fornecedores.');
        }
        console.error('Erro ao buscar fornecedores:', error);
    };

    const handleAddFornecedor = () => {
        navigate('/novo-fornecedor');
    };

    const columns = [
        { key: 'nome', label: 'Nome' },
        { key: 'fone', label: 'Telefone' }
    ];

    const buttons = [
        { type: 'add', text: 'Adicionar Fornecedor', onClick: handleAddFornecedor }
    ];

    return (
        <Dashboard title="Fornecedores" error={generalError}>
            <div className={styles.formWrapper}>
                <h1 className={styles.title}>{'Fornecedores'}</h1>
                <Table data={fornecedores} columns={columns} onEditClick={(id) => navigate(`/fornecedor/${id}`)}/>
                <Footer buttons={buttons}/>
            </div>
        </Dashboard>
    );
}

export default Fornecedores;
