import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styles from "../styles/pages/Caixa.module.css";
import Dashboard from "../components/Dashboard";
import Table from "../components/Table";
import Footer from "../components/Footer";
import { openCaixa, closeCaixa, fetchMovimentosByCaixa, checkCaixaStatus } from "../api/caixa";

function Caixa() {
    const [movements, setMovements] = useState([]);
    const [caixaAberto, setCaixaAberto] = useState(false);
    const [generalError, setGeneralError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const loadCaixaStatus = async () => {
            try {
                const status = await checkCaixaStatus();
                setCaixaAberto(status);
                if (status) {
                    const movementsData = await fetchMovimentosByCaixa();
                    setMovements(formatData(movementsData));
                } else {
                    setMovements([]);
                }
            } catch (error) {
                handleBackendError(error);
            }
        };

        loadCaixaStatus();
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
            modalidade: item.modalidadePagamento,
            fornecedor: item.fornecedor ? item.fornecedor.nome : '-',
            dentista: item.dentista ? item.dentista.nome : '-',
            valor: item.valor ? item.valor.toFixed(2) : '0.00',
            dataHora: item.dataHoraMovimento ? item.dataHoraMovimento : 'Data não disponível',
            tipo: item.receita ? item.receita.descricao : (item.despesa ? item.despesa.descricao : '-')
        }));
    };

    const handleOpenCaixa = async () => {
        try {
            const data = await openCaixa();
            if (data) {
                const status = await checkCaixaStatus()
                setCaixaAberto(status);
            }
        } catch (error) {
            handleBackendError(error);
        }
    };

    const handleCloseCaixa = async () => {
        try {
            const status = await checkCaixaStatus()
            if (status) {
                await closeCaixa();
                setCaixaAberto(false);
                setMovements([]);
            } else {
                setCaixaAberto(false);
                setMovements([]);
            }
        } catch (error) {
            handleBackendError(error);
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
                {!caixaAberto ? (
                    <div className={styles.contentWrapper}>
                        <button className={styles.openCaixaButton} onClick={handleOpenCaixa}>
                            Abrir Caixa
                        </button>
                    </div>
                ) : (
                    <>
                        <Table data={movements} columns={columns} onEditClick={(id) => navigate(`/item-movimento/${id}`)}/>
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
