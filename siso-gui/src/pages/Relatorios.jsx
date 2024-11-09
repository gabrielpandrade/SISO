import React, { useState, useEffect } from 'react';
import Dashboard from '../components/Dashboard'; // Ajuste o caminho conforme necessário
import Footer from '../components/Footer'; // Ajuste o caminho conforme necessário
import { downloadRelatorioCaixas } from '../api/caixa'; // Ajuste o caminho conforme necessário
import { saveAs } from 'file-saver'; // Para o download do PDF
import styles from '../styles/pages/Relatorios.module.css';
import { fetchDentistas } from '../api/dentistas';

const Relatorios = () => {
    const [error, setError] = useState({});
    const [isGenerating, setIsGenerating] = useState(false);
    const [generalError, setGeneralError] = useState(null);
    const [formData, setFormData] = useState({
        data_inicio: '',
        data_fim: '',
        id_dentista: ''
    });
    const [dentistas, setDentistas] = useState([]);

    // Função para tratar erros do backend
    const handleBackendError = (error) => {
        if (error.response && error.response.data) {
            setGeneralError('Erro: ' + (error.response.data.message || 'Erro desconhecido'));
        } else {
            setGeneralError('Erro de conexão ou problema desconhecido.');
        }
        console.error('Erro:', error);
    };

    // Função para buscar os dentistas do backend
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

    // Função para atualizar o estado do formulário
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
        setError({ ...error, [name]: '' }); // Limpa o erro ao alterar o valor
    };

    // Função para validar os campos de data
    const validateFields = () => {
        const newErrors = {};
        const now = new Date();

        if (!formData.data_inicio) {
            newErrors.data_inicio = 'O campo Data Início é obrigatório.';
        } else {
            const dataInicio = new Date(formData.data_inicio);
            if (dataInicio > now) {
                newErrors.data_inicio = 'A data de início não pode ser no futuro.';
            }
        }

        if (!formData.data_fim) {
            newErrors.data_fim = 'O campo Data Fim é obrigatório.';
        } else {
            const dataFim = new Date(formData.data_fim);
            if (dataFim > now) {
                newErrors.data_fim = 'A data de fim não pode ser no futuro.';
            }

            if (formData.data_inicio && new Date(formData.data_inicio) > dataFim) {
                newErrors.data_fim = 'A data de fim não pode ser anterior à data de início.';
            }
        }

        setError(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    // Função para gerar e baixar o relatório
    const handleGenerateReport = async () => {
        setIsGenerating(true);
        setGeneralError(null);

        if (!validateFields()) {
            setIsGenerating(false);
            return;
        }

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
                        {error.data_inicio && <span className={styles.error}>{error.data_inicio}</span>}
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
                        {error.data_fim && <span className={styles.error}>{error.data_fim}</span>}
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
                            <option value="">Nenhum</option>
                            {dentistas.map((dentista) => (
                                <option key={dentista.id} value={dentista.id}>
                                    {dentista.nome}
                                </option>
                            ))}
                        </select>
                    </div>
                </form>
                <Footer buttons={buttons} />
                {generalError && <p className={styles.error}>{generalError}</p>}
            </div>
        </Dashboard>
    );
};

export default Relatorios;
