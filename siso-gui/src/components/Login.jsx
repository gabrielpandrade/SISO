import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/api";
import styles from "../styles/pages/LoginPage.module.css";
import {getMyInfo} from "../api/user";

function Login() {
  const navigate = useNavigate();
  const [showSenha, setShowSenha] = useState(false);
  const [login, setLogin] = useState("");
  const [senha, setSenha] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const response = await api.post("/login", {
        login,
        senha
      });


      console.log(response);
      const token = response.headers['authorization'];
      if (token) {
        localStorage.setItem("authToken", token);
        //const user = await getMyInfo();
        //localStorage.setItem("userId", user);
        localStorage.setItem('login', login);
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
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/142feee10be7498b5165fd5c0e31375b22670bc2d5534f37af24343589be3b57?placeholderIfAbsent=true&apiKey=3a7bf244ea284dc69a7afb3b5c0a50d1"
            className={styles.backgroundImage}
            alt="Background"
        />
        <div className={styles.container}>
          <form className={styles.loginForm} onSubmit={handleLogin}>
            <div className={styles.logoContainer}>
              <img
                  loading="lazy"
                  src="https://cdn.builder.io/api/v1/image/assets/TEMP/fa365b653601f7eccc3519ad6ba0157f5f31550c4e9fe489acbac53ad6f3f8df?placeholderIfAbsent=true&apiKey=3a7bf244ea284dc69a7afb3b5c0a50d1"
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
                required
            />
            <label htmlFor="senhaInput" className={styles.inputLabel}>
              SENHA
            </label>
            <div className={styles.senhaContainer}>
              <input
                  type={showSenha ? "text" : "senha"}
                  id="senhaInput"
                  className={styles.inputField}
                  aria-label="Senha input"
                  value={senha}
                  onChange={(e) => setSenha(e.target.value)}
                  required
              />
              <img
                  loading="lazy"
                  src="https://cdn.builder.io/api/v1/image/assets/TEMP/18d16c2035263816b89ea999aabc5578b7454f277bd55f64e03ac70c22602948?placeholderIfAbsent=true&apiKey=3a7bf244ea284dc69a7afb3b5c0a50d1"
                  className={styles.visibilityIcon}
                  alt={showSenha ? "Hide senha" : "Show senha"}
                  role="button"
                  tabIndex="0"
                  onClick={toggleSenhaVisibility}
                  aria-label={showSenha ? "Hide senha" : "Show senha"}
              />
            </div>
            {error && <p className={styles.error} aria-live="assertive">{error}</p>}
            <button type="submit" className={styles.loginButton}>
              Login
            </button>
          </form>
        </div>
      </main>
  );
}

export default Login;
