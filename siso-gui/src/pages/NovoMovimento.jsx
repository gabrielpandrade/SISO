import React, { useState, useEffect } from 'react';
import InputMask from 'react-input-mask';
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
    checkCaixaStatus, getMovimento, fetchMovimentoById
} from '../api/caixa';

function NovoMovimento() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [errors, setErrors] = useState({});


    const [movimento, setMovimento] = useState({
        operacao: null,
        modalidade: "Dinheiro",
        valor: null,
        descricao: null,
        taxa: 5,
        dentista: null,
        fornecedor: null,
        tipoReceita: null,
        tipoDespesa: null,
    });

    const [isEditing, setIsEditing] = useState(false);
    const [dentistas, setDentistas] = useState([]);
    const [fornecedores, setFornecedores] = useState([]);
    const [tipoReceitas, setTipoReceitas] = useState([]);
    const [tipoDespesas, setTipoDespesas] = useState([]);
    const [caixa, setCaixa] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [generalError, setGeneralError] = useState(null);

    const handleBackendError = (error) => {
        if (error.response && error.response.data) {
            setGeneralError('Erro ao carregar dados: ' + (error.response.data.message || 'Erro desconhecido'));
        } else {
            setGeneralError('Erro de conexão ou problema desconhecido ao carregar dados.');
        }
        console.error('Erro ao buscar dados:', error);
    };

    useEffect(() => {
        const loadData = async () => {
            try {
                const caixaStatus = await checkCaixaStatus();
                if (caixaStatus) {
                    setCaixa(true);
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

                // Carregar movimento para edição, se necessário
                if (id) {
                    const movimentoToEdit = await fetchMovimentoById(id);
                    if (movimentoToEdit) {
                        setMovimento({
                            ...movimentoToEdit,
                            dentista: movimentoToEdit.dentista ? movimentoToEdit.dentista.id : null, // Ajuste aqui
                            fornecedor: movimentoToEdit.fornecedor ? movimentoToEdit.fornecedor.id : null, // Ajuste aqui
                            tipoReceita: movimentoToEdit.tipoReceita ? movimentoToEdit.tipoReceita.id : null, // Ajuste aqui
                            tipoDespesa: movimentoToEdit.tipoDespesa ? movimentoToEdit.tipoDespesa.id : null, // Ajuste aqui
                            dataHora: movimentoToEdit.dataHora,
                            modalidade: movimentoToEdit.operacao === 'Sangria' || movimentoToEdit.operacao === 'Aporte' ? 'Dinheiro' : movimentoToEdit.modalidade
                        });
                        setIsEditing(true);
                    } else {
                        console.error('Movimento não encontrado');
                        navigate('/caixa');
                    }
                }
            } catch (error) {
                handleBackendError(error);
            }
        };

        loadData();
    }, [id, navigate]);


    const handleChange = (e) => {
        const { name, value } = e.target;
        setMovimento((prev) => ({ ...prev, [name]: value }));
        setErrors((prev) => ({ ...prev, [name]: '' })); // Limpa o erro do campo alterado
    };


    const handleSave = async () => {
        try {
            if (!validateFields()) {
                return;
            }

            const movimentoData = {
                operacao: movimento.operacao,
                modalidade: movimento.modalidade,
                valor: sanitizeValor(movimento.valor),
                id_tipo_receita: movimento.tipoReceita ? parseInt(movimento.tipoReceita) : null,
                id_tipo_despesa: movimento.tipoDespesa ? parseInt(movimento.tipoDespesa) : null,
                id_dentista: movimento.dentista ? parseInt(movimento.dentista) : null,
                id_fornecedor: movimento.fornecedor && movimento.fornecedor !== 'Nenhum' ? parseInt(movimento.fornecedor) : null,
                descricao:movimento.descricao,
            };

            if (isEditing) {
                await updateMovimento(id, movimentoData);
            } else {
                await addMovimento(movimentoData);
            }

            navigate('/caixa');
        } catch (error) {
            handleBackendError(error);
        }
    };

    const handleDelete = async () => {
        try {
            await deleteMovimento(id);
            navigate('/caixa');
        } catch (error) {
            handleBackendError(error);
        }
    };

    const handleCancel = () => {
        navigate('/caixa');
    };

    const validateFields = () => {
        const newErrors = {};

        if (!movimento.operacao) {
            newErrors.operacao = 'Operação é obrigatória.';
        }

        if (!movimento.valor) {
            newErrors.valor = 'Valor é obrigatório.';
        }

        if (movimento.operacao === 'Receita' && !movimento.tipoReceita) {
            newErrors.tipoReceita = 'Tipo de Receita é obrigatório.';
        }

        if (movimento.operacao === 'Receita' && !movimento.dentista) {
            newErrors.tipoReceita = 'Dentista é obrigatório.';
        }

        if (movimento.operacao === 'Despesa' && !movimento.tipoDespesa) {
            newErrors.tipoDespesa = 'Tipo de Despesa é obrigatório.';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };


    const buttons = [
        { type: 'save', text: 'Salvar', onClick: handleSave },
        { type: 'cancel', text: 'Voltar', onClick: handleCancel }
    ];

    if (isEditing) {
        buttons.push({ type: 'delete', text: 'Excluir', onClick: handleDelete });
    }

    const handleValorChange = (e) => {
        let value = e.target.value;
        value = value.replace(/[^\d,]/g, ''); // Remove caracteres que não sejam dígitos ou vírgula

        if (value.indexOf(',') !== -1) {
            const parts = value.split(',');
            parts[0] = parts[0].replace(/\D/g, ''); // Remove não-dígitos antes da vírgula
            parts[1] = parts[1].slice(0, 2); // Limita a parte decimal a 2 casas
            value = parts.join(',');
        } else {
            value = value.replace(/\D/g, ''); // Remove não-dígitos
        }

        setMovimento((prev) => ({ ...prev, valor: value }));
    };




    const sanitizeValor = (valorFormatado) => {
        const valorSanitizado = valorFormatado
            .replace(/[^\d,]/g, '')
            .replace(',', '.');
        return parseFloat(valorSanitizado);
    };


    return (
        <Dashboard error={generalError}>
            <div className={styles.formWrapper}>
                <h1 className={styles.title}>{isEditing ? 'Editar Movimento' : 'Adicionar Novo Movimento'}</h1>
                <form className={styles.form}>
                    <div className={styles.operationAndDate}>
                        <div className={styles.formGroup}>
                            <label htmlFor="operacao">Operação</label>
                            {errors.operacao && <span className={styles.error}>{errors.operacao}</span>}
                            <select
                                id="operacao"
                                name="operacao"
                                value={movimento.operacao}
                                onChange={(e) => {
                                    handleChange(e);
                                    if (e.target.value === 'Sangria' || e.target.value === 'Aporte') {
                                        setMovimento(prev => ({...prev, modalidade: 'Dinheiro'}));
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
                    </div>
                    {movimento.operacao === 'Receita' && (
                        <>
                            <div className={styles.formGroup}>
                                <label htmlFor="tipoReceita">Tipo de Receita</label>
                                {errors.tipoReceita && <span className={styles.error}>{errors.tipoReceita}</span>}
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
                                {errors.dentista && <span className={styles.error}>{errors.dentista}</span>}
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
                                {errors.tipoDespesa && <span className={styles.error}>{errors.tipoDespesa}</span>}
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
                                {errors.dentista && <span className={styles.error}>{errors.dentista}</span>}
                                <select
                                    id="dentista"
                                    name="dentista"
                                    value={movimento.dentista}
                                    onChange={handleChange}
                                >
                                    <option value="">Selecione o Dentista</option>
                                    <option value="Nenhum">Nenhum</option>
                                    {dentistas.map((dentista) => (
                                        <option key={dentista.id} value={dentista.id}>
                                            {dentista.nome}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div className={styles.formGroup}>
                                <label htmlFor="fornecedor">Fornecedor</label>
                                {errors.fornecedor && <span className={styles.error}>{errors.fornecedor}</span>}
                                <select
                                    id="fornecedor"
                                    name="fornecedor"
                                    value={movimento.fornecedor}
                                    onChange={handleChange}
                                >
                                    <option value="">Selecione o Fornecedor</option>
                                    <option value="Nenhum">Nenhum</option>
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
                            {errors.modalidade && <span className={styles.error}>{errors.modalidade}</span>}
                            <select
                                id="modalidade"
                                name="modalidade"
                                value={movimento.modalidade}
                                onChange={handleChange}
                                disabled={movimento.operacao === 'Aporte' || movimento.operacao === 'Sangria'}
                            >
                                <option value="Dinheiro">Dinheiro</option>
                                <option value="Crédito">Crédito</option>
                                <option value="Débito">Débito</option>
                                <option value="PIX">PIX</option>
                                <option value="Boleto">Cheque</option>
                            </select>
                        </div>
                    )}
                    {(movimento.modalidade === 'Crédito' || movimento.modalidade === 'Transferência') && (
                        <div className={styles.formGroup}>
                            <label htmlFor="taxa">Taxa (%)</label>
                            {errors.taxa && <span className={styles.error}>{errors.taxa}</span>}
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
                        {errors.valor && <span className={styles.error}>{errors.valor}</span>}
                        <div className={styles.inputWithPrefix}>
                            <span className={styles.prefix}>R$</span>
                            <input
                                id="valor"
                                name="valor"
                                value={movimento.valor}
                                onChange={(e) => handleValorChange(e)} // Chama a função de atualização
                                onFocus={(e) => e.target.select()} // Seleciona todo o conteúdo ao focar
                                type="text"
                                placeholder="0,00" // Sugestão de formato para o usuário
                            />
                        </div>
                    </div>

                    <div className={styles.formGroup}>
                        <label htmlFor="descricao">Descrição</label>
                        {errors.descricao && <span className={styles.error}>{errors.descricao}</span>}
                        <textarea
                            id="descricao"
                            name="descricao"
                            value={movimento.descricao}
                            onChange={handleChange}
                        />
                    </div>
                </form>
                <Footer buttons={buttons}/>
            </div>
        </Dashboard>
    );
}

export default NovoMovimento;