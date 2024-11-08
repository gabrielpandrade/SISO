import React, { useEffect, useState } from 'react';
import styles from '../styles/components/ProfileModal.module.css';
import { getMyInfo, updateMyInfo, updateMySenha } from '../api/user';
import { FaEdit,FaQuestionCircle } from 'react-icons/fa';
import ErrorPopup from './ErrorPopup';
import HelpModal from './HelpModal';

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
    const [isHelpModalOpen, setIsHelpModalOpen] = useState(false); // Estado para o HelpModal

    const handleClose = () => {
        setIsChangingPassword(false);
        setIsEditingEmail(false);
        setError(null); // Limpar erro ao fechar o modal
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
        if (!newEmail) {
            setError("O email não pode estar vazio.");
            return;
        }

        if (isEditingEmail) {
            updateMyInfo(newEmail)
                .then(() => {
                    setUserInfo((prev) => ({ ...prev, email: newEmail }));
                    setIsEditingEmail(false);
                    setError(null);
                })
                .catch((err) => {
                    if (err.response && err.response.status === 500) {
                        setError("Erro interno no servidor. Por favor, tente novamente mais tarde.");
                    } else {
                        setError("Erro ao editar o email: " + (err.response?.data?.message || err.message));
                    }
                });
        } else {
            setIsEditingEmail(true);
        }
    };
    const toggleHelpModal = () => {
        setIsHelpModalOpen(!isHelpModalOpen); // Alterna a exibição do HelpModal
    };
    const handleChangePassword = () => {
        // Verificar se todos os campos de senha estão preenchidos
        if (!oldPassword || !newPassword || !confirmNewPassword) {
            setError("Todos os campos de senha precisam ser preenchidos.");
            return;
        }

        // Verificar se as senhas coincidem
        if (newPassword !== confirmNewPassword) {
            setError("As senhas não coincidem.");
            return;
        }

        updateMySenha(oldPassword, newPassword)
            .then(() => {
                setOldPassword("");
                setNewPassword("");
                setConfirmNewPassword("");
                setIsChangingPassword(false);
                setError(null);
            })
            .catch((err) => {
                if (err.response) {
                    switch (err.response.status) {
                        case 400:
                            setError("Requisição inválida. Verifique os campos e tente novamente.");
                            break;
                        case 401:
                            setError("Senha antiga incorreta. Por favor, tente novamente.");
                            break;
                        case 500:
                            setError("Erro interno no servidor. Por favor, tente novamente mais tarde.");
                            break;
                        default:
                            setError("Erro ao atualizar a senha: " + (err.response.data.message || err.message));
                    }
                } else {
                    setError("Erro de rede ou servidor indisponível.");
                }
            });
    };
    return (
        isOpen && (
            <div className={styles.modalOverlay}>
                <div className={styles.modalContent}>
                    <h2>Perfil</h2>
                    {loading ? (
                        <p>Carregando...</p>
                    ) : (
                        <div>
                            <p><strong>Login:</strong> {userInfo?.login}</p>
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
                                        <button onClick={handleEmailEdit} className={styles.saveEmailButton}>
                                            Salvar
                                        </button>
                                    </>
                                ) : (
                                    <>
                                        {userInfo?.email}
                                        <FaEdit
                                            title="Editar"
                                            onClick={() => setIsEditingEmail(true)}
                                            className={styles.icon}
                                        />
                                    </>
                                )}
                            </div>

                            <p><strong>Permissões:</strong> {userInfo?.permissoes ? userInfo.permissoes.join(', ') : 'N/A'}</p>

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
                        <button onClick={() => setIsChangingPassword(!isChangingPassword)} className={styles.modifyPasswordButton}>
                            {isChangingPassword ? "Cancelar" : "Modificar Senha"}
                        </button>
                        <button onClick={handleClose} className={styles.closeButton}>Fechar</button>
                    </div>
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
                            perfil={true}
                        />
                    )}
                </div>
            </div>
        )
    );
}

export default ProfileModal;
