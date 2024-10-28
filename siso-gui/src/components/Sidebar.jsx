
import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import styles from "../styles/components/Sidebar.module.css";
import HelpModal from "./HelpModal";

const menuItems = [
  {
    icon: "https://cdn.builder.io/api/v1/image/assets/TEMP/8ec30eced50082ec622258ab28c6ab7402adfe2013c5e0cde56330bee6388ddd?placeholderIfAbsent=true&apiKey=3a7bf244ea284dc69a7afb3b5c0a50d1",
    label: "Caixa",
    link: "/caixa",
  },
  {
    icon: "https://cdn.builder.io/api/v1/image/assets/TEMP/5148e17e5acf616790198713ae011082e71dad42cccd4fa59a01ce35f1e2b993?placeholderIfAbsent=true&apiKey=3a7bf244ea284dc69a7afb3b5c0a50d1",
    label: "Dentistas",
    link: "/dentistas",
  },
  {
    icon: "https://cdn.builder.io/api/v1/image/assets/TEMP/0cbf13dff1269e5cdd4c20f722ba02cc64a2056aa17a33a6007d9f259187e2f9?placeholderIfAbsent=true&apiKey=3a7bf244ea284dc69a7afb3b5c0a50d1",
    label: "Fornecedores",
    link: "/fornecedores",
  },
  {
    icon: "https://cdn.builder.io/api/v1/image/assets/TEMP/ded9646e6e6ef1ca181fa4f74bff86b43025e0a5b5a9048115e7c5f5524166e5?placeholderIfAbsent=true&apiKey=3a7bf244ea284dc69a7afb3b5c0a50d1",
    label: "Relatórios",
    link: "/relatorios",
  },
  {
    icon: "https://cdn.builder.io/api/v1/image/assets/TEMP/1364df6c0440a92c0f0df31e86ff0c36ee0ec9e5c806ad141dc05d52be73a7e2?placeholderIfAbsent=true&apiKey=3a7bf244ea284dc69a7afb3b5c0a50d1",
    label: "Receitas",
    link: "/receitas",
  },
  {
    icon: "https://cdn.builder.io/api/v1/image/assets/TEMP/431e820d28961b3974371f275fe5a923712f9404c61c9e6cf046f75cb158e000?placeholderIfAbsent=true&apiKey=3a7bf244ea284dc69a7afb3b5c0a50d1",
    label: "Despesas",
    link: "/despesas",
  },
];

function Sidebar({ showUsers, currentScreen }) {
  const location = useLocation();
  const [isHelpOpen, setIsHelpOpen] = useState(false);

  const handleHelpClick = () => {
    setIsHelpOpen(true);
  };

  const handleCloseHelp = () => {
    setIsHelpOpen(false);
  };

  return (
      <aside className={styles.sidebar}>
        <div className={styles.sidebarBackground}>
          <img
              loading="lazy"
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/4b794f763efeb84ca7a575ad7345efe4290d5a69559cdf655e77bcc15caaf261?placeholderIfAbsent=true&apiKey=3a7bf244ea284dc69a7afb3b5c0a50d1"
              className={styles.profileImage}
              alt="User profile"
          />
        </div>
        <div className={styles.menuList}>
          {menuItems.map((item) => (
              <Link
                  key={item.link}
                  to={item.link}
                  className={`${styles.menuItem} ${location.pathname === item.link ? styles.activeMenuItem : ""}`}
              >
                <img src={item.icon} alt={item.label} className={styles.menuIcon} />
                <span>{item.label}</span>
              </Link>
          ))}
          {showUsers && (
              <Link
                  key="/usuarios"
                  to="/usuarios"
                  className={`${styles.menuItem} ${location.pathname === "/usuarios" ? styles.activeMenuItem : ""}`}
              >
                <img
                    src="https://cdn.builder.io/api/v1/image/assets/TEMP/your_user_icon.png"
                    alt="Usuários"
                    className={styles.menuIcon}
                />
                <span>Usuários</span>
              </Link>
          )}
        </div>
        <div className={styles.helpSection}>
          <button onClick={handleHelpClick} className={styles.helpButton}>
            Ajuda
          </button>
        </div>
        <HelpModal isOpen={isHelpOpen} onClose={handleCloseHelp} currentScreen={currentScreen} />
      </aside>
  );
}

export default Sidebar;
