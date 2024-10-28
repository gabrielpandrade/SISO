import React, { useState } from "react";
import { GoChevronDown, GoSignOut } from "react-icons/go";
import { useNavigate } from "react-router-dom";
import styles from "../styles/components/Header.module.css";

function Header() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const navigate = useNavigate();
    const username = localStorage.getItem('username') || 'Perfil';

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const handleLogout = () => {
        navigate('/logout');
    };

    return (
        <div className={styles.headerContainer}>
            <div className={styles.headerContent}>
                <div className={styles.profileSection}>
                    <div className={styles.profileIcon}>
                        <span>👤</span>
                    </div>
                    <div className={styles.profileName}>
                        {username}
                    </div>
                    <button className={styles.dropdownButton} onClick={toggleMenu}>
                        <GoChevronDown className={styles.dropdownIcon} />
                    </button>
                </div>
                <div className={`${styles.logoutMenu} ${isMenuOpen ? styles.show : ""}`}>
                    <button className={styles.logoutButton} onClick={handleLogout}>
                        <GoSignOut className={styles.logoutButtonIcon} /> Sair
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Header;
