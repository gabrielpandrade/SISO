import React from "react";
import styles from "../styles/components/HelpModal.module.css";

function HelpModal({ isOpen, onClose, currentScreen }) {
    if (!isOpen) return null;

    const getHelpContent = () => {
        switch (currentScreen) {
            case "/caixa":
                return "Aqui você pode gerenciar o caixa...";
            case "/dentistas":
                return "Nesta tela, você pode gerenciar informações dos dentistas...";
            case "/usuarios":
                return "Aqui você pode gerenciar usuários do sistema...";
            default:
                return "Ajuda não disponível para esta página.";
        }
    };

    return (
        <div className={styles.modalOverlay}>
            <div className={styles.modalContent}>
                <h2>Ajuda</h2>
                <p>{getHelpContent()}</p>
                <button onClick={onClose} className={styles.closeButton}>
                    Fechar
                </button>
            </div>
        </div>
    );
}

export default HelpModal;
