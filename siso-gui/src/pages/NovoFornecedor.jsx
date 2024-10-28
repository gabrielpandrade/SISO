import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import InputMask from 'react-input-mask';
import Dashboard from '../components/Dashboard';
import Footer from '../components/Footer';
import styles from '../styles/pages/NovoFornecedor.module.css';
import { fetchFornecedorById, createFornecedor, updateFornecedor, deleteFornecedor } from '../api/fornecedores';

function NovoFornecedor() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [fornecedor, setFornecedor] = useState({
        nome: '',
        fone: ''
    });
    const [isEditing, setIsEditing] = useState(false);
    const [isSaving, setIsSaving] = useState(false);
    const [errors, setErrors] = useState({});
    const [generalError, setGeneralError] = useState(null);
    const [title, setTitle] = useState("NOVO DENTISTA");

    useEffect(() => {
        if (id) {
            setTitle('EDITAR DENTISTA');
            const getFornecedor = async () => {
                try {
                    const data = await fetchFornecedorById(id);
                    setFornecedor(data);
                    setIsEditing(true);
                } catch (error) {
                    handleBackendError(error);
                }
            };
            getFornecedor();
        }
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFornecedor((prev) => ({ ...prev, [name]: value }));
        setErrors((prev) => ({ ...prev, [name]: '' }));
    };

    const sanitizeFornecedor = (fornecedor) => {
        const sanitized = { ...fornecedor };
        sanitized.fone = fornecedor.fone.replace(/[^\d]/g, '');
        return sanitized;
    };

    const validateFields = () => {
        const newErrors = {};
        if (!fornecedor.nome) newErrors.nome = 'O campo Nome é obrigatório.';
        if (!fornecedor.fone) newErrors.fone = 'O campo Telefone é obrigatório.';
        return newErrors;
    };

    const handleSave = async () => {
        if (isSaving) return;

        setIsSaving(true);
        setGeneralError(null);

        const newErrors = validateFields();
        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            setIsSaving(false);
            return;
        }

        const sanitizedFornecedor = sanitizeFornecedor(fornecedor);

        try {
            if (isEditing) {
                await updateFornecedor(id, sanitizedFornecedor);
            } else {
                await createFornecedor(sanitizedFornecedor);
            }
            navigate('/fornecedores');
        } catch (error) {
            handleBackendError(error);
        } finally {
            setIsSaving(false);
        }
    };

    const handleDelete = async () => {
        try {
            await deleteFornecedor(id);
            navigate('/fornecedores');
        } catch (error) {
            handleBackendError(error);
        }
    };

    const handleCancel = () => {
        navigate('/fornecedores');
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        handleSave();
    };

    const handleBackendError = (error) => {
        if (error.response && error.response.data) {
            if (error.response.status === 422) {
                const backendErrors = error.response.data.errors;
                const formattedErrors = {};

                for (let field in backendErrors) {
                    formattedErrors[field] = backendErrors[field][0];
                }
                setErrors(formattedErrors);
            } else {
                setGeneralError('Erro no servidor: ' + (error.response.data.message || 'Erro desconhecido'));
            }
        } else {
            setGeneralError('Erro de conexão ou problema desconhecido.');
        }
    };

    const buttons = [
        { type: 'save', text: 'Salvar', disabled: isSaving },
        { type: 'cancel', text: 'Voltar', onClick: handleCancel }
    ];

    if (isEditing) {
        buttons.push({ type: 'delete', text: 'Excluir', onClick: handleDelete });
    }

    return (
        <Dashboard title={title} error={generalError}>
            <div className={styles.formWrapper}>
                <h1 className={styles.title}>{isEditing ? 'Editar Fornecedor' : 'Adicionar Novo Fornecedor'}</h1>
                <form className={styles.form} onSubmit={handleSubmit}>
                    <div className={styles.formGroup}>
                        <label htmlFor="nome">Nome</label>
                        {errors.nome && <span className={styles.error}>{errors.nome}</span>}
                        <input
                            id="nome"
                            name="nome"
                            type="text"
                            maxLength="100"
                            value={fornecedor.nome}
                            onChange={handleChange}
                        />
                    </div>
                    <div className={styles.formGroup}>
                        <label htmlFor="fone">Telefone</label>
                        {errors.fone && <span className={styles.error}>{errors.fone}</span>}
                        <InputMask
                            mask="(99) 99999-9999"
                            id="fone"
                            name="fone"
                            value={fornecedor.fone}
                            onChange={handleChange}
                        >
                            {(inputProps) => <input {...inputProps} type="text" />}
                        </InputMask>
                    </div>
                    <Footer buttons={buttons} />
                </form>
            </div>
        </Dashboard>
    );
}

export default NovoFornecedor;
