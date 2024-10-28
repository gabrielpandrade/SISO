import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styles from "../styles/pages/Caixa.module.css";
import Dashboard from "../components/Dashboard";
import Table from "../components/Table";
import Footer from "../components/Footer";
import { openCaixa, closeCaixa, fetchMovimentosByCaixaId, checkCaixaStatus } from "../api/caixa";

function Caixa() {
    const [movements, setMovements] = useState([]);
    const [caixaId, setCaixaId] = useState(null);
    const [generalError, setGeneralError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const loadMovements = async () => {
            try {
                const userId = localStorage.getItem('userId');

                if (userId) {
                    const data = await checkCaixaStatus(userId);
                    if (data && data.id) {
                        setCaixaId(data.id);
                        const movementsData = await fetchMovimentosByCaixaId(data.id);
                        setMovements(formatData(movementsData));
                    }
                } else {
                    navigate("/login");
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
            dataHora: item.dataHoraMovimento ? new Date(item.dataHoraMovimento).toISOString().slice(0, 16) : 'Data não disponível',
            tipo: item.receita ? item.receita.descricao : (item.despesa ? item.despesa.descricao : 'Nenhum')
        }));
    };

    const handleOpenCaixa = async () => {
        try {
            const userId = localStorage.getItem('userId');
            if (userId) {
                const data = await openCaixa(userId);
                const caixaId = data.id;

                localStorage.setItem('caixaId', caixaId);
                setCaixaId(caixaId);
            } else {
                navigate("/login");
            }
        } catch (error) {
            handleBackendError(error);
            alert('Erro ao abrir o caixa. Tente novamente mais tarde.');
        }
    };

    const handleCloseCaixa = async () => {
        const userId = localStorage.getItem('userId');

        if (userId) {
            try {
                await closeCaixa(userId);
                setCaixaId(null);
                setMovements([]);
                localStorage.removeItem('caixaId');
            } catch (error) {
                handleBackendError(error);
                alert('Erro ao fechar o caixa. Tente novamente mais tarde.');
            }
        } else {
            alert('Não foi possível fechar o caixa. Verifique se o usuário está autenticado.');
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
                {!caixaId ? (
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
