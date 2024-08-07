# Dicionário de Dados

[voltar](../../../README.md)


# Dicionário de Dados

    

**Tabela**: usuario

**Descrição**: Tabela que armazena dados dos usuários para login

| **Coluna**  |**Tipo**|**Tamanho**|**Restrições**|**Descrição**|
|:------------|:-------|:----------|:-------------|:------------|
|id_usuario           |BIGINT  | 8 bytes   |PK            | Identificador para o usuario|   
|login        |VARCHAR(45)    | 1-46 bytes   |UK, NN            | Login/username do usuario|
|senha           |VARCHAR(64)  | 1-65 bytes   |    NN        | Senha do usuario|  
|email_recuperacao          |VARCHAR(256)  | 1-257 bytes   |     NN       | Email do usuario |    
|ativo           |BIT  | 1 bit   |    NN        | Identifica se o usuario está ativo|   
|perfis| ENUM|1 byte| |Identifica o perfil/papel do usuario |

**Tabela**: caixa

**Descrição**: Tabela que armazena dados sobre os caixas

| **Coluna**  |**Tipo**|**Tamanho**|**Restrições**|**Descrição**|
|:------------|:-------|:----------|:-------------|:------------|
|id_caixa           |BIGINT  | 8 bytes   |PK            | Identificador para o caixa|   
|data_hora_abertura        |TIMESTAMP    | 4 bytes   |            | Data e hora de abertura do caixa|
|data_hora_fechamento        |TIMESTAMP    | 4 bytes   |            | Data e hora de fechamento do caixa|  
|fk_id_usuario          |BIGINT  | 8 bytes   | FK           | Identifica o usuario responsavel | 

**Tabela**: item_movimento

**Descrição**: Tabela que armazena dados sobre os movimentos

| **Coluna**  |**Tipo**|**Tamanho**|**Restrições**|**Descrição**|
|:------------|:-------|:----------|:-------------|:------------|
|id_movimento           |BIGINT  | 8 bytes   |PK            | Identificador para o movimento|   
|operacao        |CHAR    | 1 byte   | ['E','S','A','G']           | Operação realizada [**E**ntrada, **S**aída, **A**porte, san**G**ria]|
|modalidade        |CHAR    | 1 byte   | ['C','D','P','B', 'N']           | Operação realizada [**C**rédito, **D**ébito, **P**ix, **B**oleto, di**N**heiro]|  
|valor          |FLOAT  | 4 bytes   |            | Valor do movimento |
|data_hora_movimento       |TIMESTAMP    | 4 bytes   |            | Data e hora do movimento | 
|descricao_complementar       |TEXT    |    |            | Descricao curta do movimento | 
|fk_id_caixa          |BIGINT  | 8 bytes   | FK           | Identifica o caixa pertencente |
|fk_id_dentista          |BIGINT  | 8 bytes   | FK           | Identifica o dentista responsavel |
|fk_id_fornecedor          |BIGINT  | 8 bytes   | FK           | Identifica o fornecedor responsavel |
|fk_id_tipo_receita          |BIGINT  | 8 bytes   | FK           | Identifica o tipo de receita | 
|fk_id_tipo_despesa          |BIGINT  | 8 bytes   | FK           | Identifica o tipo de despesa |    

**Tabela**: dentista

**Descrição**: Tabela que armazena dados sobre os dentistas

| **Coluna**  |**Tipo**|**Tamanho**|**Restrições**|**Descrição**|
|:------------|:-------|:----------|:-------------|:------------|
|id_dentista           |BIGINT  | 8 bytes   |PK            | Identificador para o dentista|   
|nome       |VARCHAR(45)    | 1-46 bytes   |UK, NN            | Nome do dentista|
|CRO           |CHARACTER(10)  | 10 bytes   |    NN        | CRO do dentista |  
|CPF          |CHARACTER(11)  | 11 bytes   |     NN       | CPF do dentista |    
|fone           |CHARACTER(11)  | 11 bytes   |    NN        | Telefone do dentista|   
|percentual_recebido| FLOAT|4 bytes| |Percentual de recebimento do dentista sobre os movimentos |

**Tabela**: fornecedor

**Descrição**: Tabela que armazena dados sobre os fornecedores

| **Coluna**  |**Tipo**|**Tamanho**|**Restrições**|**Descrição**|
|:------------|:-------|:----------|:-------------|:------------|
|id_fornecedor           |BIGINT  | 8 bytes   |PK            | Identificador para o fornecedor |   
|nome       |VARCHAR(45)    | 1-46 bytes   |UK, NN            | Nome do dentista| 
|fone           |CHARACTER(11)  | 11 bytes   |    NN        | Telefone do dentista|   
|endereço| TEXT| | |Endereço do fornecedor |

**Tabela**: tipo_receita

**Descrição**: Tabela que armazena dados sobre os tipos de receita

| **Coluna**  |**Tipo**|**Tamanho**|**Restrições**|**Descrição**|
|:------------|:-------|:----------|:-------------|:------------|
|id_tipo_receita           |BIGINT  | 8 bytes   |PK            | Identificador para o tipo de receita|
|descricao| TEXT| | |Descricao sobre o tipo de entrada |

**Tabela**: tipo_despesa

**Descrição**: Tabela que armazena dados sobre os tipos de despesa

| **Coluna**  |**Tipo**|**Tamanho**|**Restrições**|**Descrição**|
|:------------|:-------|:----------|:-------------|:------------|
|id_tipo_despesa           |BIGINT  | 8 bytes   |PK            | Identificador para o tipo de despesa|
|descricao| TEXT| | |Descricao sobre o tipo de despesa |

