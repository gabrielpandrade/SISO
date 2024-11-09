import React from "react";
import { useLocation, useParams } from "react-router-dom"; // Importação para capturar parâmetros dinâmicos e localização
import styles from "../styles/components/HelpModal.module.css";

function HelpModal({ isOpen, onClose, perfil, user, login }) {
    const location = useLocation();
    if (!isOpen) return null;
    const getHelpContent = () => {

        if (perfil) {
            return "Nesta tela você pode editar o email do usuario clicando no símbolo ao lado do campo email, ou alterar a senha em 'Modificar Senha'."
        }else{
            if(login){
                return "TEXTO PARA A TELA DE EDIÇÃO DE USUARIOS"
            }else{
                switch (location.pathname) {
                    case "/caixa":
                        return "Nesta tela você pode gerenciar o caixa do sistema. Adicione, edite ou exclua registros financeiros e acompanhe o fluxo de caixa.";
                    case "/novo-movimento":
                        return "Nesta tela, você pode criar um novo movimento financeiro, seja uma receita ou uma despesa. Preencha os campos obrigatórios e registre o movimento.";
                    case "/item-movimento/:id":
                        return "Nesta tela você pode editar os dados de um movimento.";
                    case "/dentistas":
                        return "Nesta tela, você pode gerenciar os dentistas cadastrados no sistema. Adicione, edite ou exclua registros conforme necessário. Caso sej anecessário editar dentistas individualmente, clicar no ícone ao lado do dentista.";
                    case "/novo-dentista":
                        return "Nesta tela você pode cadastrar um novo dentista no sistema. Preencha as informações obrigatórias e clique em salvar.";
                    case "/dentista/:id":
                        return "Nesta tela, você pode editar os dados de um dentista.";
                    case "/fornecedores":
                        return "Nesta tela você pode visualizar todos os fornecedores cadastrados. Adicione, edite ou remova fornecedores conforme necessário.";
                    case "/novo-fornecedor":
                        return "Nesta tela, você pode cadastrar um novo fornecedor. Preencha os campos obrigatórios e clique em salvar.";
                    case "/fornecedor/:id":
                        return "Nesta tela, você pode editar os dados de um fornecedor.";
                    case "/relatorios":
                        return "Nesta tela você pode gerar e visualizar relatórios do sistema. Filtre os dados conforme necessário para visualizar relatórios financeiros e operacionais.";
                    case "/receitas":
                        return "Nesta tela, você pode visualizar e gerenciar os tipos de receitas cadastradas no sistema. Adicione, edite ou remova tipos de receitas.";
                    case "/novo-tipo-receita":
                        return "Nesta tela você pode cadastrar um novo tipo de receita. Preencha as informações obrigatórias e clique em salvar.";
                    case "/receitas/:id":
                        return "Nesta tela, você pode editar os dados de uma receita.";
                    case "/despesas":
                        return "Nesta tela você pode visualizar e gerenciar os tipos de despesas cadastradas no sistema. Adicione, edite ou remova tipos de despesas.";
                    case "/novo-tipo-despesa":
                        return "Nesta tela, você pode cadastrar um novo tipo de despesa. Preencha as informações e salve para concluir.";
                    case "/despesas/:id":
                        return "Nesta tela, você pode editar os dados de uma despesa.";
                    case "/usuarios":
                        return "Nesta tela, você pode visualizar todos os usuários cadastrados no sistema. Adicione, edite ou remova usuários conforme necessário.";
                    case "/usuarios/:id":
                        return "Nesta tela, você pode editar os dados de um usuário.";
                    case "/novo-usuario":
                        return "Nesta tela você pode cadastrar um novo usuário. Insira os dados necessários e clique em salvar.";
                    case "/usuario/:id/caixas":
                        return "Nesta tela você pode vizualizar os caixas de um usuário.";
                    case "/usuario/:id/caixas/:idCaixa":
                        return "Nesta tela, você pode editar os dados do caixa de um usuário.";
                    case "/usuario/:id/caixas/:idCaixa/novo-movimento":
                        return "Nesta tela, você pode criar um movimento em um caixa de um usuário.";
                    case "/usuario/:id/caixas/:idCaixa/novo-movimento/:idMov":
                        return "Nesta tela, você pode editar um movimento em um caixa de um usuário.";
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
