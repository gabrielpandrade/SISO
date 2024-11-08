import React, { useState, useEffect } from 'react';
import styles from '../styles/components/ProfileModal.module.css';
import { FaEdit } from 'react-icons/fa';
import {fetchUserById, getMyInfo, updateMyInfo, updateMySenha, updateUserSenhaAdmin, updateUsuario} from "../api/user";

function UserEditModal({ isOpen, onClose, user, onUpdateUser }) {
    const [userInfo, setUserInfo] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isEditingEmail, setIsEditingEmail] = useState(false);
    const [newEmail, setNewEmail] = useState("");
    const [isEditingPermissoes, setIsEditingPermissoes] = useState(false);
    const [isChangingPassword, setIsChangingPassword] = useState(false);
    const [newPassword, setNewPassword] = useState("");
    const [confirmNewPassword, setConfirmNewPassword] = useState("");

    const handleClose = () => {
        setIsChangingPassword(false);
        setIsEditingEmail(false);
        setIsEditingPermissoes(false);
        onClose();
    };

    useEffect(() => {
        console.log("usuario:",user);
        const fetchUserInfo = async () => {
            setLoading(true);
            try {
                const data = await fetchUserById(user);
                console.log(data)
                setUserInfo(data);
                setNewEmail(data.email);
                setError(null);
            } catch (err) {
                console.error("Erro ao buscar informações do usuário:", err);
                setError("Não foi possível carregar as informações do usuário.");
            } finally {
                setLoading(false);
            }
        };

        if (isOpen) {
            fetchUserInfo();
        }
    }, [isOpen]);

    const handleEmailEdit = () => {
        if (isEditingEmail) {
            updateUsuario(userInfo.id, { ...userInfo, email: newEmail })
                .then(() => {
                    setUserInfo((prev) => ({ ...prev, email: newEmail }));
                    setIsEditingEmail(false);
                })
                .catch((err) => setError("Erro ao editar o email: " + err));
        } else {
            setIsEditingEmail(true);
        }
    };

    const handleChangePassword = () => {
        if (newPassword === confirmNewPassword) {
            updateUserSenhaAdmin(userInfo.id, { ...userInfo, newPassword })
                .then(() => {
                    setNewPassword("");
                    setConfirmNewPassword("");
                    setIsChangingPassword(false);
                })
                .catch((err) => setError("Erro ao atualizar a senha: " + err));
        } else {
            setError("As senhas não coincidem.");
        }
    };

    const toggleAdminPermission = () => {
        const hasAdmin = userInfo.permissoes.includes('ROLE_ADMIN');
        const updatedPermissoes = hasAdmin
            ? userInfo.permissoes.filter(perm => perm !== 'ROLE_ADMIN')
            : [...userInfo.permissoes, 'ROLE_ADMIN'];

        updateUsuario(userInfo.id, { ...userInfo, permissoes: updatedPermissoes })
            .then(() => {
                setUserInfo((prev) => ({ ...prev, permissoes: updatedPermissoes }));
                setIsEditingPermissoes(false);
            })
            .catch((err) => setError("Erro ao atualizar permissões: " + err));
    };

    return (
        isOpen && (
            <div className={styles.modalOverlay}>
                <div className={styles.modalContent}>
                    <h2>Perfil</h2>
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
                                        <button onClick={handleEmailEdit} className={styles.saveEmailButton}>Salvar
                                        </button>
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
                                    <button onClick={handleChangePassword} className={styles.saveButton}>
                                        Salvar Senha
                                    </button>
                                </div>
                            )}
                        </div>
                    )}

                    <div className={styles.buttonContainer}>
                        <button onClick={() => setIsChangingPassword(!isChangingPassword)}
                                className={styles.modifyPasswordButton}>
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
