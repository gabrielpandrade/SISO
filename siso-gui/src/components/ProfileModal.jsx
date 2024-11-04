// src/components/ProfileModal.jsx
import React, { useEffect, useState } from 'react';
import styles from '../styles/components/ProfileModal.module.css';
import { getMyInfo, updateMyInfo, updateMySenha } from '../api/user';
import { FaEdit } from 'react-icons/fa';

function ProfileModal({ isOpen, onClose }) {
    const [userInfo, setUserInfo] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isEditingEmail, setIsEditingEmail] = useState(false);
    const [newEmail, setNewEmail] = useState("");
    const [isChangingPassword, setIsChangingPassword] = useState(false);
    const [oldPassword, setOldPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmNewPassword, setConfirmNewPassword] = useState("");

    const handleClose = () => {
        setIsChangingPassword(false);
        setIsEditingEmail(false);
        onClose();

    };
    useEffect(() => {
        const fetchUserInfo = async () => {
            setLoading(true);
            try {
                const data = await getMyInfo();
                setUserInfo(data);
                setNewEmail(data.email);
                setError(null);
            } catch (err) {
                console.error("Erro ao buscar informações do usuário:", err);
                setError("Não foi possível carregar as informações do perfil.");
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
            updateMyInfo(newEmail)
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
            updateMySenha(oldPassword, newPassword)
                .then(() => {
                    setOldPassword("");
                    setNewPassword("");
                    setConfirmNewPassword("");
                    setIsChangingPassword(false);
                })
                .catch((err) => setError("Erro ao atualizar a senha: " + err));
        } else {
            setError("As senhas não coincidem.");
        }
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

                            <p><strong>Permissões:</strong> {userInfo.permissoes}</p> {/* Linha de permissões */}

                            {isChangingPassword && (
                                <div className={styles.passwordFields}>
                                    <input
                                        type="password"
                                        placeholder="Senha Antiga"
                                        value={oldPassword}
                                        onChange={(e) => setOldPassword(e.target.value)}
                                        className={styles.inputField}
                                    />
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

export default ProfileModal;
