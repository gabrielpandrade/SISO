import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/api";
import styles from "../styles/pages/LoginPage.module.css";
import olhoNormal from "../images/olhoNormal.svg";
import {FaQuestionCircle} from "react-icons/fa";
import ErrorPopup from "./ErrorPopup";
import HelpModal from "./HelpModal";


function Login() {
  const navigate = useNavigate();
  const [showSenha, setShowSenha] = useState(false);
  const [login, setLogin] = useState("");
  const [senha, setSenha] = useState("");
  const [error, setError] = useState("");
  const [isHelpModalOpen, setIsHelpModalOpen] = useState(false); // Estado para o HelpModal

  const toggleHelpModal = () => {
    setIsHelpModalOpen(!isHelpModalOpen); // Alterna a exibição do HelpModal
  };
  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const response = await api.post("/login", {
        login,
        senha
      });

      console.log(response);
      const token = response.headers["authorization"];
      if (token) {
        localStorage.setItem("authToken", token);
        navigate("/caixa");
      } else {
        setError("Token não encontrado na resposta");
      }
    } catch (error) {
      setError("Usuário ou senha incorretos");
    }
  };

  const toggleSenhaVisibility = () => {
    setShowSenha((prev) => !prev);
  };

  return (
      <main className={styles.loginPage}>
        <img
            loading="lazy"
            src= {require("../images/background.svg").default}
            className={styles.backgroundImage}
            alt="Background"
        />
        <div className={styles.container}>
          <form className={styles.loginForm} onSubmit={handleLogin}>
            <div className={styles.logoContainer}>
              <img
                  loading="lazy"
                  src={require("../images/logo.svg").default}
                  className={styles.logoImage}
                  alt="SISO Logo"
              />
              <div className={styles.logoText}>SISO</div>
            </div>
            <label htmlFor="loginInput" className={styles.inputLabel}>
              LOGIN
            </label>
            <input
                type="text"
                id="loginInput"
                className={styles.inputField}
                aria-label="Login input"
                value={login}
                onChange={(e) => setLogin(e.target.value)}
                placeholder="Digite seu login"
                title="Digite seu login"
                required
            />
            <label htmlFor="senhaInput" className={styles.inputLabel}>
              SENHA
            </label>
            <div className={styles.passwordContainer}>
              <input
                  type={showSenha ? "text" : "password"}
                  id="senhaInput"
                  className={styles.inputField}
                  aria-label="Senha input"
                  value={senha}
                  onChange={(e) => setSenha(e.target.value)}
                  placeholder="Digite sua senha"
                  title="Digite sua senha"
                  required
              />
              <img
                  loading="lazy"
                  src={
                    showSenha
                        ? olhoNormal
                        :require("../images/Olhocortado.svg").default
                  }
                  className={styles.visibilityIcon}
                  alt={showSenha ? "Esconder senha" : "Mostrar senha"}
                  role="button"
                  tabIndex="0"
                  onClick={toggleSenhaVisibility}
                  onKeyDown={(e) => e.key === "Enter" && toggleSenhaVisibility()}
                  aria-label={showSenha ? "Esconder senha" : "Mostrar senha"}
                  title={showSenha ? "Esconder senha" : "Mostrar senha"}
              />
            </div>
            {error && <p className={styles.error} aria-live="assertive">{error}</p>}
            <button type="submit" className={styles.loginButton}>
              Login
            </button>

          </form>
        </div>
        <FaQuestionCircle
            className={styles.helpIcon}
            onClick={toggleHelpModal}
            title="Ajuda"
        />
        {isHelpModalOpen && (
            <HelpModal
                isOpen={isHelpModalOpen}
                onClose={toggleHelpModal}
            />
        )}
      </main>
  );
}

export default Login;
