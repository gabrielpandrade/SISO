import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Dashboard from "../components/Dashboard";
import Table from "../components/Table"; // Se precisar de uma tabela para movimentos
import Footer from "../components/Footer";
import styles from "../styles/pages/Caixa.module.css"; // Usando os estilos da página de Caixa
import { fetchCaixaDetails } from "../api/user"; // Função para buscar detalhes do caixa

function UserCaixaDetalhes() {
    const { id, idCaixa } = useParams(); // Obtém os parâmetros da URL
    const navigate = useNavigate();
    const [caixa, setCaixa] = useState(null);
    const [movimentos, setMovimentos] = useState([]);
    const [generalError, setGeneralError] = useState(null);

    useEffect(() => {
        const loadCaixaDetails = async () => {
            try {
                const data = await fetchCaixaDetails(id, idCaixa);
                setCaixa(data.caixa);
                setMovimentos(data.movimentos);
            } catch (error) {
                handleBackendError(error);
            }
        };
        loadCaixaDetails();
    }, [id, idCaixa]);

    const handleBackendError = (error) => {
        if (error.response && error.response.data) {
            setGeneralError('Erro ao carregar detalhes do caixa: ' + (error.response.data.message || 'Erro desconhecido'));
        } else {
            setGeneralError('Erro de conexão ou problema desconhecido ao carregar detalhes do caixa.');
        }
        console.error('Erro ao buscar detalhes do caixa:', error);
    };

    const handleCloseCaixa = async () => {
        // Lógica para fechar o caixa, se necessário
        // Exemplo: await closeCaixa(id, idCaixa);
        alert('Funcionalidade de fechar caixa não implementada.');
    };

    const columns = [
        { key: 'operacao', label: 'Operação' },
        { key: 'tipo', label: 'Tipo' },
        { key: 'valor', label: 'Valor' },
        { key: 'dataHora', label: 'Data/Hora' }
    ];

    const footerButtons = [
        { text: "Fechar Caixa", onClick: handleCloseCaixa, type: "close" },
        { text: "Voltar", onClick: () => navigate(`/usuarios/${id}/caixas`), type: "voltar" }
    ];

    return (
        <Dashboard title={`Detalhes do Caixa`} error={generalError}>
            <div className={styles.formWrapper}>
                <h1 className={styles.title}>{`Caixa de Usuário ${id}`}</h1>
                {caixa ? (
                    <div>
                        <h2>Informações do Caixa</h2>
                        <p><strong>ID:</strong> {caixa.id}</p>
                        <p><strong>Status:</strong> {caixa.status}</p>
                        <p><strong>Data de Abertura:</strong> {new Date(caixa.dataAbertura).toLocaleString()}</p>
                        <p><strong>Data de Fechamento:</strong> {caixa.dataFechamento ? new Date(caixa.dataFechamento).toLocaleString() : 'Ainda aberto'}</p>

                        <h2>Movimentos</h2>
                        <Table
                            data={movimentos}
                            columns={columns}
                            onEditClick={(movimentoId) => navigate(`/usuario/:id/caixas/:idCaixa/novo-movimento/${movimentoId}`)}
                            actionLabel="Ver Movimento"
                        />
                    </div>
                ) : (
                    <p>Carregando informações do caixa...</p>
                )}
                <Footer buttons={footerButtons} />
            </div>
        </Dashboard>
    );
}

export default UserCaixaDetalhes;
