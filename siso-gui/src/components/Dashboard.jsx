import React, { useState, useEffect } from 'react';
import Sidebar from './Sidebar';
import ErrorPopup from './ErrorPopup';
import styles from '../styles/components/Dashboard.module.css';
import Header from "./Header";
import { isAdmin, getUserName } from "../api/user";
import HelpModal from "./HelpModal";
import { useLocation } from "react-router-dom";
import ProfileModal from "./ProfileModal";

const Dashboard = ({ children, title, error }) => {
    const [erro, setError] = useState(error);
    const [admin, setAdmin] = useState(false);
    const location = useLocation();
    const [isHelpOpen, setIsHelpOpen] = useState(false);
    const [isProfileOpen, setIsProfileOpen] = useState(false);
    const [username, setUsername] = useState("");

    useEffect(() => {
        const fetchUserName = async () => {
            try {
                const name = await getUserName(); // Chama a função assíncrona
                setUsername(name); // Atualiza o estado com o nome de usuário
            } catch (err) {
                console.error("Erro ao buscar nome de usuário:", err);
            }
        };

        const adminStatus = isAdmin(); // Obtém o status de admin
        setAdmin(adminStatus);
        fetchUserName(); // Chama a função para buscar o nome do usuário
        setError(error); // Atualiza o estado de erro
    }, [error]);

    const handleCloseError = () => {
        setError(null);
    };

    const handleCloseHelp = () => {
        setIsHelpOpen(false);
    };

    const handleHelpClick = () => {
        setIsHelpOpen(true);
    };

    const handleProfileClick = () => {
        setIsProfileOpen(true);
    };

    const handleCloseProfile = () => {
        setIsProfileOpen(false);
    };

    return (
        <div className={styles.dashboard}>
            <Sidebar showUsers={admin} onHelpClick={handleHelpClick} />
            <div className={styles.mainContent}>
                <Header username={username} onProfileClick={handleProfileClick} />
                <div className={styles.contentWrapper}>
                    {children}
                </div>
            </div>
            <ProfileModal isOpen={isProfileOpen} onClose={handleCloseProfile} />
            <ErrorPopup message={erro} onClose={handleCloseError} />
            <HelpModal isOpen={isHelpOpen} onClose={handleCloseHelp} currentScreen={location.pathname} />
        </div>
    );
};

export default Dashboard;
