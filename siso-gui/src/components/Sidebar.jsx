import React from "react";
import { Link, useLocation } from "react-router-dom";
import styles from "../styles/components/Sidebar.module.css";

const menuItems = [
    { icon: require("../images/caixa.svg").default, label: "Caixa", link: "/caixa" },
    { icon: require("../images/dentist.svg").default, label: "Dentistas", link: "/dentistas" },
    { icon: require("../images/fornec.svg").default, label: "Fornecedores", link: "/fornecedores" },
    { icon: require("../images/relatorio.svg").default, label: "Relatórios", link: "/relatorios" },
    { icon: require("../images/receitas.svg").default, label: "Receitas", link: "/receitas" },
    { icon: require("../images/despesas.svg").default, label: "Despesas", link: "/despesas" },
];

function Sidebar({showUsers, onHelpClick, onProfileClick}) {
    const location = useLocation();

    return (
        <aside className={styles.sidebar}>
            <div className={styles.sidebarBackground}>
                <img
                    loading="lazy"
                    src={require("../images/logo.png")}
                    className={styles.profileImage}
                    alt="User profile"
                />
            </div>
            <div className={styles.menuList}>
                <button onClick={onProfileClick} className={styles.menuItem}>
                    <img src={require("../images/profile-icon.svg").default} alt="Perfil" className={styles.menuIcon}/>
                    <span>Perfil</span>
                </button>
                {menuItems.map((item) => (
                    <Link
                        key={item.link}
                        to={item.link}
                        className={`${styles.menuItem} ${
                            location.pathname === item.link ? styles.activeMenuItem : ""
                        }`}
                    >
                        <img src={item.icon} alt={item.label} className={styles.menuIcon}/>
                        <span>{item.label}</span>
                    </Link>
                ))}
                {showUsers && (
                    <Link
                        key="/usuarios"
                        to="/usuarios"
                        className={`${styles.menuItem} ${
                            location.pathname === "/usuarios" ? styles.activeMenuItem : ""
                        }`}
                    >
                        <img src={require("../images/users.svg").default} alt="Usuários" className={styles.menuIcon}/>
                        <span>Usuários</span>
                    </Link>
                )}
                <button onClick={onHelpClick} className={styles.menuItem}>
                    <img src={require("../images/help.svg").default} alt="Ajuda" className={styles.menuIcon}/>
                    <span>Ajuda</span>
                </button>
            </div>
        </aside>
    );
}

export default Sidebar;
