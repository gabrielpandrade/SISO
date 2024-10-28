import React, { useState, useEffect } from 'react';
import Dashboard from '../components/Dashboard';
import Table from '../components/Table';
import Footer from '../components/Footer';
import styles from '../styles/pages/Dentistas.module.css';
import { useNavigate } from 'react-router-dom';
import { fetchReceita } from '../api/tipoReceita';

function TipoReceita() {
    const navigate = useNavigate();
    const [receitas, setReceitas] = useState([]);
    const [generalError, setGeneralError] = useState(null);

    useEffect(() => {
        const loadReceitas = async () => {
            try {
                const data = await fetchReceita();
                setReceitas(data);
            } catch (error) {
                handleBackendError(error);
            }
        };
        loadReceitas();
    }, []);

    const handleBackendError = (error) => {
        if (error.response && error.response.data) {
            setGeneralError('Erro ao carregar receitas: ' + (error.response.data.message || 'Erro desconhecido'));
        } else {
            setGeneralError('Erro de conexão ou problema desconhecido ao carregar receitas.');
        }
        console.error('Erro ao buscar tipo receita:', error);
    };

    const handleAddReceita = () => {
        navigate('/novo-tipo-receita');
    };

    const columns = [
        { key: 'descricao', label: 'Descrição' }
    ];

    const buttons = [
        { type: 'add', text: 'Adicionar Tipo Receita', onClick: handleAddReceita }
    ];

    return (
        <Dashboard title="Tipo Receita" error={generalError}>
            <div className={styles.formWrapper}>
                <h1 className={styles.title}>{'Tipo de Receita'}</h1>
                <Table data={receitas} columns={columns} onEditClick={(id) => navigate(`/receitas/${id}`)}/>
                <Footer buttons={buttons}/>
            </div>
        </Dashboard>
    );
}

export default  TipoReceita;
