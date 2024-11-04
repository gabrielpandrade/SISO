import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styles from "../styles/pages/Caixa.module.css";
import Dashboard from "../components/Dashboard";
import Table from "../components/Table";
import Footer from "../components/Footer";
import { openCaixa, closeCaixa, fetchMovimentosByCaixa, checkCaixaStatus } from "../api/caixa";

function Caixa() {
    const [movements, setMovements] = useState([]);
    const [caixa, setCaixa] = useState(null);
    const [generalError, setGeneralError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const loadMovements = async () => {
            try {
                const data = await checkCaixaStatus();
                console.log("aixa", data);
                if (data) {
                    setCaixa(data);
                    const movementsData = await fetchMovimentosByCaixa();
                    setMovements(formatData(movementsData));
                }
            } catch (error) {
                handleBackendError(error);
            }
        };

        loadMovements();
    }, [navigate]);

    const handleBackendError = (error) => {
        if (error.response && error.response.data) {
            setGeneralError('Erro ao carregar movimentos: ' + (error.response.data.message || 'Erro desconhecido'));
        } else {
            setGeneralError('Erro de conexão ou problema desconhecido ao carregar movimentos.');
        }
        console.error('Erro ao buscar movimentos:', error);
    };

    const formatData = (data) => {
        return data.map(item => ({
            ...item,
            fornecedor: item.fornecedor ? item.fornecedor.nome : 'Nenhum',
            dentista: item.dentista ? item.dentista.nome : 'Nenhum',
            valor: item.valor ? item.valor.toFixed(2) : '0.00',
            dataHora: item.dataHoraMovimento ? item.dataHoraMovimento : 'Data não disponível',
            tipo: item.receita ? item.receita.descricao : (item.despesa ? item.despesa.descricao : 'Nenhum')
        }));
    };

    const handleOpenCaixa = async () => {
        try {
            const data = await openCaixa();
            if (data) {
                setCaixa(data);
            }
        } catch (error) {
            handleBackendError(error);
            alert('Erro ao abrir o caixa. Tente novamente mais tarde.');
        }
    };

    const handleCloseCaixa = async () => {
            try {
                await closeCaixa();
                setCaixa(null);
                setMovements([]);
            } catch (error) {
                handleBackendError(error);
                alert('Erro ao fechar o caixa. Tente novamente mais tarde.');
            }
    };

    const handleAddMovement = () => {
        navigate("/novo-movimento");
    };

    const columns = [
        { key: 'operacao', label: 'Operação' },
        { key: 'tipo', label: 'Tipo' },
        { key: 'modalidade', label: 'Modalidade' },
        { key: 'fornecedor', label: 'Fornecedor' },
        { key: 'dentista', label: 'Dentista' },
        { key: 'valor', label: 'Valor' },
        { key: 'dataHora', label: 'Data/Hora' }
    ];

    const footerButtons = [
        { text: "Adicionar Movimento", onClick: handleAddMovement, type: "add" },
        { text: "Fechar Caixa", onClick: handleCloseCaixa, type: "close" }
    ];

    return (
        <Dashboard title="Caixa" error={generalError}>
            <div className={styles.formWrapper}>
                <h1 className={styles.title}>{'Caixa'}</h1>
                {!caixa ? (
                    <div className={styles.contentWrapper}>
                        <button className={styles.openCaixaButton} onClick={handleOpenCaixa}>
                            Abrir Caixa
                        </button>
                    </div>
                ) : (
                    <>
                            <Table data={movements} columns={columns} />
                        <div className={styles.footerWrapper}>
                            <Footer buttons={footerButtons} />
                        </div>
                    </>
                )}
            </div>
        </Dashboard>
    );
}

export default Caixa;
