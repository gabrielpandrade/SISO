import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Dashboard from '../components/Dashboard';
import Footer from '../components/Footer';
import styles from '../styles/pages/NovoTipoReceita.module.css';
import { fetchReceitaById, createReceita, updateReceita, deleteReceita } from '../api/tipoReceita';

function NovoTipoReceita() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [receita, setTipoReceita] = useState({
        descricao: ''
    });
    const [isEditing, setIsEditing] = useState(false);
    const [isSaving, setIsSaving] = useState(false);
    const [errors, setErrors] = useState({});
    const [generalError, setGeneralError] = useState(null);
    const [title, setTitle] = useState("NOVO TIPO DE RECEITA");

    useEffect(() => {
        if (id) {
            const getTipoReceita = async () => {
                try {
                    const data = await fetchReceitaById(id);
                    setTipoReceita(data);
                    setIsEditing(true);
                } catch (error) {
                    handleBackendError(error);
                }
            };
            getTipoReceita();
        }
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setTipoReceita((prev) => ({ ...prev, [name]: value }));
        setErrors((prev) => ({ ...prev, [name]: '' }));
    };

    const sanitizeTipoReceita = (receita) => {
        const sanitized = { ...receita };
        return sanitized;
    };

    const validateFields = () => {
        const newErrors = {};
        if (!receita.descricao) newErrors.descricao = 'O campo Descrição é obrigatório.';
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

        const sanitizedTipoReceita = sanitizeTipoReceita(receita);

        try {
            if (isEditing) {
                await updateReceita(id, sanitizedTipoReceita);
            } else {
                await createReceita(sanitizedTipoReceita);
            }
            navigate('/receitas');
        } catch (error) {
            handleBackendError(error);
        } finally {
            setIsSaving(false);
        }
    };

    const handleDelete = async () => {
        try {
            await deleteReceita(id);
            navigate('/receitas');
        } catch (error) {
            handleBackendError(error);
        }
    };

    const handleCancel = () => {
        navigate('/receitas');
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
                <h1 className={styles.title}>{isEditing ? 'Editar Tipo de Receita' : 'Adicionar Tipo de Receita'}</h1>
                <form className={styles.form} onSubmit={handleSubmit}>
                    <div className={styles.formGroup}>
                        <label htmlFor="descricao">Descrição</label>
                        {errors.descricao && <span className={styles.error}>{errors.descricao}</span>}
                        <input
                            id="descricao"
                            name="descricao"
                            type="text"
                            maxLength="100"
                            value={receita.descricao}
                            onChange={handleChange}
                        />
                    </div>
                    <Footer buttons={buttons} />
                </form>
            </div>
        </Dashboard>
    );
}

export default NovoTipoReceita;
