import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Dashboard from '../components/Dashboard';
import Footer from '../components/Footer';
import styles from '../styles/pages/NovoUsuario.module.css';
import { createUser } from '../api/user'; // Removido update e delete, pois não são mais necessários.

function NovoUsuario() {
    const navigate = useNavigate();

    const [usuario, setUsuario] = useState({
        username: '',
        password: '',
        email: ''
    });
    const [isSaving, setIsSaving] = useState(false);
    const [errors, setErrors] = useState({});
    const [generalError, setGeneralError] = useState(null);

    const validateFields = () => {
        const newErrors = {};
        if (!usuario.username || usuario.username.length < 2 || usuario.username.length > 50) {
            newErrors.username = 'O campo Login deve ter entre 2 e 50 caracteres.';
        }
        if (!usuario.password || usuario.password.length < 8 || usuario.password.length > 50) {
            newErrors.password = 'A senha deve ter entre 8 e 50 caracteres.';
        }
        if (!usuario.email || !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(usuario.email)) {
            newErrors.email = 'O email deve ser válido.';
        }
        return newErrors;
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUsuario((prev) => ({ ...prev, [name]: value }));
        setErrors((prev) => ({ ...prev, [name]: '' }));
    };

    const sanitizeUsuario = (usuario) => {
        return { ...usuario }; // Simples sanitização
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

        const sanitizedUsuario = sanitizeUsuario(usuario);

        try {
            await createUser(sanitizedUsuario); // Apenas cria o novo usuário
            navigate('/usuarios'); // Redireciona para a lista de usuários após salvar
        } catch (error) {
            handleBackendError(error);
        } finally {
            setIsSaving(false);
        }
    };

    const handleCancel = () => {
        navigate('/usuarios'); // Volta para a lista de usuários ao cancelar
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

    return (
        <Dashboard title="NOVO USUÁRIO" error={generalError}>
            <div className={styles.formWrapper}>
                <h1 className={styles.title}>Adicionar Novo Usuário</h1>
                <form className={styles.form} onSubmit={handleSubmit}>
                    <div className={styles.formGroup}>
                        <label htmlFor="username">Login</label>
                        {errors.username && <span className={styles.error}>{errors.username}</span>}
                        <input
                            id="username"
                            name="username"
                            type="text"
                            maxLength="50"
                            value={usuario.username}
                            onChange={handleChange}
                        />
                    </div>
                    <div className={styles.formGroup}>
                        <label htmlFor="password">Senha</label>
                        {errors.password && <span className={styles.error}>{errors.password}</span>}
                        <input
                            id="password"
                            name="password"
                            type="password"
                            maxLength="50"
                            value={usuario.password}
                            onChange={handleChange}
                        />
                    </div>
                    <div className={styles.formGroup}>
                        <label htmlFor="email">Email</label>
                        {errors.email && <span className={styles.error}>{errors.email}</span>}
                        <input
                            id="email"
                            name="email"
                            type="email"
                            maxLength="320"
                            value={usuario.email}
                            onChange={handleChange}
                        />
                    </div>
                    <Footer buttons={buttons} />
                </form>
            </div>
        </Dashboard>
    );
}

export default NovoUsuario;
