// src/components/ProfileModal.jsx
import React from 'react';
import styles from '../styles/components/ProfileModal.module.css';

function ProfileModal({ isOpen, onClose }) {
    if (!isOpen) return null;

    return (
        <div className={styles.modalOverlay}>
            <div className={styles.modalContent}>
                <h2>Perfil</h2>
                <p>Conteúdo do perfil aqui.</p>
                <button onClick={onClose} className={styles.closeButton}>
                    Fechar
                </button>
            </div>
        </div>
    );
}

export default ProfileModal;
