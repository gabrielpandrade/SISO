import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Dashboard from '../components/Dashboard';
import Table from '../components/Table';
import Footer from '../components/Footer';
import styles from '../styles/pages/Usuario.module.css';
import { fetchCaixasFromUser } from '../api/user';

function UserCaixas() {
    const { id } = useParams(); // Obter o ID do usuário a partir dos parâmetros da URL
    const navigate = useNavigate();
    const [caixas, setCaixas] = useState([]);
    const [generalError, setGeneralError] = useState(null);

    useEffect(() => {
        const loadCaixas = async () => {
            try {
                const data = await fetchCaixasFromUser(id);
                setCaixas(data); // Atualizando o estado corretamente
            } catch (error) {
                handleBackendError(error);
            }
        };
        loadCaixas(); // Chama a função para carregar os caixas
    }, [id]); // Inclui `id` como dependência para recarregar se mudar

    const handleBackendError = (error) => {
        if (error.response && error.response.data) {
            setGeneralError('Erro ao carregar caixas: ' + (error.response.data.message || 'Erro desconhecido'));
        } else {
            setGeneralError('Erro de conexão ou problema desconhecido ao carregar caixas.');
        }
        console.error('Erro ao buscar caixas:', error);
    };

    const handleViewCaixa = (idCaixa) => {
        navigate(`/usuarios/${id}/caixas/${idCaixa}`);
    };

    const columns = [
        { key: 'dataAbertura', label: 'Abertura' },
        { key: 'dataFechamento', label: 'Fechamento' },
        { key: 'tipo', label: 'Tipo' }, // Exemplo de coluna adicional, ajuste conforme necessário
        { key: 'status', label: 'Status' } // Outra coluna de exemplo
    ];

    const buttons = [
        { type: 'voltar', text: 'Voltar', onClick: () => navigate(`/usuarios/${id}`) } // Corrigido para uma função
    ];

    return (
        <Dashboard title="Caixas do Usuário" error={generalError}>
            <div className={styles.formWrapper}>
                <h1 className={styles.title}>{'Caixas do Usuário'}</h1>
                <Table
                    data={caixas}
                    columns={columns}
                    onEditClick={(idCaixa) => handleViewCaixa(idCaixa)}
                    actionLabel="Ver Caixa"
                />
                <Footer buttons={buttons} />
            </div>
        </Dashboard>
    );
}

export default UserCaixas;
