import React, { useState, useEffect } from 'react';
import styles from '../styles/components/ProfileModal.module.css';
import { FaEdit, FaQuestionCircle} from 'react-icons/fa';
import { fetchUserById, updateUsuario, updateUserSenhaAdmin } from "../api/user";
import ErrorPopup from './ErrorPopup';
import HelpModal from "./HelpModal"; // Importando o componente de erro

function UserEditModal({ isOpen, onClose, user }) {
    const [userInfo, setUserInfo] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isEditingEmail, setIsEditingEmail] = useState(false);
    const [newEmail, setNewEmail] = useState("");
    const [isChangingPassword, setIsChangingPassword] = useState(false);
    const [newPassword, setNewPassword] = useState("");
    const [confirmNewPassword, setConfirmNewPassword] = useState("");
    const [isHelpModalOpen, setIsHelpModalOpen] = useState(false); // Estado para o HelpModal

    const handleClose = () => {
        setIsChangingPassword(false);
        setIsEditingEmail(false);
        setError(null); // Limpar erros ao fechar o modal
        onClose();
    };

    useEffect(() => {
        const fetchUserInfo = async () => {
            setLoading(true);
            try {
                const data = await fetchUserById(user);
                setUserInfo(data);
                setNewEmail(data.email);
                setError(null);
            } catch (err) {
                setError("Não foi possível carregar as informações do usuário.");
            } finally {
                setLoading(false);
            }
        };

        if (isOpen) {
            fetchUserInfo();
        }
    }, [isOpen, user]);
    const toggleHelpModal = () => {
        setIsHelpModalOpen(!isHelpModalOpen); // Alterna a exibição do HelpModal
    };
    const handleEmailEdit = () => {
        if (!newEmail) {
            setError("O email não pode estar vazio.");
            return;
        }

        if (isEditingEmail) {
            updateUsuario(userInfo.id, { ...userInfo, email: newEmail })
                .then(() => {
                    setUserInfo((prev) => ({ ...prev, email: newEmail }));
                    setIsEditingEmail(false);
                    setError(null); // Limpar erro após sucesso
                })
                .catch((err) => setError("Erro ao editar o email: " + err));
        } else {
            setIsEditingEmail(true);
        }
    };

    const handleChangePassword = () => {
        if (!newPassword || !confirmNewPassword) {
            setError("Todos os campos de senha precisam ser preenchidos.");
            return;
        }

        if (newPassword !== confirmNewPassword) {
            setError("As senhas não coincidem.");
            return;
        }

        updateUserSenhaAdmin(userInfo.id, { ...userInfo, newPassword })
            .then(() => {
                setNewPassword("");
                setConfirmNewPassword("");
                setIsChangingPassword(false);
                setError(null); // Limpar erro após sucesso
            })
            .catch((err) => setError("Erro ao atualizar a senha: " + err));
    };

    const toggleAdminPermission = () => {
        if (!userInfo) return;

        const hasAdmin = userInfo.permissoes.includes('ROLE_ADMIN');
        const updatedPermissoes = hasAdmin
            ? userInfo.permissoes.filter(perm => perm !== 'ROLE_ADMIN')
            : [...userInfo.permissoes, 'ROLE_ADMIN'];

        updateUsuario(userInfo.id, { ...userInfo, permissoes: updatedPermissoes })
            .then(() => {
                setUserInfo((prev) => ({ ...prev, permissoes: updatedPermissoes }));
                setError(null); // Limpar erro após sucesso
            })
            .catch((err) => setError("Erro ao atualizar permissões: " + err));
    };

    return (
        isOpen && (
            <div className={styles.modalOverlay}>
                <div className={styles.modalContent}>
                    <h2>Usuário</h2>
                    {loading ? (
                        <p>Carregando...</p>
                    ) : error ? (
                        <p className={styles.error}>{error}</p>
                    ) : (
                        <div>
                            <p><strong>Login:</strong> {userInfo.login}</p>
                            <div className={styles.emailEditContainer}>
                                <strong>Email:</strong>
                                {isEditingEmail ? (
                                    <>
                                        <input
                                            type="email"
                                            value={newEmail}
                                            onChange={(e) => setNewEmail(e.target.value)}
                                            className={styles.emailInput}
                                        />
                                        <button onClick={handleEmailEdit} className={styles.saveEmailButton}>Salvar</button>
                                    </>
                                ) : (
                                    <>
                                        {userInfo.email}
                                        <FaEdit
                                            title="Editar"
                                            onClick={() => setIsEditingEmail(true)}
                                            className={styles.icon}
                                        />
                                    </>
                                )}
                            </div>

                            <div className={styles.emailEditContainer}>
                                <strong>Permissões:</strong> {userInfo?.permissoes ? userInfo.permissoes.join(', ') : 'N/A'}
                                <FaEdit
                                    title="Editar Permissões"
                                    onClick={toggleAdminPermission}
                                    className={styles.icon}
                                />
                            </div>

                            {isChangingPassword && (
                                <div className={styles.passwordFields}>
                                    <input
                                        type="password"
                                        placeholder="Nova Senha"
                                        value={newPassword}
                                        onChange={(e) => setNewPassword(e.target.value)}
                                        className={styles.inputField}
                                    />
                                    <input
                                        type="password"
                                        placeholder="Confirme Nova Senha"
                                        value={confirmNewPassword}
                                        onChange={(e) => setConfirmNewPassword(e.target.value)}
                                        className={styles.inputField}
                                    />
                                    <button onClick={handleChangePassword} className={styles.saveButton}>Salvar Senha</button>
                                </div>
                            )}
                        </div>
                    )}
                    <FaQuestionCircle
                        className={styles.helpIcon}
                        onClick={toggleHelpModal}
                        title="Ajuda"
                    />
                    {/* ErrorPopup integrado */}
                    {error && (
                        <ErrorPopup
                            message={error}
                            onClose={() => setError(null)} // Fechar o popup limpa a mensagem de erro
                        />
                    )}
                    {isHelpModalOpen && (
                        <HelpModal
                            isOpen={isHelpModalOpen}
                            onClose={toggleHelpModal}
                            login={true}
                        />
                    )}

                    <div className={styles.buttonContainer}>
                        <button onClick={() => setIsChangingPassword(!isChangingPassword)} className={styles.modifyPasswordButton}>
                            {isChangingPassword ? "Cancelar" : "Modificar Senha"}
                        </button>
                        <button onClick={handleClose} className={styles.closeButton}>Fechar</button>
                    </div>
                </div>
            </div>
        )
    );
}

export default UserEditModal;
