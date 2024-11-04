import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Dashboard from '../components/Dashboard';
import Footer from '../components/Footer';
import styles from '../styles/pages/NovoMovimento.module.css';
import { fetchDentistas } from '../api/dentistas';
import { fetchFornecedores } from '../api/fornecedores';
import { fetchReceita } from '../api/tipoReceita';
import { fetchDespesa } from '../api/tipoDespesa';
import {
    addMovimento,
    updateMovimento,
    deleteMovimento,
    fetchMovimentosByCaixa,
    checkCaixaStatus
} from '../api/caixa';

function NovoMovimento() {
    const { id } = useParams();
    const navigate = useNavigate();

    const dataHora = new Date();
    const offset = dataHora.getTimezoneOffset();
    const adjustedDate = new Date(dataHora.getTime() - offset * 60000).toISOString();

    const [movimento, setMovimento] = useState({
        operacao: '',
        modalidade: 'Dinheiro',
        valor: '',
        descricao: '',
        dataHora: new Date(dataHora.getTime() - offset * 60000).toISOString().slice(0, 16),
        taxa: 5,
        dentista: '',
        fornecedor: '',
        tipoReceita: '',
        tipoDespesa: ''
    });

    const [isEditing, setIsEditing] = useState(false);
    const [dentistas, setDentistas] = useState([]);
    const [fornecedores, setFornecedores] = useState([]);
    const [tipoReceitas, setTipoReceitas] = useState([]);
    const [tipoDespesas, setTipoDespesas] = useState([]);
    const [caixaId, setCaixaId] = useState(null);
    const [errorMessage, setErrorMessage] = useState('');

    useEffect(() => {
        const loadData = async () => {
            try {
                const userId = localStorage.getItem('userId');
                const caixaStatus = await checkCaixaStatus(userId);

                if (caixaStatus && caixaStatus.id) {
                    setCaixaId(caixaStatus.id);
                } else {
                    console.error('Caixa não encontrado ou está fechado');
                    navigate('/caixa');
                    return;
                }



                const [dentistasData, fornecedoresData, tipoReceitasData, tipoDespesasData] = await Promise.all([
                    fetchDentistas(),
                    fetchFornecedores(),
                    fetchReceita(),
                    fetchDespesa()
                ]);

                setDentistas(dentistasData);
                setFornecedores(fornecedoresData);
                setTipoReceitas(tipoReceitasData);
                setTipoDespesas(tipoDespesasData);

                if (id) {
                    const movimentoData = await fetchMovimentosByCaixa(caixaStatus.id);
                    const movimentoToEdit = movimentoData.find(m => m.id === parseInt(id));
                    if (movimentoToEdit) {
                        setMovimento({
                            ...movimentoToEdit,
                            dataHora: new Date(movimentoToEdit.dataHora).toISOString().slice(0, 16),
                            modalidade: movimentoToEdit.operacao === 'Sangria' || movimentoToEdit.operacao === 'Aporte' ? 'Dinheiro' : movimentoToEdit.modalidade
                        });
                        setIsEditing(true);
                    } else {
                        console.error('Movimento não encontrado');
                        navigate('/caixa');
                    }
                }
            } catch (error) {
                console.error('Erro ao carregar dados:', error);
            }
        };

        loadData();
    }, [id, navigate]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setMovimento((prev) => ({ ...prev, [name]: value }));
    };

    const handleSave = async () => {
        try {
            if (!caixaId) {
                console.error('Caixa não encontrado');
                return;
            }

            if (!validateFields()) {
                return;
            }

            const movimentoData = {
                operacao: movimento.operacao.toUpperCase(),
                modalidade: movimento.modalidade.toUpperCase(),
                valor: parseFloat(movimento.valor.replace(',', '.')), // Converte o valor para float
                dataHoraMovimento: adjustedDate, // Conversão para ISO 8601
                receitaId: movimento.tipoReceita ? parseInt(movimento.tipoReceita) : null,
                despesaId: movimento.tipoDespesa ? parseInt(movimento.tipoDespesa) : null,
                dentistaId: movimento.dentista ? parseInt(movimento.dentista) : null,
                fornecedorId: movimento.fornecedor && movimento.fornecedor !== 'Nenhum' ? parseInt(movimento.fornecedor) : null
            };

            if (isEditing) {
                await updateMovimento(caixaId, id, movimentoData);
            } else {
                await addMovimento(caixaId, movimentoData);
            }

            navigate('/caixa');
        } catch (error) {
            console.error('Erro ao salvar movimento:', error.response ? error.response.data : error.message);
        }
    };


    const handleDelete = async () => {
        try {
            if (!caixaId) {
                console.error('Caixa não encontrado');
                return;
            }
            await deleteMovimento(caixaId, id);
            navigate('/caixa');
        } catch (error) {
            console.error('Erro ao excluir movimento:', error);
        }
    };

    const handleCancel = () => {
        navigate('/caixa');
    };

    const validateFields = () => {
        if (!movimento.operacao) {
            setErrorMessage('Operação é obrigatória.');
            return false;
        }

        if (!movimento.valor) {
            setErrorMessage('Valor é obrigatório.');
            return false;
        }

        if (movimento.operacao === 'Receita' && !movimento.tipoReceita) {
            setErrorMessage('Tipo de Receita é obrigatório.');
            return false;
        }

        if (movimento.operacao === 'Despesa' && !movimento.tipoDespesa) {
            setErrorMessage('Tipo de Despesa é obrigatório.');
            return false;
        }

        setErrorMessage('');
        return true;
    };

    const buttons = [
        { type: 'save', text: 'Salvar', onClick: handleSave },
        { type: 'cancel', text: 'Voltar', onClick: handleCancel }
    ];

    if (isEditing) {
        buttons.push({ type: 'delete', text: 'Excluir', onClick: handleDelete });
    }

    return (
        <Dashboard>
            <div className={styles.formWrapper}>
                <h1 className={styles.title}>{isEditing ? 'Editar Movimento' : 'Adicionar Novo Movimento'}</h1>
                <form className={styles.form}>
                    <div className={styles.operationAndDate}>
                        <div className={styles.formGroupHalf}>
                            <label htmlFor="operacao">Operação</label>
                            <select
                                id="operacao"
                                name="operacao"
                                value={movimento.operacao}
                                onChange={(e) => {
                                    handleChange(e);
                                    if (e.target.value === 'Sangria' || e.target.value === 'Aporte') {
                                        setMovimento(prev => ({ ...prev, modalidade: 'Dinheiro' }));
                                    }
                                }}
                            >
                                <option value="">Selecione</option>
                                <option value="Aporte">Aporte</option>
                                <option value="Sangria">Sangria</option>
                                <option value="Receita">Receita</option>
                                <option value="Despesa">Despesa</option>
                            </select>
                        </div>
                        <div className={styles.formGroupHalf}>
                            <label htmlFor="dataHora">Data e Hora</label>
                            <input
                                id="dataHora"
                                name="dataHora"
                                type="datetime-local"
                                value={movimento.dataHora}
                                onChange={handleChange}
                                readOnly
                            />
                        </div>
                    </div>
                    {movimento.operacao === 'Receita' && (
                        <>
                            <div className={styles.formGroup}>
                                <label htmlFor="tipoReceita">Tipo de Receita</label>
                                <select
                                    id="tipoReceita"
                                    name="tipoReceita"
                                    value={movimento.tipoReceita}
                                    onChange={handleChange}
                                >
                                    <option value="">Selecione o Tipo de Receita</option>
                                    {tipoReceitas.map((tipo) => (
                                        <option key={tipo.id} value={tipo.id}>
                                            {tipo.descricao}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div className={styles.formGroup}>
                                <label htmlFor="dentista">Dentista</label>
                                <select
                                    id="dentista"
                                    name="dentista"
                                    value={movimento.dentista}
                                    onChange={handleChange}
                                >
                                    <option value="">Selecione o Dentista</option>
                                    {dentistas.map((dentista) => (
                                        <option key={dentista.id} value={dentista.id}>
                                            {dentista.nome}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </>
                    )}
                    {movimento.operacao === 'Despesa' && (
                        <>
                            <div className={styles.formGroup}>
                                <label htmlFor="tipoDespesa">Tipo de Despesa</label>
                                <select
                                    id="tipoDespesa"
                                    name="tipoDespesa"
                                    value={movimento.tipoDespesa}
                                    onChange={handleChange}
                                >
                                    <option value="">Selecione o Tipo de Despesa</option>
                                    {tipoDespesas.map((tipo) => (
                                        <option key={tipo.id} value={tipo.id}>
                                            {tipo.descricao}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div className={styles.formGroup}>
                                <label htmlFor="dentista">Dentista</label>
                                <select
                                    id="dentista"
                                    name="dentista"
                                    value={movimento.dentista}
                                    onChange={handleChange}
                                >
                                    <option value="">Selecione o Dentista</option>
                                    {dentistas.map((dentista) => (
                                        <option key={dentista.id} value={dentista.id}>
                                            {dentista.nome}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div className={styles.formGroup}>
                                <label htmlFor="fornecedor">Fornecedor</label>
                                <select
                                    id="fornecedor"
                                    name="fornecedor"
                                    value={movimento.fornecedor}
                                    onChange={handleChange}
                                >
                                    <option value="Nenhum">Nenhum</option>
                                    <option value="">Selecione o Fornecedor</option>
                                    {fornecedores.map((fornecedor) => (
                                        <option key={fornecedor.id} value={fornecedor.id}>
                                            {fornecedor.nome}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </>
                    )}
                    {movimento.operacao && (
                        <div className={styles.formGroup}>
                            <label htmlFor="modalidade">Modalidade de Pagamento</label>
                            <select
                                id="modalidade"
                                name="modalidade"
                                value={movimento.modalidade}
                                onChange={handleChange}
                                disabled={movimento.operacao === 'Aporte' || movimento.operacao === 'Sangria'}
                            >
                                <option value="Dinheiro">Dinheiro</option>
                                <option value="Cartão">Cartão</option>
                                <option value="Transferência">Transferência</option>
                            </select>
                        </div>
                    )}
                    {(movimento.modalidade === 'Cartão' || movimento.modalidade === 'Transferência') && (
                        <div className={styles.formGroup}>
                            <label htmlFor="taxa">Taxa (%)</label>
                            <input
                                id="taxa"
                                name="taxa"
                                type="number"
                                step="0.01"
                                value={movimento.taxa}
                                onChange={handleChange}
                            />
                        </div>
                    )}
                    <div className={styles.formGroup}>
                        <label htmlFor="valor">Valor</label>
                        <input
                            id="valor"
                            name="valor"
                            type="text"
                            value={movimento.valor}
                            onChange={handleChange}
                        />
                    </div>
                    <div className={styles.formGroup}>
                        <label htmlFor="descricao">Descrição</label>
                        <textarea
                            id="descricao"
                            name="descricao"
                            value={movimento.descricao}
                            onChange={handleChange}
                        />
                    </div>
                </form>
                <Footer buttons={buttons} />
            </div>
        </Dashboard>
    );
}

export default NovoMovimento;