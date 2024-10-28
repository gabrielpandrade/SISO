import React, { useState } from 'react';
import Dashboard from '../components/Dashboard'; // Ajuste o caminho conforme necessário
import Footer from '../components/Footer'; // Ajuste o caminho conforme necessário
import { downloadRelatorioCaixas } from '../api/caixa'; // Ajuste o caminho conforme necessário
import { saveAs } from 'file-saver'; // Para o download do PDF
import styles from '../styles/pages/Relatorios.module.css';

const Relatorios = () => {
    const [error, setError] = useState(null);
    const [isGenerating, setIsGenerating] = useState(false);

    // Função para gerar e baixar o relatório
    const handleGenerateReport = async () => {
        setIsGenerating(true);
        setError(null);
        try {
            const url = await downloadRelatorioCaixas();
            // Baixa o PDF diretamente
            saveAs(url, 'relatorio_caixas.pdf');
        } catch (error) {
            console.error('Erro ao gerar o relatório:', error);
            setError('Erro ao gerar o relatório. Tente novamente mais tarde.');
        } finally {
            setIsGenerating(false);
        }
    };

    const buttons = [
        { type: 'save', text: 'Gerar e Baixar Relatório de Caixas', onClick: handleGenerateReport, disabled: isGenerating }
    ];

    return (
        <Dashboard>
            <div className={styles.pageWrapper}>
                <div className={styles.headerContainer}>
                    <h1 className={styles.title}>Relatórios</h1>
                </div>
                {error && <p className={styles.error}>{error}</p>}
                <Footer buttons={buttons} />
            </div>
        </Dashboard>
    );
};

export default Relatorios;
