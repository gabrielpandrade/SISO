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
    const [caixaVazio, setCaixaVazio] = useState(true)

    useEffect(() => {
        const loadCaixaStatus = async () => {
            try {
                const status = await checkCaixaStatus();
                setCaixaAberto(status);
                if (status) {
                    const movementsData = await fetchMovimentosByCaixa();
                    setMovements(formatData(movementsData));
                    if(!(movementsData)){
                        setCaixaVazio(false);
                    }
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
            valor: item.valor ? `R$ ${item.valor.toFixed(2)}` : 'R$ 0.00', // Adicionado o prefixo 'R$'
            dataHora: item.dataHoraMovimento ? formatDate(item.dataHoraMovimento) : 'Data não disponível',
            tipo: item.tipoReceita ? item.tipoReceita.descricao : (item.tipoDespesa ? item.tipoDespesa.descricao : '-')
        }));
    };

// Função auxiliar para formatar data
    const formatDate = (timestamp) => {
        const date = new Date(timestamp*1000);
        return date.toLocaleString('pt-BR', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
        });
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
                setCaixaVazio(true);
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
                        <Table data={movements} caixaVazio={caixaVazio} columns={columns} onEditClick={(id) => navigate(`/item-movimento/${id}`)}/>
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
