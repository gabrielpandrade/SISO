import React from "react";
import { useLocation, useParams } from "react-router-dom"; // Importação para capturar parâmetros dinâmicos e localização
import styles from "../styles/components/HelpModal.module.css";

function HelpModal({ isOpen, onClose, perfil, user, login }) {
    const location = useLocation();
    if (!isOpen) return null;
    const getHelpContent = () => {

        if (perfil) {
            return "TEXTO PARA AJUDA DE PERFIL"
        }else{
            if(login){
                return "TEXTO PARA A TELA DE EDIÇÃO DE USUARIOS"
            }else{
                switch (location.pathname) {
                    case "/caixa":
                        return "Aqui você pode gerenciar o caixa do sistema. Adicione, edite ou exclua registros financeiros e acompanhe o fluxo de caixa.";
                    case "/novo-movimento":
                        return "Nesta tela, você pode criar um novo movimento financeiro, seja uma receita ou uma despesa. Preencha os campos obrigatórios e registre o movimento.";
                    case "/item-movimento/:id":
                        return `Aqui você pode editar o movimento financeiro com o ID`
                    case "/dentistas":
                        return "Nesta tela, você pode gerenciar os dentistas cadastrados no sistema. Adicione, edite ou exclua registros conforme necessário.";
                    case "/novo-dentista":
                        return "Aqui você pode cadastrar um novo dentista no sistema. Preencha as informações obrigatórias e clique em salvar.";
                    case "/dentista/:id":
                        return `Nesta tela, você pode editar os dados do dentista com o ID`;
                    case "/fornecedores":
                        return "Aqui você pode visualizar todos os fornecedores cadastrados. Adicione, edite ou remova fornecedores conforme necessário.";
                    case "/novo-fornecedor":
                        return "Nesta tela, você pode cadastrar um novo fornecedor. Preencha os campos obrigatórios e clique em salvar.";
                    case "/fornecedor/:id":
                        return "Texto para editar fornecedor.";
                    case "/relatorios":
                        return "Aqui você pode gerar e visualizar relatórios do sistema. Filtre os dados conforme necessário para visualizar relatórios financeiros e operacionais.";
                    case "/receitas":
                        return "Nesta tela, você pode visualizar e gerenciar os tipos de receitas cadastradas no sistema. Adicione, edite ou remova tipos de receitas.";
                    case "/novo-tipo-receita":
                        return "Aqui você pode cadastrar um novo tipo de receita. Preencha as informações obrigatórias e clique em salvar.";
                    case "/receitas/:id":
                        return "Texto para editar receita.";
                    case "/despesas":
                        return "Aqui você pode visualizar e gerenciar os tipos de despesas cadastradas no sistema. Adicione, edite ou remova tipos de despesas.";
                    case "/novo-tipo-despesa":
                        return "Nesta tela, você pode cadastrar um novo tipo de despesa. Preencha as informações e salve para concluir.";
                    case "/despesas/:id":
                        return "Texto para editar despesa.";
                    case "/usuarios":
                        return "Nesta tela, você pode visualizar todos os usuários cadastrados no sistema. Adicione, edite ou remova usuários conforme necessário.";
                    case "/usuarios/:id":
                        return "Texto para editar usuário.";
                    case "/novo-usuario":
                        return "Aqui você pode cadastrar um novo usuário. Insira os dados necessários e clique em salvar.";
                    case "/usuario/:id/caixas":
                        return "Texto para visualização de caixas de usuário.";
                    case "/usuario/:id/caixas/:idCaixa":
                        return "Texto para edição de caixa de usuário.";
                    case "/usuario/:id/caixas/:idCaixa/novo-movimento":
                        return "Texto para novo movimento no caixa.";
                    case "/usuario/:id/caixas/:idCaixa/novo-movimento/:idMov":
                        return "Texto para edição de movimento no caixa.";
                    case "/login":
                        return "Nesta tela, você pode fazer login no sistema. Insira seu nome de usuário e senha nos campos apropriados e clique em 'Entrar' para acessar o sistema. Caso não tenha uma conta, entre em contato com o administrador para obter acesso.";
                    default:
                        return "Ajuda não disponível para esta página.";
                }
            }
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
