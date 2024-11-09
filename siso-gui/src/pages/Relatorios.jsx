import React, { useState, useEffect } from 'react';
import Dashboard from '../components/Dashboard';
import Footer from '../components/Footer';
import { downloadRelatorioCaixas } from '../api/caixa';
import { saveAs } from 'file-saver';
import styles from '../styles/pages/Relatorios.module.css';
import { fetchDentistas } from '../api/dentistas';

const Relatorios = () => {
    const [error, setError] = useState(null);
    const [isGenerating, setIsGenerating] = useState(false);
    const [generalError, setGeneralError] = useState(null);
    const [formData, setFormData] = useState({
        data_inicio: '',
        data_fim: '',
        id_dentista: ''
    });
    const [dentistas, setDentistas] = useState([]);

    useEffect(() => {
        const fetchDentistasData = async () => {
            try {
                const data = await fetchDentistas();
                setDentistas(data);
            } catch (error) {
                handleBackendError(error);
            }
        };

        fetchDentistasData();
    }, []);

    const handleBackendError = (error) => {
        if (error.response && error.response.data) {
            setGeneralError('Erro: ' + (error.response.data.message || 'Erro desconhecido'));
        } else {
            setGeneralError('Erro de conexão ou problema desconhecido.');
        }
        console.error('Erro:', error);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
        setError(null);
    };

    const validateDates = () => {
        const currentDate = new Date().toISOString().split('T')[0];
        const { data_inicio, data_fim } = formData;

        if (!data_inicio) {
            setError('O campo "Data Início" é obrigatório.');
            return false;
        }
        if (!data_fim) {
            setError('O campo "Data Fim" é obrigatório.');
            return false;
        }
        if (data_inicio > currentDate || data_fim > currentDate) {
            setError('As datas não podem ser maiores que a data atual.');
            return false;
        }
        if (data_inicio > data_fim) {
            setError('A "Data Início" não pode ser maior que a "Data Fim".');
            return false;
        }
        return true;
    };
    const ajustarDataParaOffsetDateTime = (dataString) => {
        // Adiciona o fuso horário local se necessário
        return dataString ? `${dataString}:00Z` : null; // Adiciona segundos e 'Z' para UTC
    };

    const handleGenerateReport = async () => {
        if (!validateDates()) {
            return;
        }

        setIsGenerating(true);
        setError(null);

        try {
            const url = await downloadRelatorioCaixas(formData);
            saveAs(url, 'relatorio_caixas.pdf');
        } catch (error) {
            handleBackendError(error);
        } finally {
            setIsGenerating(false);
        }
    };

    const buttons = [
        {
            type: 'save',
            text: 'Gerar e Baixar Relatório de Caixas',
            onClick: handleGenerateReport,
            disabled: isGenerating,
        }
    ];

    return (
        <Dashboard error={generalError}>
            <div className={styles.formWrapper}>
                <h1 className={styles.title}>{'Relatórios'}</h1>
                <form className={styles.form}>
                    <div className={styles.formGroup}>
                        <label htmlFor="data_inicio">Data Início</label>
                        <input
                            type="datetime-local"
                            id="data_inicio"
                            name="data_inicio"
                            value={formData.data_inicio}
                            onChange={handleChange}
                        />
                    </div>
                    <div className={styles.formGroup}>
                        <label htmlFor="data_fim">Data Fim</label>
                        <input
                            type="datetime-local"
                            id="data_fim"
                            name="data_fim"
                            value={formData.data_fim}
                            onChange={handleChange}
                        />
                    </div>
                    <div className={styles.formGroup}>
                        <label htmlFor="id_dentista">Dentista</label>
                        <select
                            id="id_dentista"
                            name="id_dentista"
                            value={formData.id_dentista}
                            onChange={handleChange}
                        >
                            <option value="">Selecione um dentista</option>
                            {dentistas.map((dentista) => (
                                <option key={dentista.id} value={dentista.id}>
                                    {dentista.nome}
                                </option>
                            ))}
                        </select>
                    </div>
                    {error && <p className={styles.error}>{error}</p>}
                </form>
                <Footer buttons={buttons} />
            </div>
        </Dashboard>
    );
};

export default Relatorios;
