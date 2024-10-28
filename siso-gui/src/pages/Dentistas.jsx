import React, { useState, useEffect } from 'react';
import Dashboard from '../components/Dashboard';
import Table from '../components/Table';
import Footer from '../components/Footer';
import styles from '../styles/pages/Dentistas.module.css';
import { useNavigate } from 'react-router-dom';
import { fetchDentistas } from '../api/dentistas';

function Dentistas() {
    const navigate = useNavigate();
    const [dentistas, setDentistas] = useState([]);
    const [generalError, setGeneralError] = useState(null);

    useEffect(() => {
        const loadDentistas = async () => {
            try {
                const data = await fetchDentistas();
                setDentistas(data);
            } catch (error) {
                handleBackendError(error);
            }
        };
        loadDentistas();
    }, []);

    const handleBackendError = (error) => {
        if (error.response && error.response.data) {
            setGeneralError('Erro ao carregar dentistas: ' + (error.response.data.message || 'Erro desconhecido'));
        } else {
            setGeneralError('Erro de conexão ou problema desconhecido ao carregar dentistas.');
        }
        console.error('Erro ao buscar dentistas:', error);
    };

    const handleAddDentista = () => {
        navigate('/novo-dentista');
    };

    const columns = [
        { key: 'nome', label: 'Nome' },
        { key: 'fone', label: 'Telefone' },
        { key: 'cro', label: 'CRO' }
    ];

    const buttons = [
        { type: 'add', text: 'Adicionar Dentista', onClick: handleAddDentista }
    ];

    return (
        <Dashboard title="Dentistas" error={generalError}>
            <div className={styles.formWrapper}>
                <h1 className={styles.title}>{'Dentistas'}</h1>
                <Table data={dentistas} columns={columns} onEditClick={(id) => navigate(`/dentista/${id}`)}/>
                <Footer buttons={buttons}/>
            </div>
        </Dashboard>
    );
}

export default Dentistas;
