import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Dashboard from '../components/Dashboard';
import Footer from '../components/Footer';
import styles from '../styles/pages/NovoTipoDespesa.module.css';
import { fetchDespesaById, createDespesa, updateDespesa, deleteDespesa } from '../api/tipoDespesa';

function NovoTipoDespesa() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [despesa, setTipoDespesa] = useState({
        descricao: ''
    });
    const [isEditing, setIsEditing] = useState(false);
    const [isSaving, setIsSaving] = useState(false);
    const [errors, setErrors] = useState({});
    const [generalError, setGeneralError] = useState(null);
    const [title, setTitle] = useState("NOVO TIPO DE RECEITA");

    useEffect(() => {
        if (id) {
            const getTipoDespesa = async () => {
                try {
                    const data = await fetchDespesaById(id);
                    setTipoDespesa(data);
                    setIsEditing(true);
                } catch (error) {
                    handleBackendError(error);
                }
            };
            getTipoDespesa();
        }
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setTipoDespesa((prev) => ({ ...prev, [name]: value }));
        setErrors((prev) => ({ ...prev, [name]: '' }));
    };

    const sanitizeTipoDespesa = (despesa) => {
        const sanitized = { ...despesa };
        return sanitized;
    };

    const validateFields = () => {
        const newErrors = {};
        if (!despesa.descricao) newErrors.descricao = 'O campo Descrição é obrigatório.';
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

        const sanitizedTipoDespesa = sanitizeTipoDespesa(despesa);

        try {
            if (isEditing) {
                await updateDespesa(id, sanitizedTipoDespesa);
            } else {
                await createDespesa(sanitizedTipoDespesa);
            }
            navigate('/despesas');
        } catch (error) {
            handleBackendError(error);
        } finally {
            setIsSaving(false);
        }
    };

    const handleDelete = async () => {
        try {
            await deleteDespesa(id);
            navigate('/despesas');
        } catch (error) {
            handleBackendError(error);
        }
    };

    const handleCancel = () => {
        navigate('/despesas');
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
                <h1 className={styles.title}>{isEditing ? 'Editar Tipo de Despesa' : 'Adicionar Tipo de Despesa'}</h1>
                <form className={styles.form} onSubmit={handleSubmit}>
                    <div className={styles.formGroup}>
                        <label htmlFor="descricao">Descrição</label>
                        {errors.descricao && <span className={styles.error}>{errors.descricao}</span>}
                        <input
                            id="descricao"
                            name="descricao"
                            type="text"
                            maxLength="100"
                            value={despesa.descricao}
                            onChange={handleChange}
                        />
                    </div>
                    <Footer buttons={buttons} />
                </form>
            </div>
        </Dashboard>
    );
}

export default NovoTipoDespesa;
