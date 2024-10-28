import React from 'react';
import styles from '../styles/components/ErrorPopup.module.css';

const ErrorPopup = ({ message, onClose }) => {
    if (!message) return null;

    return (
        <div className={styles.errorOverlay}>
            <div className={styles.errorPopup}>
                <p>{message}</p>
                <button onClick={onClose}>Fechar</button>
            </div>
        </div>
    );
};

export default ErrorPopup;
