import React, { useState, useEffect } from 'react';
import Dashboard from '../components/Dashboard';
import Table from '../components/Table';
import Footer from '../components/Footer';
import styles from '../styles/pages/Dentistas.module.css';
import { useNavigate } from 'react-router-dom';
import { fetchDespesa } from '../api/tipoDespesa';

function TipoDespesa() {
    const navigate = useNavigate();
    const [despesas, setDespesas] = useState([]);
    const [generalError, setGeneralError] = useState(null);

    useEffect(() => {
        const loadDespesas = async () => {
            try {
                const data = await fetchDespesa();
                setDespesas(data);
            } catch (error) {
                handleBackendError(error);
            }
        };
        loadDespesas();
    }, []);

    const handleBackendError = (error) => {
        if (error.response && error.response.data) {
            setGeneralError('Erro ao carregar despesas: ' + (error.response.data.message || 'Erro desconhecido'));
        } else {
            setGeneralError('Erro de conexão ou problema desconhecido ao carregar despesas.');
        }
        console.error('Erro ao buscar tipo despesa:', error);
    };

    const handleAddDespesa = () => {
        navigate('/novo-tipo-despesa');
    };

    const columns = [
        { key: 'descricao', label: 'Descrição' }
    ];

    const buttons = [
        { type: 'add', text: 'Adicionar Tipo Despesa', onClick: handleAddDespesa }
    ];

    return (
        <Dashboard title="Tipo Despesa" error={generalError}>
            <div className={styles.formWrapper}>
                <h1 className={styles.title}>{'Tipo de Despesa'}</h1>
                <Table data={despesas} columns={columns} onEditClick={(id) => navigate(`/despesas/${id}`)}/>
                <Footer buttons={buttons}/>
            </div>
        </Dashboard>
    );
}

export default  TipoDespesa;
