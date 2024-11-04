import React, { useState } from "react";
import { GoChevronDown, GoSignOut } from "react-icons/go";
import { useNavigate } from "react-router-dom";
import styles from "../styles/components/Header.module.css";

function Header({username}) {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const navigate = useNavigate();

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const handleLogout = () => {
        navigate('/logout');
    };

    return (
        <div className={styles.headerContainer}>
            Bem vindo {username}
            <div className={styles.headerContent}>
            <button className={styles.logoutButton} onClick={handleLogout}>
                Sair <GoSignOut/>
            </button>
                </div>
        </div>
    );
}

export default Header;
