import React, { useState, useEffect } from 'react';
import Sidebar from './Sidebar';
import ErrorPopup from './ErrorPopup';
import styles from '../styles/components/Dashboard.module.css';
import Header from "./Header";
import { isAdmin, getUserName } from "../api/user";
import HelpModal from "./HelpModal";
import { useLocation } from "react-router-dom";
import ProfileModal from "./ProfileModal";

const Dashboard = ({ children, error }) => {
    const [erro, setError] = useState(error);
    const [admin, setAdmin] = useState(false);
    const location = useLocation();
    const [isHelpOpen, setIsHelpOpen] = useState(false);
    const [isProfileOpen, setIsProfileOpen] = useState(false);
    const [username, setUsername] = useState("");
    const [modais, setModais] = useState([]);

    useEffect(() => {
        const fetchUserName = async () => {
            try {
                const name = await getUserName();
                setUsername(name);
            } catch (err) {
                console.error("Erro ao buscar nome de usuário:", err);
            }
        };

        const adminStatus = isAdmin();
        console.log("ROLE_ADMIN", adminStatus)
        setAdmin(adminStatus);
        fetchUserName();
        setError(error);
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
        setModais(["perfil"]);
    };

    const handleCloseProfile = () => {
        setIsProfileOpen(false);
        setModais([]);
    };

    return (
        <div className={styles.dashboard}>
            <Sidebar showUsers={admin} onHelpClick={handleHelpClick} onProfileClick={handleProfileClick} />
            <div className={styles.mainContent}>
                <Header username={username} onProfileClick={handleProfileClick} />
                <div className={styles.contentWrapper}>
                    {children}
                </div>
            </div>
            <ProfileModal isOpen={isProfileOpen} onClose={handleCloseProfile} />
            <ErrorPopup message={erro} onClose={handleCloseError} />
            <HelpModal isOpen={isHelpOpen} onClose={handleCloseHelp} currentScreen={location.pathname} modais={modais} mensagem={erro}/>
        </div>
    );
};

export default Dashboard;
