import React from "react";
import { useLocation, useParams } from "react-router-dom"; // Importação para capturar parâmetros dinâmicos e localização
import styles from "../styles/components/HelpModal.module.css";

function HelpModal({ isOpen, onClose, perfil, user, login }) {
    const location = useLocation();
    const { id } = useParams();
    if (!isOpen) return null;
    const getHelpContent = () => {

        if (perfil) {
            return `<h2>Instruções para Gerenciamento de Perfil</h2>
<p>
    A página de perfil permite que você visualize e edite suas informações pessoais, como email e senha. Abaixo estão as instruções detalhadas sobre como utilizar os recursos desta página:
</p>
<ol>
    <li>
        <b>Visualizar Informações do Perfil:</b>
    </li>
    <p>
        Assim que a tela de perfil for aberta, suas informações, como login e permissões, serão carregadas automaticamente. Caso não sejam exibidas, pode haver um problema de conexão ou erro ao carregar os dados.
    </p>

    <li>
        <b>Editar Email:</b>
    </li>
    <p>
        Para alterar o email, clique no ícone de edição (<i>ícone de lápis</i>) ao lado do campo de email. Digite o novo endereço e clique em "Salvar". Se desejar cancelar a edição, basta não salvar ou fechar a tela de perfil.
    </p>

    <li>
        <b>Modificar Senha:</b>
    </li>
    <p>
        Clique no botão "Modificar Senha" para abrir os campos de alteração de senha. Preencha sua senha antiga, a nova senha e a confirmação da nova senha. Clique em "Salvar Senha" para aplicar a alteração. Certifique-se de que a nova senha e a confirmação coincidam.
    </p>

    <li>
        <b>Fechar Modal:</b>
    </li>
    <p>
        Para sair da tela de perfil, clique no botão "Fechar" na parte inferior. Isso irá encerrar o modal e retornar à página anterior.
    </p>
</ol>

<h3>Dicas:</h3>
<ul>
    <li>Certifique-se de salvar as alterações após editar o email ou modificar a senha.</li>
    <li>Para segurança, use uma senha forte que combine letras, números e símbolos.</li>
    <li>Revise as permissões exibidas para garantir que elas estejam corretas.</li>
    <li>Se um erro for exibido, verifique a mensagem de erro detalhada ou tente novamente mais tarde.</li>
</ul>
`;
        }else{
            if(login){
                return`<h2>Instruções para Edição de Usuário</h2>

<p>Esta página permite editar informações do usuário, como o login, o email e a senha, bem como ajustar permissões. Abaixo estão as instruções detalhadas para cada ação:</p>

<ol>
    <li>
        <b>Editar Email:</b>
        <p>Você pode editar o email do usuário clicando no ícone de editar ao lado do campo de email. Ao editar, insira um novo email válido e clique em "Salvar" para confirmar a alteração. Se o campo de email estiver vazio, uma mensagem de erro será exibida.</p>
    </li>

    <li>
        <b>Alterar Senha:</b>
        <p>Para alterar a senha do usuário, clique em "Modificar Senha". Você será solicitado a inserir uma nova senha e confirmá-la. As senhas precisam coincidir para que a alteração seja salva. Caso os campos de senha não estejam preenchidos ou as senhas não coincidam, uma mensagem de erro será exibida.</p>
    </li>

    <li>
        <b>Editar Permissões:</b>
        <p>As permissões do usuário podem ser ajustadas clicando no ícone de editar ao lado de "Permissões". Você pode adicionar ou remover a permissão de "Admin". Caso a permissão já tenha sido atribuída, ela pode ser removida, ou caso contrário, adicionada.</p>
    </li>

    <li>
        <b>Mensagens de Erro:</b>
        <p>Caso haja algum erro durante a edição do usuário (como ao tentar editar um campo obrigatório sem preenchê-lo corretamente), o sistema exibirá uma mensagem de erro. Corrija o problema e tente novamente.</p>
    </li>

    <li>
        <b>Fechar a tela:</b>
        <p>Para fechar a tela sem salvar as alterações, clique em "Fechar". Todas as edições não salvas serão descartadas.</p>
    </li>
</ol>

<h3>Dicas:</h3>
<ul>
    <li>Certifique-se de preencher todos os campos corretamente antes de salvar.</li>
    <li>As alterações nas permissões só podem ser feitas se o usuário tiver permissões administrativas.</li>
    <li>Ao modificar a senha, verifique se as senhas digitadas coincidem antes de confirmar.</li>
</ul>
`;
            }else{
                switch (location.pathname) {
                    case "/caixa":
                        return `<h2>Instruções para Gerenciamento de Caixa</h2>
<p>
    Na página de gerenciamento de caixa, você pode realizar várias ações para monitorar e gerenciar os movimentos financeiros do sistema. Abaixo estão as instruções detalhadas sobre como utilizar os recursos disponíveis:
</p>
<ol>
    <li>
        <b>Abrir Caixa:</b>
    </li>
    <p>
        Se o caixa estiver fechado, clique no botão "Abrir Caixa" para iniciar o registro de movimentos. Uma vez que o caixa esteja aberto, você poderá visualizar e gerenciar todos os movimentos financeiros.
    </p>

    <li>
        <b>Visualizar Movimentos:</b>
    </li>
    <p>
        Quando o caixa está aberto, a tabela de movimentos exibirá todas as transações, incluindo informações como operação, tipo, modalidade de pagamento, fornecedor, dentista, valor, e data/hora, de um caixa específico. 
    </p>
    
    <li>
        <b>Editar Movimentos:</b>
    </li>
    <p>
        Quando o caixa está aberto, a tabela de movimentos exibirá todas as transações. Para cada transação de um caixa específico você poderá ediar os dados clicando no botão de editar na coluna de ações. 
    </p>

    <li>
        <b>Adicionar Movimento:</b>
    </li>
    <p>
        Utilize o botão "Adicionar Movimento" no rodapé da página para inserir uma nova transação. Isso redirecionará você para uma nova página onde poderá preencher os detalhes do movimento.
    </p>

    <li>
        <b>Fechar Caixa:</b>
    </li>
    <p>
        Clique no botão "Fechar Caixa" para encerrar o registro de movimentos e salvar todas as transações. Após fechar o caixa, a tabela será esvaziada e você não poderá adicionar novos movimentos até reabri-lo.
    </p>
</ol>

<h3>Dicas:</h3>
<ul>
    <li>Revise os dados na tabela antes de fechar o caixa para garantir que não haja erros.</li>
    <li>Se ocorrer um erro ao carregar ou gerenciar o caixa, verifique a conexão de rede ou consulte o suporte técnico.</li>
</ul>
`;
                    case "/novo-movimento":
                        return `<h2>Instruções para Adicionar Movimento</h2>
<p>
    Na página de "Novo Movimento", você pode adicionar ou editar transações financeiras no sistema. As instruções detalhadas abaixo irão guiá-lo no uso adequado dos recursos disponíveis:
</p>
<ol>
    <li>
        <b>Selecionar Tipo de Operação:</b>
    </li>
    <p>
        O primeiro passo é escolher a operação desejada: "Aporte", "Sangria", "Receita" ou "Despesa". Isso determinará quais campos estarão disponíveis para preenchimento. 
    </p>

    <li>
        <b>Preencher Detalhes do Movimento:</b>
    </li>
    <p>
        Dependendo da operação selecionada, você deverá fornecer informações adicionais. Para "Receita", é necessário selecionar o tipo de receita e o dentista responsável. Para "Despesa", você deve escolher o tipo de despesa, o dentista e o fornecedor relacionados.
    </p>
    
    <li>
        <b>Escolher Modalidade de Pagamento:</b>
    </li>
    <p>
        Escolha a modalidade de pagamento (como "Dinheiro", "Crédito", "Débito", "PIX" ou "Boleto"). Se a operação for "Aporte" ou "Sangria", a modalidade será fixada como "Dinheiro".
    </p>

    <li>
        <b>Adicionar Valor e Taxa:</b>
    </li>
    <p>
        Insira o valor da transação. Se a modalidade for "Crédito" ou "Transferência", será necessário informar a taxa associada à operação.
    </p>

    <li>
        <b>Adicionar Descrição:</b>
    </li>
    <p>
        Insira uma descrição detalhada do movimento. Isso pode incluir informações adicionais sobre a transação que não são cobertas pelos outros campos.
    </p>

    <li>
        <b>Salvar ou Excluir o Movimento:</b>
    </li>
    <p>
        Após preencher os detalhes, você pode salvar o movimento clicando no botão "Salvar". Se estiver editando um movimento existente, você também terá a opção de excluir a transação.
    </p>

    <li>
        <b>Cancelar:</b>
    </li>
    <p>
        Se desejar cancelar a operação, clique no botão "Voltar" para retornar à página de gerenciamento do caixa.
    </p>
</ol>

<h3>Dicas:</h3>
<ul>
    <li>Certifique-se de preencher todos os campos obrigatórios antes de salvar o movimento.</li>
    <li>Se estiver editando um movimento, revise todos os campos para garantir que as informações estejam corretas antes de salvar as alterações.</li>
    <li>Em caso de erro ao salvar ou editar um movimento, verifique a conexão de rede ou entre em contato com o suporte técnico.</li>
</ul>
`;
                    case `/item-movimento/${id}`:
                        return `
<h2>Instruções para Edição de Movimento</h2>
<p>
    Você está na tela de edição de um movimento previamente selecionado. Aqui, você pode atualizar os detalhes desse movimento. Siga as etapas abaixo para editar as informações corretamente:
</p>
<ol>
    <li>
        <b>Visualizar Detalhes do Movimento:</b>
    </li>
    <p>
        Na tela de edição, você verá os detalhes do movimento que foi selecionado. Isso inclui informações como:
        <ul>
            <li><b>Operação:</b> Tipo de operação (Aporte, Sangria, Receita, Despesa).</li>
            <li><b>Tipo de Receita/Despesa:</b> Se for Receita ou Despesa, o tipo correspondente será exibido.</li>
            <li><b>Dentista:</b> Se o movimento for do tipo "Receita", o dentista associado aparecerá.</li>
            <li><b>Fornecedor:</b> Se o movimento for do tipo "Despesa", o fornecedor associado será mostrado.</li>
            <li><b>Modalidade de Pagamento:</b> A modalidade de pagamento (Dinheiro, Crédito, Débito, PIX, Boleto).</li>
            <li><b>Valor:</b> O valor do movimento será exibido no formato de moeda (exemplo: R$ 1.000,00).</li>
            <li><b>Descrição:</b> A descrição do movimento (se houver).</li>
        </ul>
    </p>

    <li>
        <b>Alterar Detalhes do Movimento:</b>
    </li>
    <p>
        Você pode editar qualquer um dos campos acima para atualizar as informações do movimento. Basta clicar nos campos de cada seção e fazer as alterações necessárias:
        <ul>
            <li><b>Operação:</b> Se necessário, altere o tipo de operação selecionado.</li>
            <li><b>Tipo de Receita/Despesa:</b> Caso o movimento seja alterado para outro tipo, selecione o novo tipo de receita ou despesa.</li>
            <li><b>Dentista:</b> Para movimentos do tipo "Receita", você pode alterar o dentista associado.</li>
            <li><b>Fornecedor:</b> Para movimentos do tipo "Despesa", você pode alterar o fornecedor associado.</li>
            <li><b>Modalidade de Pagamento:</b> Alterar a forma de pagamento, se necessário.</li>
            <li><b>Valor:</b> Altere o valor do movimento se houver necessidade.</li>
            <li><b>Descrição:</b> Se necessário, edite ou adicione uma descrição para o movimento.</li>
        </ul>
    </p>

    <li>
        <b>Salvar Alterações:</b>
    </li>
    <p>
        Após realizar as alterações desejadas, clique no botão "Salvar" para atualizar o movimento. Certifique-se de que todos os campos obrigatórios (como tipo de receita/despesa e dentista ou fornecedor) estejam preenchidos corretamente antes de salvar.
    </p>

    <li>
        <b>Excluir Movimento:</b>
    </li>
    <p>
        Caso o movimento selecionado não seja mais necessário, você pode excluí-lo clicando no botão "Excluir". Essa ação é irreversível, então tenha certeza de que deseja excluir o movimento.
    </p>

    <li>
        <b>Cancelar Edição:</b>
    </li>
    <p>
        Caso deseje cancelar as edições realizadas, clique no botão "Cancelar". Isso irá descartar as alterações e retornar à tela anterior.
    </p>
</ol>

<h3>Dicas:</h3>
<ul>
    <li>Revise cuidadosamente as informações antes de salvar, para garantir que os dados estejam corretos.</li>
    <li>Verifique se todos os campos obrigatórios foram preenchidos adequadamente para evitar erros ao salvar.</li>
    <li>Se encontrar dificuldades ao editar, entre em contato com o suporte técnico para assistência.</li>
</ul>
\`;
`;
                    case "/dentistas":
                        return `
<h2>Instruções para Gerenciamento de Dentistas</h2>
<p>
    Na página de gerenciamento de dentistas, você pode visualizar e gerenciar os registros dos dentistas cadastrados no sistema. Abaixo estão as instruções detalhadas sobre como utilizar os recursos disponíveis:
</p>
<ol>
    <li>
        <b>Visualizar Dentistas:</b>
    </li>
    <p>
        Na tabela, você verá todos os dentistas cadastrados, com informações como nome, telefone e CRO (Cadastro de Registro de Odontologia). Você pode ordenar e pesquisar dentistas conforme necessário.
    </p>

    <li>
        <b>Editar Dentista:</b>
    </li>
    <p>
        Para editar os dados de um dentista, clique no ícone de editar na coluna "Ações" ao lado do dentista desejado. Isso redirecionará você para a página de edição, onde poderá modificar as informações do dentista selecionado.
    </p>

    <li>
        <b>Adicionar Novo Dentista:</b>
    </li>
    <p>
        Para adicionar um novo dentista ao sistema, clique no botão "Adicionar Dentista" no rodapé da página. Isso o levará para uma nova tela onde você poderá preencher as informações do novo dentista, como nome, telefone e CRO.
    </p>

    <li>
        <b>Erros ao Carregar Dentistas:</b>
    </li>
    <p>
        Caso ocorra um erro ao carregar os dentistas, uma mensagem de erro será exibida na parte superior da página. Verifique a conexão com a internet e tente novamente. Se o problema persistir, entre em contato com o suporte técnico.
    </p>
</ol>

<h3>Dicas:</h3>
<ul>
    <li>Revise as informações dos dentistas antes de salvar qualquer alteração para garantir que os dados estejam corretos.</li>
    <li>Use a função de pesquisa ou ordenação para localizar rapidamente um dentista na tabela.</li>
    <li>Se você não encontrar o dentista desejado, verifique a possibilidade de que ele ainda não tenha sido cadastrado ou que o sistema tenha apresentado algum erro.</li>
</ul>
\`;
`;
                    case "/novo-dentista":
                        return `
<h2>Instruções para Cadastro de Novo Dentista</h2>
<p>
    Na página de cadastro de novo dentista, você pode adicionar um dentista ao sistema. Abaixo estão as instruções detalhadas sobre como utilizar os campos e funcionalidades disponíveis:
</p>
<ol>
    <li>
        <b>Preencher Informações do Dentista:</b>
    </li>
    <p>
        Na tela de cadastro, preencha os campos obrigatórios, como <b>Nome</b>, <b>Telefone</b> e <b>CRO (Cadastro de Registro de Odontologia)</b>. Certifique-se de inserir os dados corretamente para garantir que o cadastro seja validado corretamente.
    </p>

    <li>
        <b>Campos Obrigatórios:</b>
    </li>
    <p>
        Os campos obrigatórios estão marcados com um asterisco (*). Estes devem ser preenchidos antes de salvar o cadastro. Se algum desses campos estiver em branco, um erro será exibido para alertá-lo.
    </p>

    <li>
        <b>Salvar Cadastro:</b>
    </li>
    <p>
        Após preencher as informações, clique no botão "Salvar" para registrar o novo dentista no sistema. Caso algum dado esteja incorreto ou faltando, uma mensagem de erro será exibida, informando o que precisa ser corrigido.
    </p>

    <li>
        <b>Cancelar Cadastro:</b>
    </li>
    <p>
        Se você não quiser salvar o cadastro ou precisar recomeçar, clique no botão "Cancelar". Isso irá descartará as alterações feitas e retornará você à página anterior sem salvar o novo dentista.
    </p>
</ol>

<h3>Dicas:</h3>
<ul>
    <li>Verifique cuidadosamente os dados antes de salvar, especialmente o número de CRO e o telefone.</li>
    <li>Se o sistema não aceitar o cadastro, verifique se todos os campos obrigatórios foram preenchidos corretamente.</li>
    <li>Se encontrar problemas ao tentar salvar ou preencher o cadastro, verifique a conexão com a internet ou entre em contato com o suporte técnico.</li>
</ul>
\`;
`;
                    case `/dentista/${id}`:
                        return `
<h2>Instruções para Edição de Dentista</h2>
<p>
    Na página de edição de dentista, você pode atualizar as informações de um dentista que já foi cadastrado no sistema. Abaixo estão as instruções detalhadas sobre como realizar as edições e salvar as alterações corretamente:
</p>
<ol>
    <li>
        <b>Visualizar Informações Existentes:</b>
    </li>
    <p>
        Ao acessar a página de edição, as informações atuais do dentista, como <b>Nome</b>, <b>Telefone</b> e <b>CRO</b>, já estarão preenchidas nos campos correspondentes. Revise esses dados antes de fazer qualquer alteração.
    </p>

    <li>
        <b>Editar Informações:</b>
    </li>
    <p>
        Para editar os dados do dentista, basta alterar os valores nos campos desejados. Você pode atualizar qualquer um dos dados, como o nome, telefone ou número de CRO.
    </p>

    <li>
        <b>Salvar Alterações:</b>
    </li>
    <p>
        Após realizar as alterações necessárias, clique no botão "Salvar" para atualizar as informações do dentista no sistema. Se algum campo obrigatório estiver vazio ou se os dados inseridos estiverem inválidos, o sistema exibirá uma mensagem de erro.
    </p>

    <li>
        <b>Cancelar Edição:</b>
    </li>
    <p>
        Se você não deseja salvar as alterações ou se cometeu um erro durante a edição, pode clicar no botão "Cancelar". Isso descartará as alterações feitas e retornará você à página anterior sem modificar o registro do dentista.
    </p>

    <li>
        <b>Verificar Erros ao Salvar:</b>
    </li>
    <p>
        Caso ocorra um erro ao salvar as alterações, uma mensagem de erro será exibida. Verifique se todos os campos obrigatórios foram preenchidos corretamente, como o nome e o número do CRO. Caso o erro persista, entre em contato com o suporte técnico.
    </p>
</ol>

<h3>Dicas:</h3>
<ul>
    <li>Revise as alterações cuidadosamente antes de salvar para garantir que os dados estejam corretos e completos.</li>
    <li>Se o sistema não aceitar o número do CRO, verifique se o formato do número está correto ou se o CRO já está registrado no sistema.</li>
    <li>Em caso de dúvida, consulte o suporte técnico ou verifique se você tem permissão para editar o registro.</li>
</ul>
\`;
`;
                    case "/fornecedores":
                        return `<h2>Instruções para Gerenciamento de Fornecedores</h2>
<p>
    Na página de gerenciamento de fornecedores, você pode visualizar, editar e adicionar novos fornecedores cadastrados no sistema. Abaixo estão as instruções detalhadas sobre como utilizar os recursos disponíveis:
</p>
<ol>
    <li>
        <b>Visualizar Fornecedores:</b>
    </li>
    <p>
        Na tabela, você verá todos os fornecedores cadastrados no sistema, com informações como nome e telefone. Você pode ordenar e pesquisar fornecedores conforme necessário.
    </p>

    <li>
        <b>Editar Fornecedor:</b>
    </li>
    <p>
        Para editar os dados de um fornecedor, clique no ícone de editar na coluna "Ações" ao lado do fornecedor desejado. Isso redirecionará você para a página de edição, onde poderá modificar as informações do fornecedor selecionado.
    </p>

    <li>
        <b>Adicionar Novo Fornecedor:</b>
    </li>
    <p>
        Para adicionar um novo fornecedor ao sistema, clique no botão "Adicionar Fornecedor" no rodapé da página. Isso o levará para uma nova tela onde você poderá preencher as informações do novo fornecedor, como nome e telefone.
    </p>

    <li>
        <b>Erros ao Carregar Fornecedores:</b>
    </li>
    <p>
        Caso ocorra um erro ao carregar os fornecedores, uma mensagem de erro será exibida na parte superior da página. Verifique a conexão com a internet e tente novamente. Se o problema persistir, entre em contato com o suporte técnico.
    </p>
</ol>

<h3>Dicas:</h3>
<ul>
    <li>Revise as informações dos fornecedores antes de salvar qualquer alteração para garantir que os dados estejam corretos.</li>
    <li>Use a função de pesquisa ou ordenação para localizar rapidamente um fornecedor na tabela.</li>
    <li>Se você não encontrar o fornecedor desejado, verifique a possibilidade de que ele ainda não tenha sido cadastrado ou que o sistema tenha apresentado algum erro.</li>
</ul>
`;
                    case "/novo-fornecedor":
                        return`<h2>Instruções para Cadastro de Fornecedor</h2>
<p>
    Na página de cadastro de fornecedores, você pode adicionar novos fornecedores ao sistema. Abaixo estão as instruções detalhadas sobre como utilizar os recursos disponíveis:
</p>
<ol>
    <li>
        <b>Adicionar Novo Fornecedor:</b>
    </li>
    <p>
        Para adicionar um novo fornecedor, preencha os campos obrigatórios "Nome" e "Telefone". O nome pode ter até 100 caracteres, e o telefone deve seguir o formato "(XX) XXXXX-XXXX". Após preencher os campos corretamente, clique no botão "Salvar" para registrar o fornecedor no sistema.
    </p>

    <li>
        <b>Campos Obrigatórios:</b>
    </li>
    <p>
        Os campos "Nome" e "Telefone" são obrigatórios para o cadastro. Se algum desses campos não for preenchido corretamente, uma mensagem de erro será exibida ao lado do campo correspondente, indicando o problema. Certifique-se de preencher todos os campos obrigatórios antes de tentar salvar o cadastro.
    </p>

    <li>
        <b>Formato do Telefone:</b>
    </li>
    <p>
        O campo "Telefone" exige que o número seja informado no formato "(XX) XXXXX-XXXX", onde "XX" representa o código de área e "XXXXX-XXXX" é o número do telefone. Use a máscara fornecida para garantir o formato correto.
    </p>

    <li>
        <b>Cancelar Cadastro:</b>
    </li>
    <p>
        Caso você não deseje adicionar o novo fornecedor, clique no botão "Voltar". Isso cancelará o processo de cadastro e retornará à página anterior sem salvar nenhuma informação.
    </p>
</ol>

<h3>Dicas:</h3>
<ul>
    <li>Certifique-se de preencher corretamente todos os campos obrigatórios antes de clicar em "Salvar".</li>
    <li>Use a máscara de telefone para garantir que o formato esteja correto.</li>
    <li>Se ocorrer algum erro ao salvar o fornecedor, verifique a conexão com a internet e tente novamente.</li>
</ul>
` ;
                    case `/fornecedor/${id}`:
                        return `<h2>Instruções para Edição de Fornecedor</h2>
<p>
    Na página de edição de fornecedores, você pode atualizar as informações de um fornecedor já cadastrado no sistema. Abaixo estão as instruções detalhadas sobre como utilizar os recursos disponíveis:
</p>
<ol>
    <li>
        <b>Editar Informações do Fornecedor:</b>
    </li>
    <p>
        Na página de edição, você pode modificar os campos "Nome" e "Telefone" de um fornecedor. Para isso, altere os valores nos campos correspondentes e clique no botão "Salvar" para atualizar os dados do fornecedor no sistema.
    </p>

    <li>
        <b>Campos Editáveis:</b>
    </li>
    <p>
        O fornecedor pode ter seu "Nome" e "Telefone" alterados. O "Nome" pode ter até 100 caracteres, e o "Telefone" deve seguir o formato "(XX) XXXXX-XXXX". Após realizar as alterações, clique em "Salvar" para salvar as mudanças.
    </p>

    <li>
        <b>Formato do Telefone:</b>
    </li>
    <p>
        O campo "Telefone" exige que o número seja informado no formato "(XX) XXXXX-XXXX", onde "XX" é o código de área e "XXXXX-XXXX" é o número do telefone. Use a máscara fornecida para garantir que o formato esteja correto.
    </p>

    <li>
        <b>Excluir Fornecedor:</b>
    </li>
    <p>
        Caso deseje excluir o fornecedor, clique no botão "Excluir" na parte inferior da página. Isso irá remover permanentemente o fornecedor do sistema. Se não quiser excluir o fornecedor, clique em "Voltar" para retornar à lista de fornecedores sem fazer alterações.
    </p>

    <li>
        <b>Cancelar Edição:</b>
    </li>
    <p>
        Se você não quiser salvar as alterações realizadas, clique no botão "Voltar". Isso cancelará o processo de edição e retornará à página anterior sem salvar as modificações.
    </p>
</ol>

<h3>Dicas:</h3>
<ul>
    <li>Revise as informações antes de salvar as alterações para garantir que todos os dados estão corretos.</li>
    <li>Certifique-se de que o telefone esteja no formato correto antes de salvar.</li>
    <li>Se ocorrer algum erro ao salvar ou excluir o fornecedor, verifique a conexão com a internet ou consulte o suporte técnico.</li>
</ul>
`;
                    case "/relatorios":
                        return `<h2>Instruções para Gerar Relatório de Caixas</h2>
<p>
    Nesta página, você pode gerar um relatório de caixas com base em um intervalo de datas e, opcionalmente, por dentista. O relatório gerado será no formato PDF e poderá ser baixado para o seu dispositivo.
</p>
<ol>
    <li>
        <b>Selecionar Data Início e Data Fim:</b>
    </li>
    <p>
        Você deve selecionar uma data de início e uma data de fim para o intervalo do relatório. As datas selecionadas devem ser até o dia de hoje mais um dia. Certifique-se de que a "Data Início" não seja maior que a "Data Fim".
    </p>

    <li>
        <b>Selecionar Dentista (opcional):</b>
    </li>
    <p>
        O campo "Dentista" permite que você selecione um dentista específico para o qual o relatório será gerado. Se não deseja filtrar por dentista, selecione a opção "Nenhum".
    </p>

    <li>
        <b>Gerar e Baixar Relatório:</b>
    </li>
    <p>
        Após preencher os campos de data e selecionar o dentista, clique no botão "Gerar e Baixar Relatório de Caixas". O relatório será gerado com base nos dados informados e será automaticamente aberto em outra guia no seu dispositivo.
    </p>

    <li>
        <b>Mensagens de Erro:</b>
    </li>
    <p>
        Se houver erros no preenchimento, como datas inválidas ou campos obrigatórios não preenchidos, uma mensagem de erro será exibida. Corrija os erros e tente novamente.
    </p>

    <li>
        <b>Limitações:</b>
    </li>
    <p>
        As datas não podem ser maiores do que a data atual mais um dia. Além disso, a "Data Início" não pode ser posterior à "Data Fim".
    </p>
</ol>

<h3>Dicas:</h3>
<ul>
    <li>Revise o intervalo de datas antes de gerar o relatório para garantir que está correto.</li>
    <li>Se você não precisar de um filtro de dentista, basta deixar a opção "Nenhum" selecionada.</li>
    <li>Se ocorrer algum erro ao gerar o relatório, verifique a sua conexão com a internet ou tente novamente mais tarde.</li>
</ul>
`;
                    case "/receitas":
                        return `<h2>Instruções para Gerenciar Tipos de Receita</h2>
<p>
    Nesta página, você pode visualizar, adicionar ou editar os tipos de receita cadastrados no sistema.
</p>
<ol>
    <li>
        <b>Visualizar Tipos de Receita:</b>
    </li>
    <p>
        Todos os tipos de receita cadastrados são exibidos em uma tabela. Cada entrada mostra a descrição do tipo de receita.
    </p>

    <li>
        <b>Adicionar Novo Tipo de Receita:</b>
    </li>
    <p>
        Para adicionar um novo tipo de receita, clique no botão "Adicionar Tipo Receita" localizado no rodapé da página. Você será redirecionado para um formulário de cadastro.
    </p>

    <li>
        <b>Editar Tipo de Receita:</b>
    </li>
    <p>
        Para editar um tipo de receita existente, clique na descrição do tipo de receita que deseja modificar. Você será redirecionado para a página de edição onde poderá atualizar as informações.
    </p>

    <li>
        <b>Mensagens de Erro:</b>
    </li>
    <p>
        Caso haja algum erro ao carregar os dados (como falha na comunicação com o servidor), uma mensagem de erro será exibida na parte superior da página. Isso pode ocorrer devido a problemas de conexão ou outros erros internos.
    </p>
</ol>

<h3>Dicas:</h3>
<ul>
    <li>Revise os tipos de receita antes de adicionar ou editar para garantir que estão corretos.</li>
    <li>Se ocorrer um erro ao carregar os tipos de receita, tente recarregar a página ou verifique sua conexão com a internet.</li>
</ul>
`;
                    case "/novo-tipo-receita":
                        return `<h2>Instruções para Cadastro de Tipo de Receita</h2>
<p>
    Nesta página, você pode adicionar ou editar tipos de receita no sistema. Se você estiver editando um tipo de receita já existente, as informações serão preenchidas automaticamente no formulário.
</p>
<ol>
    <li>
        <b>Adicionar Novo Tipo de Receita:</b>
    </li>
    <p>
        Para adicionar um novo tipo de receita, preencha o campo "Descrição" e clique em "Salvar". A descrição é obrigatória e deve ser preenchida corretamente.
    </p>

    <li>
        <b>Editar Tipo de Receita:</b>
    </li>
    <p>
        Quando estiver editando um tipo de receita, as informações já cadastradas serão exibidas nos campos. Altere os dados conforme necessário e clique em "Salvar" para confirmar as alterações.
    </p>

    <li>
        <b>Excluir Tipo de Receita:</b>
    </li>
    <p>
        Se você estiver editando um tipo de receita e deseja excluí-lo, clique no botão "Excluir". Isso removerá permanentemente o tipo de receita do sistema.
    </p>

    <li>
        <b>Campos Obrigatórios:</b>
    </li>
    <p>
        O único campo obrigatório para adicionar ou editar um tipo de receita é a "Descrição". Se o campo não for preenchido corretamente, uma mensagem de erro será exibida.
    </p>

    <li>
        <b>Mensagens de Erro:</b>
    </li>
    <p>
        Caso ocorra algum erro ao tentar salvar ou editar o tipo de receita, uma mensagem de erro será exibida acima do formulário. Isso pode ocorrer por problemas no servidor ou na validação dos dados.
    </p>
</ol>

<h3>Dicas:</h3>
<ul>
    <li>Verifique se a descrição do tipo de receita está corretamente preenchida, pois este campo é obrigatório.</li>
    <li>Ao editar um tipo de receita, revise todos os campos antes de salvar para garantir que os dados estejam atualizados.</li>
    <li>Se você deseja cancelar a operação, clique no botão "Voltar" para retornar à página de lista de tipos de receita.</li>
</ul>
`;
                    case `/receitas/${id}`:
                        return `<h2>Instruções para Edição de Tipo de Receita</h2>
<p>
    Nesta página, você pode editar as informações de um tipo de receita existente no sistema. As informações atuais do tipo de receita serão carregadas automaticamente no formulário para que você possa alterá-las.
</p>
<ol>
    <li>
        <b>Editar Descrição:</b>
    </li>
    <p>
        O campo "Descrição" é o único campo editável. Altere o conteúdo conforme necessário. A descrição é um campo obrigatório, e você deve fornecer uma descrição válida antes de salvar as alterações.
    </p>

    <li>
        <b>Salvar Alterações:</b>
    </li>
    <p>
        Após realizar as alterações desejadas, clique em "Salvar" para confirmar as mudanças. Se a descrição não for preenchida corretamente, será exibida uma mensagem de erro informando sobre o campo obrigatório.
    </p>

    <li>
        <b>Excluir Tipo de Receita:</b>
    </li>
    <p>
        Se você deseja excluir o tipo de receita, clique no botão "Excluir". Lembre-se de que a exclusão é permanente e não poderá ser desfeita. Caso não deseje excluir, você pode optar por não clicar nesse botão.
    </p>

    <li>
        <b>Cancelar Edição:</b>
    </li>
    <p>
        Se você decidir não fazer nenhuma alteração ou cancelar a edição, clique em "Voltar" para retornar à lista de tipos de receita.
    </p>

    <li>
        <b>Campos Obrigatórios:</b>
    </li>
    <p>
        A "Descrição" é o único campo obrigató
`;
                    case "/despesas":
                        return `<h2>Instruções para Visualização e Adição de Tipo de Despesa</h2>
<p>
    Nesta página, você pode visualizar os tipos de despesas cadastrados no sistema e adicionar novos tipos conforme necessário.
</p>
<ol>
    <li>
        <b>Visualizar Tipos de Despesa:</b>
    </li>
    <p>
        A tabela exibida na página mostra todos os tipos de despesas registrados, com a descrição de cada tipo. Você pode navegar por essa tabela para verificar os dados existentes.
    </p>

    <li>
        <b>Adicionar Novo Tipo de Despesa:</b>
    </li>
    <p>
        Para adicionar um novo tipo de despesa, clique no botão "Adicionar Tipo Despesa" localizado na parte inferior da página. Isso irá redirecioná-lo para o formulário de criação de um novo tipo de despesa.
    </p>

    <li>
        <b>Editar Tipo de Despesa:</b>
    </li>
    <p>
        Para editar um tipo de despesa existente, clique sobre a linha correspondente na tabela, que redirecionará você para a página de edição do tipo de despesa selecionado.
    </p>

    <li>
        <b>Mensagens de Erro:</b>
    </li>
    <p>
        Caso ocorra algum erro ao carregar os tipos de despesa ou ao realizar qualquer outra operação, uma mensagem de erro será exibida no topo da página, informando o problema encontrado.
    </p>
</ol>

<h3>Dicas:</h3>
<ul>
    <li>Se você precisar editar ou excluir algum tipo de despesa, clique na descrição do tipo para navegar até a página de edição.</li>
    <li>Adicione novos tipos de despesas sempre que necessário, utilizando o botão "Adicionar Tipo Despesa".</li>
    <li>Caso haja erro ao carregar as informações, verifique sua conexão ou entre em contato com o suporte para resolução.</li>
</ul>
`;
                    case "/novo-tipo-despesa":
                        return `<h2>Instruções para Cadastro de Novo Tipo de Despesa</h2>
<p>
    Nesta página, você pode adicionar um novo tipo de despesa ou editar um tipo de despesa existente.
</p>

<ol>
    <li>
        <b>Cadastro de Novo Tipo de Despesa:</b>
    </li>
    <p>
        Para cadastrar um novo tipo de despesa, insira uma descrição na caixa de texto. Este campo é obrigatório.
    </p>

    <li>
        <b>Edição de Tipo de Despesa:</b>
    </li>
    <p>
        Caso esteja editando um tipo de despesa já existente, as informações atuais aparecerão automaticamente. Você pode alterar a descrição e salvar as alterações.
    </p>

    <li>
        <b>Validação de Campos:</b>
    </li>
    <p>
        Ao tentar salvar um novo tipo de despesa ou atualizar um existente, o sistema valida que o campo de descrição não está vazio. Caso contrário, uma mensagem de erro será exibida solicitando o preenchimento do campo.
    </p>

    <li>
        <b>Erro ao Salvar:</b>
    </li>
    <p>
        Se ocorrer um erro ao salvar as informações (como problemas de conexão ou falha no servidor), uma mensagem de erro será exibida. Ela poderá indicar o tipo de erro ou sugerir uma ação corretiva.
    </p>

    <li>
        <b>Excluir Tipo de Despesa:</b>
    </li>
    <p>
        Caso seja necessário excluir um tipo de despesa, clique no botão "Excluir", visível apenas quando você estiver editando um tipo de despesa existente. Confirme a exclusão para removê-lo permanentemente.
    </p>

    <li>
        <b>Botões de Navegação:</b>
    </li>
    <p>
        Ao concluir o cadastro ou edição, você pode salvar as alterações. Se desejar cancelar a operação, clique no botão "Voltar" para retornar à página anterior.
    </p>
</ol>

<h3>Dicas:</h3>
<ul>
    <li>Sempre verifique se a descrição foi corretamente preenchida antes de salvar.</li>
    <li>Se precisar excluir um tipo de despesa, certifique-se de que não há dependências associadas antes de confirmar a exclusão.</li>
    <li>Em caso de erro de validação, revise os campos obrigatórios e tente novamente.</li>
</ul>
`;
                    case `/despesas/${id}`:
                        return `<h2>Instruções para Cadastro de Novo Tipo de Despesa</h2>
        <p>
            Nesta página, você pode adicionar um novo tipo de despesa ou editar um tipo de despesa existente.
        </p>
        <ol>
            <li>
                <b>Cadastro de Novo Tipo de Despesa:</b>
            </li>
            <p>
                Para cadastrar um novo tipo de despesa, insira uma descrição na caixa de texto. Este campo é obrigatório.
            </p>

            <li>
                <b>Edição de Tipo de Despesa:</b>
            </li>
            <p>
                Caso esteja editando um tipo de despesa já existente, as informações atuais aparecerão automaticamente. Você pode alterar a descrição e salvar as alterações.
            </p>

            <li>
                <b>Validação de Campos:</b>
            </li>
            <p>
                Ao tentar salvar um novo tipo de despesa ou atualizar um existente, o sistema valida que o campo de descrição não está vazio. Caso contrário, uma mensagem de erro será exibida solicitando o preenchimento do campo.
            </p>

            <li>
                <b>Erro ao Salvar:</b>
            </li>
            <p>
                Se ocorrer um erro ao salvar as informações (como problemas de conexão ou falha no servidor), uma mensagem de erro será exibida. Ela poderá indicar o tipo de erro ou sugerir uma ação corretiva.
            </p>

            <li>
                <b>Excluir Tipo de Despesa:</b>
            </li>
            <p>
                Caso seja necessário excluir um tipo de despesa, clique no botão "Excluir", visível apenas quando você estiver editando um tipo de despesa existente. Confirme a exclusão para removê-lo permanentemente.
            </p>

            <li>
                <b>Botões de Navegação:</b>
            </li>
            <p>
                Ao concluir o cadastro ou edição, você pode salvar as alterações. Se desejar cancelar a operação, clique no botão "Voltar" para retornar à página anterior.
            </p>
        </ol>

        <h3>Dicas:</h3>
        <ul>
            <li>Sempre verifique se a descrição foi corretamente preenchida antes de salvar.</li>
            <li>Se precisar excluir um tipo de despesa, certifique-se de que não há dependências associadas antes de confirmar a exclusão.</li>
            <li>Em caso de erro de validação, revise os campos obrigatórios e tente novamente.</li>
        </ul>`;
                    case "/usuarios":
                        return `<h2>Instruções para Gerenciamento de Usuários</h2>
        <p>
            Nesta página, você pode visualizar a lista de usuários cadastrados, adicionar um novo usuário e editar informações de usuários existentes.
        </p>
        <ol>
            <li>
                <b>Visualização de Usuários:</b>
            </li>
            <p>
                A lista de usuários é exibida em uma tabela, mostrando informações como Login, Email e se o usuário tem permissões de administrador.
            </p>

            <li>
                <b>Adicionar Novo Usuário:</b>
            </li>
            <p>
                Para adicionar um novo usuário, clique no botão "Adicionar Usuário". Você será redirecionado para uma página onde poderá preencher os dados necessários.
            </p>

            <li>
                <b>Editar Usuário:</b>
            </li>
            <p>
                Para editar um usuário, clique no ícone de edição (geralmente um lápis) ao lado do usuário desejado na tabela. Isso abrirá um modal de edição onde você pode atualizar as informações do usuário, como Login, Email e permissões.
            </p>

            <li>
                <b>Modal de Edição de Usuário:</b>
            </li>
            <p>
                No modal de edição, você pode alterar os campos do usuário e clicar em "Salvar" para confirmar as mudanças. O modal também pode ser fechado sem salvar as alterações clicando no botão "Cancelar".
            </p>

            <li>
                <b>Erro ao Carregar Usuários:</b>
            </li>
            <p>
                Se houver problemas ao carregar os dados dos usuários, uma mensagem de erro será exibida. O sistema tentará carregar os dados novamente ou mostrar o erro detalhado.
            </p>

            <li>
                <b>Atualização de Dados:</b>
            </li>
            <p>
                Após editar um usuário e salvar as alterações, a tabela será automaticamente atualizada com as novas informações do usuário.
            </p>

            <li>
                <b>Botões de Navegação:</b>
            </li>
            <p>
                O botão "Adicionar Usuário" permite que você cadastre novos usuários. Caso haja algum erro, o sistema exibirá uma mensagem para que você possa tomar as ações corretivas.
            </p>
        </ol>

        <h3>Dicas:</h3>
        <ul>
            <li>Verifique se o email e o login do usuário estão corretos antes de confirmar a edição.</li>
            <li>Caso haja problemas ao editar ou adicionar um usuário, certifique-se de que todos os campos obrigatórios estão preenchidos corretamente.</li>
            <li>Se o usuário for um administrador, verifique as permissões antes de realizar qualquer alteração em seu perfil.</li>
        </ul>`;
                    case "/novo-usuario":
                        return `<h2>Instruções para Cadastro de Novo Usuário</h2>
<p>
    Nesta página, você pode cadastrar um novo usuário no sistema, preenchendo informações básicas como o login, a senha e o email.
</p>

<ol>
    <li>
        <b>Cadastro de Novo Usuário:</b>
    </li>
    <p>
        Para adicionar um novo usuário, preencha os campos obrigatórios: "Login", "Senha" e "Email". 
        - O campo "Login" deve ter entre 2 e 50 caracteres.
        - A "Senha" deve ter entre 8 e 50 caracteres.
        - O "Email" deve ser um email válido.
    </p>

    <li>
        <b>Validação de Campos:</b>
    </li>
    <p>
        Ao tentar salvar o novo usuário, o sistema validará os campos. Caso algum campo obrigatório não esteja preenchido corretamente:
        - O campo "Login" deve ter entre 2 e 50 caracteres.
        - A senha deve ser de pelo menos 8 caracteres.
        - O campo "Email" deve ter um formato válido (ex: nome@dominio.com).
    </p>

    <li>
        <b>Erro ao Salvar:</b>
    </li>
    <p>
        Se ocorrer um erro ao salvar as informações, o sistema exibirá mensagens de erro específicas, como: 
        - "O Login deve ter entre 2 e 50 caracteres."
        - "A senha deve ter entre 8 e 50 caracteres."
        - "O email deve ser válido."
    </p>

    <li>
        <b>Cancelar Cadastro:</b>
    </li>
    <p>
        Caso você queira cancelar o cadastro, clique no botão "Voltar" para retornar à lista de usuários.
    </p>

    <li>
        <b>Botões de Navegação:</b>
    </li>
    <p>
        Ao concluir o cadastro, você pode salvar as informações clicando no botão "Salvar". Caso contrário, clique em "Voltar" para retornar à página anterior sem salvar.
    </p>
</ol>

<h3>Dicas:</h3>
<ul>
    <li>Certifique-se de preencher corretamente todos os campos obrigatórios antes de salvar o novo usuário.</li>
    <li>Verifique se o formato do email está correto antes de salvar.</li>
    <li>Em caso de erro, revise as mensagens de erro e corrija os campos indicados.</li>
</ul>
`;
                    case "/login":
                        return `<h2>Instruções para a Página de Login</h2>
<p>
    Esta página permite que você faça login na aplicação de forma segura. Siga as instruções abaixo para utilizar a tela de login corretamente.
</p>
<ol>
    <li>
        <b>Preencher o Campo de Login:</b>
    </li>
    <p>
        Digite seu nome de usuário no campo "Login". Este é um campo obrigatório e deve ser preenchido com o nome de usuário fornecido pela administração do sistema.
    </p>

    <li>
        <b>Preencher o Campo de Senha:</b>
    </li>
    <p>
        Digite sua senha no campo "Senha". Este é um campo obrigatório. Você pode alternar a visibilidade da senha clicando no ícone de olho ao lado do campo. Se o ícone exibir um olho aberto, a senha estará visível; caso contrário, a senha estará oculta.
    </p>

    <li>
        <b>Submeter o Formulário:</b>
    </li>
    <p>
        Após preencher os campos de login e senha, clique no botão "Login" para enviar o formulário. Se as credenciais estiverem corretas, você será redirecionado para a página principal do sistema. Caso contrário, uma mensagem de erro será exibida.
    </p>

    <li>
        <b>Mensagens de Erro:</b>
    </li>
    <p>
        Se houver um problema com o login, como credenciais incorretas, uma mensagem de erro será exibida abaixo dos campos de entrada. Revise suas informações e tente novamente.
    </p>

</ol>

<h3>Dicas:</h3>
<ul>
    <li>Verifique se o caps lock do teclado está ativado ao digitar sua senha.</li>
    <li>Certifique-se de que o login digitado esteja correto, especialmente se contiver caracteres especiais.</li>
    <li>Em caso de falha no login repetida, entre em contato com o suporte técnico.</li>
</ul>`;
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
                <div dangerouslySetInnerHTML={{ __html: getHelpContent() }} />
                <button onClick={onClose} className={styles.closeButton}>
                    Fechar
                </button>
            </div>
        </div>
    );
}

export default HelpModal;
