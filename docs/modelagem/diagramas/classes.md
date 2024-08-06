# Diagramas de Classes

## Diagrama I - Relações entidade-entidade entidade-controle

```mermaid
classDiagram
    class Usuario {
        <<entity>>
        -id_usuario : Long
        -login : String
        -senha : String
    }

    class UsuarioController {
        <<control>>
        +getUsuario(Long id_usuario) : ResponseEntity<Usuario>
        +createUsuario(Usuario usuario) : ResponseEntity<Void>
        +updateUsuario(Long id_usuario, Usuario usuario) : ResponseEntity<Void>
        +deleteUsuario(Long id_usuario) : ResponseEntity<Void>
    }

    UsuarioController ..> Usuario

    class Caixa {
        <<entity>>
        -id_caixa : Long
        -data_hora_abertura : Timestamp
        -data_hora_fechamento : Timestamp
    }

    Usuario "1" *-- "0..*" Caixa 

    class CaixaController {
        <<control>>
        +getCaixaByUsuario(Long id) : ResponseEntity<List<Caixa>>
        +getCaixa(Long id_caixa) : ResponseEntity<Caixa>
        +abrirCaixa() : ResponseEntity<Void> 
        +fecharCaixa() : ResponseEntity<Void>
    }

    CaixaController ..> Caixa
    CaixaController ..> Usuario

    class ItemMovimento {
        <<entity>>
        -id_movimento : Long
        -operacao : Character
        -modalidade_pagamento : Character
        -valor : Double
        -data_hora_movimento : Timestamp
        -descricao_complementar : String
    }

    Caixa "1" *-- "0..*" ItemMovimento

    class ItemMovimentoController {
        <<control>>
        +getItemMovimento(Long id_movimento) : ResponseEntity<ItemMovimento>
        +createItemMovimento(ItemMovimento movimento) : ResponseEntity<Void>
        +updateItemMovimento(Long id_movimento, ItemMovimento item_movimento) : ResponseEntity<Void>
        +deleteItemMovimento(Long id_movimento) : ResponseEntity<Void>
    }

    ItemMovimento <.. ItemMovimentoController

    class Dentista {
        <<entity>>
        -id_dentista : Long
        -nome : String
        -CRO : Character[10]
        -CPF : Character[11]
        -fone : Character[11]
        -percentual_recebido : Double
    }

    ItemMovimento "0..*" o-- "0..1" Dentista

    class DentistaController {
        <<control>>
        +getDentista(Long id_dentista)
        +createDentista(Dentista dentista)
        +updateDentista(Long id_dentista, Dentista dentista)
        +deleteDentista(Long id_dentista)
    }

    Dentista <.. DentistaController

    class Fornecedor {
        <<entity>>
        -id_fornecedor : Long
        -nome : String
        -fone : Character[11]
        -endereco : String
    }

    ItemMovimento "0..*" o-- "0..1" Fornecedor

    class FornecedorController {
        <<control>>
        +getFornecedor(Long id_fornecedor)
        +createFornecedor(Fornecedor fornecedor)
        +updateFornecedor(Long id_fornecedor, Fornecedor fornecedor)
        +deleteFornecedor(Long id_fornecedor)
    }

    Fornecedor <.. FornecedorController
    
    class TipoReceita {
        <<entity>>
        -id_receita : Long
        -descricao : String
    }

    ItemMovimento "0..*" o-- "0..1" TipoReceita

    class TipoReceitaController {
        <<control>>
        +getTipoReceita(Long id_receita)
        +createTipoReceita(TipoReceita receita)
        +updateTipoReceita(Long id_receita, TipoReceita tipo_receita)
        +deleteTipoReceita(Long id_receita)
    }

    TipoReceita <.. TipoReceitaController

    class TipoDespesa {
        <<entity>>
        -id_despesa : Long
        -descricao : String
    }

    ItemMovimento "0..*" o-- "0..1" TipoDespesa

    class TipoDespesaController {
        <<control>>
        +getTipoDespesa(Long id_despesa)
        +createTipoDespesa(TipoDespesa despesa)
        +updateTipoDespesa(Long id_despesa, TipoDespesa tipo_despesa)
        +deleteTipoDespesa(Long id_despesa)
    }

    TipoDespesa <.. TipoDespesaController
```

## Diagrama II - Relações ControlItemMovimento-entidades

```mermaid
classDiagram
    class ControlItemMovimento {
        <<control>>
        -ItemMovimentoService itemMovimentoService
        -DentistaService dentistaService
        -FornecedorService fornecedorService
        -TipoReceitaService tipoReceitaService
        -TipoDespesaService tipoDepesaService
        +getItemMovimento(Long id_movimento) : ResponseEntity<ItemMovimento>
        +getItemMovimentoByDentistaAndCaixa(Long id_dentista, Long id_caixa) : ResponseEntity<List<ItemMovimento>>
        +getItemMovimentoByFornecedorAndCaixa(Long id_fornecedor, Long id_caixa) : ResponseEntity<List<ItemMovimento>>
        +getItemMovimentoByOperacao(Character operacao) : ResponseEntity<List<ItemMovimento>>
        +getItemMovimentoByCaixa(Long id_caixa) : ResponseEntity<List<ItemMovimento>>
        +getItemMovimentoByDia(Date dia) : ResponseEntity<List<ItemMovimento>>
        +createItemMovimento(ItemMovimento movimento) : ResponseEntity<Void>
        +updateItemMovimento(Long id_movimento, ItemMovimento item_movimento) : ResponseEntity<Void>
        +deleteItemMovimento(Long id_movimento) : ResponseEntity<Void>
    }

    class Caixa {
        <<entity>>
        -id_caixa : Long
        -data_hora_abertura : Timestamp
        -data_hora_fechamento : Timestamp
    }

    class ItemMovimento {
        <<entity>>
        -id_movimento : Long
        -operacao : Character
        -modalidade_pagamento : Character
        -valor : Double
        -data_hora_movimento : Timestamp
        -descricao_complementar : String
    }

    class Dentista {
        <<entity>>
        -id_dentista : Long
        -nome : String
        -CRO : Character[10]
        -CPF : Character[11]
        -fone : Character[11]
        -percentual_recebido : Double
    }

    class Fornecedor {
        <<entity>>
        -id_fornecedor : Long
        -nome : String
        -fone : Character[11]
        -endereco : String
    }

    class TipoReceita {
        <<entity>>
        -id_receita : Long
        -descricao : String
    }

    class TipoDespesa {
        <<entity>>
        -id_despesa : Long
        -descricao : String
    }

    Caixa <.. ControlItemMovimento
    ItemMovimento <.. ControlItemMovimento
    ControlItemMovimento ..> Dentista
    ControlItemMovimento ..> Fornecedor
    ControlItemMovimento ..> TipoReceita
    ControlItemMovimento ..> TipoDespesa
```

## Diagrama III - Relações boundary-control

```mermaid
classDiagram
    class view_admnistrador{
        <<boundary>>
    }

    class view_operador{
        <<boundary>>
    }

    view_admnistrador --|> view_operador

    class view_usuario{
        <<boundary>>
    }

    view_operador --|> view_usuario

    %% Controllers

    class DentistaController {
        <<control>>
        +getDentista(Long id_dentista)
        +createDentista(Dentista dentista)
        +updateDentista(Long id_dentista, Dentista dentista)
        +deleteDentista(Long id_dentista)
    }

    class UsuarioController {
        <<control>>
        +getUsuario(Long id_usuario) : ResponseEntity<Usuario>
        +createUsuario(Usuario usuario) : ResponseEntity<Void>
        +updateUsuario(Long id_usuario, Usuario usuario) : ResponseEntity<Void>
        +deleteUsuario(Long id_usuario) : ResponseEntity<Void>
    }

    DentistaController <-- view_admnistrador
    UsuarioController <-- view_admnistrador

    class CaixaController {
        <<control>>
        +getCaixaByUsuario(Long id) : ResponseEntity<List<Caixa>>
        +getCaixa(Long id_caixa) : ResponseEntity<Caixa>
        +abrirCaixa() : ResponseEntity<Void> 
        +fecharCaixa() : ResponseEntity<Void>
    }

    class ItemMovimentoController {
        <<control>>
        +getItemMovimento(Long id_movimento) : ResponseEntity<ItemMovimento>
        +createItemMovimento(ItemMovimento movimento) : ResponseEntity<Void>
        +updateItemMovimento(Long id_movimento, ItemMovimento item_movimento) : ResponseEntity<Void>
        +deleteItemMovimento(Long id_movimento) : ResponseEntity<Void>
    }

    CaixaController <-- view_operador
    ItemMovimentoController <-- view_operador

    class FornecedorController {
        <<control>>
        +getFornecedor(Long id_fornecedor)
        +createFornecedor(Fornecedor fornecedor)
        +updateFornecedor(Long id_fornecedor, Fornecedor fornecedor)
        +deleteFornecedor(Long id_fornecedor)
    }

    class TipoReceitaController {
        <<control>>
        +getTipoReceita(Long id_receita)
        +createTipoReceita(TipoReceita receita)
        +updateTipoReceita(Long id_receita, TipoReceita tipo_receita)
        +deleteTipoReceita(Long id_receita)
    }

    class TipoDespesaController {
        <<control>>
        +getTipoDespesa(Long id_despesa)
        +createTipoDespesa(TipoDespesa despesa)
        +updateTipoDespesa(Long id_despesa, TipoDespesa tipo_despesa)
        +deleteTipoDespesa(Long id_despesa)
    }

    class RelatorioController{
        <<control>>
        +getItemMovimentoByCaixa(Long id_caixa, Long id_dentista, Long id_fornecedor, Long id_tipo_receita, Long id_tipo_despesa, Character operacao)
        +getItemMoviemtnoByPeriodo(Date inicio, Date fim, Long id_dentista, Long id_fornecedor, Long id_tipo_receita, Long id_tipo_despesa, Character operacao)
    }

    class LoginController{
        <<control>>
    }


    view_usuario --> FornecedorController
    view_usuario --> TipoReceitaController
    view_usuario --> TipoDespesaController
    view_usuario --> RelatorioController
    view_usuario --> LoginController
```

## Diagrama IV - Relações control-service-repository / service-service

```mermaid
classDiagram
    %% Controllers
    
    class UsuarioController {
        <<control>>
        +getUsuario(Long id_usuario) : ResponseEntity<Usuario>
        +createUsuario(Usuario usuario) : ResponseEntity<Void>
        +updateUsuario(Long id_usuario, Usuario usuario) : ResponseEntity<Void>
        +deleteUsuario(Long id_usuario) : ResponseEntity<Void>
    }

    class CaixaController {
        <<control>>
        +getCaixaByUsuario(Long id) : ResponseEntity<List<Caixa>>
        +getCaixa(Long id_caixa) : ResponseEntity<Caixa>
        +abrirCaixa() : ResponseEntity<Void> 
        +fecharCaixa() : ResponseEntity<Void>
    }

    class ItemMovimentoController {
        <<control>>
        +getItemMovimento(Long id_movimento) : ResponseEntity<ItemMovimento>
        +createItemMovimento(ItemMovimento movimento) : ResponseEntity<Void>
        +updateItemMovimento(Long id_movimento, ItemMovimento item_movimento) : ResponseEntity<Void>
        +deleteItemMovimento(Long id_movimento) : ResponseEntity<Void>
    }

    class DentistaController {
        <<control>>
        +getDentista(Long id_dentista)
        +createDentista(Dentista dentista)
        +updateDentista(Long id_dentista, Dentista dentista)
        +deleteDentista(Long id_dentista)
    }

    class FornecedorController {
        <<control>>
        +getFornecedor(Long id_fornecedor)
        +createFornecedor(Fornecedor fornecedor)
        +updateFornecedor(Long id_fornecedor, Fornecedor fornecedor)
        +deleteFornecedor(Long id_fornecedor)
    }

    class TipoReceitaController {
        <<control>>
        +getTipoReceita(Long id_receita)
        +createTipoReceita(TipoReceita receita)
        +updateTipoReceita(Long id_receita, TipoReceita tipo_receita)
        +deleteTipoReceita(Long id_receita)
    }

    class TipoDespesaController {
        <<control>>
        +getTipoDespesa(Long id_despesa)
        +createTipoDespesa(TipoDespesa despesa)
        +updateTipoDespesa(Long id_despesa, TipoDespesa tipo_despesa)
        +deleteTipoDespesa(Long id_despesa)
    }

    class RelatorioController{
        <<control>>
        +getItemMovimentoByCaixa(Long id_caixa, Long id_dentista, Long id_fornecedor, Long id_tipo_receita, Long id_tipo_despesa, Character operacao)
        +getItemMoviemtnoByPeriodo(Date inicio, Date fim, Long id_dentista, Long id_fornecedor, Long id_tipo_receita, Long id_tipo_despesa, Character operacao)
    }

    class LoginController{
        <<control>>
    }

    %% Services

    class UsuarioService {
        <<service>>
        +findById(Long id_usuario) : Usuario
        +createUsuario(Usuario usuario) : Void
        +updateUsuario(Long id_usuario, Usuario usuario) : Void
        +deleteUsuario(Long id_usuario) : Void
    }

    class CaixaService {
        <<service>>
        +findById(Long id_caixa) : Caixa
        +createCaixa(Caixa caixa) : Void 
        +updateCaixa(Caixa caixa) : Void
    }

    class ItemMovimentoService {
        <<service>>
        +findById(Long id_movimento) : ItemMovimento
        +findByCaixa_Id(Long id_caixa) : List<ItemMovimento>
        +findByDentista_IdAndCaixa_Id(Long id_dentista, Long id_caixa) : List<ItemMovimento>
        +findByFornecedor_IdAndCaixa_Id(Long id_fornecedor, Long id_caixa) : List<ItemMovimento>
        +findByTipoReceita_IdAndCaixa_Id(Long id_tipo_receita,Long id_caixa) : List<ItemMovimento>
        +findByTipoDespesa_IdAndCaixa_Id(Long id_tipo_despesa, Long id_caixa) : List<ItemMovimento>
        +findByOperacaoAndCaixa_Id(Character operacao, Long id_caixa) : List<ItemMovimento>
        +findByDataBetween(Date inicio, Date fim) : ItemMovimento
        +findByDentista_IdAndDataBetween(Long id_dentista, Date inicio, Date fim) : List<ItemMovimento>
        +findByFornecedor_IdAndDataBetween(Long id_fornecedor, Long id_caixa) : List<ItemMovimento>
        +findByTipoReceita_IdAndDataBetween(Long id_tipo_receita, Date inicio, Date fim) : List<ItemMovimento>
        +findByTipoDespesa_IdAndDataBetween(Long id_tipo_despesa, Date inicio, Date fim) : List<ItemMovimento>
        +findByOperacaoAndDataBetween(Character operacao,Date inicio, Date fim) : List<ItemMovimento>
        +createItemMovimento(ItemMovimento movimento) : Void
        +updateItemMovimento(Long id_movimento, ItemMovimento item_movimento) : Void
        +deleteItemMovimento(Long id_movimento) : Void
    }

    class DentistaService {
        <<service>>
        +findById(Long id_dentista)
        +createDentista(Dentista dentista)
        +updateDentista(Long id_dentista, Dentista dentista)
        +deleteDentista(Long id_dentista)
    }

    class FornecedorService {
        <<service>>
        +findById(Long id_fornecedor)
        +createFornecedor(Fornecedor fornecedor)
        +updateFornecedor(Long id_fornecedor, Fornecedor fornecedor)
        +deleteFornecedor(Long id_fornecedor)
    }

    class TipoReceitaService {
        <<service>>
        +findById(Long id_receita)
        +createTipoReceita(TipoReceita receita)
        +updateTipoReceita(Long id_receita, TipoReceita tipo_receita)
        +deleteTipoReceita(Long id_receita)
    }

    class TipoDespesaService {
        <<service>>
        +findById(Long id_despesa)
        +createTipoDespesa(TipoDespesa despesa)
        +updateTipoDespesa(Long id_despesa, TipoDespesa tipo_despesa)
        +deleteTipoDespesa(Long id_despesa)
    }

    %% Repositories

    class UsuarioRepository {
        <<repository>>
    }

    class CaixaRepository {
        <<repository>>
    }

    class ItemMovimentoRepository {
        <<repository>>
        +findById(Long id_movimento) : Optional<ItemMovimento>
        +findByCaixa_Id(Long id_caixa) : List<ItemMovimento>
        +findByDentista_IdAndCaixa_Id(Long id_dentista, Long id_caixa) : List<ItemMovimento>
        +findByFornecedor_IdAndCaixa_Id(Long id_fornecedor, Long id_caixa) : List<ItemMovimento>
        +findByTipoReceita_IdAndCaixa_Id(Long id_tipo_receita,Long id_caixa) : List<ItemMovimento>
        +findByTipoDespesa_IdAndCaixa_Id(Long id_tipo_despesa, Long id_caixa) : List<ItemMovimento>
        +findByOperacaoAndCaixa_Id(Character operacao, Long id_caixa) : List<ItemMovimento>
        +findByDataBetween(Date inicio, Date fim) : Optional<ItemMovimento>
        +findByDentista_IdAndDataBetween(Long id_dentista, Date inicio, Date fim) : List<ItemMovimento>
        +findByFornecedor_IdAndDataBetween(Long id_fornecedor, Long id_caixa) : List<ItemMovimento>
        +findByTipoReceita_IdAndDataBetween(Long id_tipo_receita, Date inicio, Date fim) : List<ItemMovimento>
        +findByTipoDespesa_IdAndDataBetween(Long id_tipo_despesa, Date inicio, Date fim) : List<ItemMovimento>
        +findByOperacaoAndDataBetween(Character operacao,Date inicio, Date fim) : List<ItemMovimento>
    }

    class DentistaRepository {
        <<repository>>
    }

    class FornecedorRepository {
        <<repository>>
    }

    class TipoReceitaRepository {
        <<repository>>
    }

    class TipoDespesaRepository {
        <<repository>>
    }

    %% control -> service / service -> boundary

    UsuarioController --> UsuarioService
    UsuarioService --> UsuarioRepository

    CaixaController --> CaixaService
    CaixaService --> CaixaRepository

    ItemMovimentoController --> ItemMovimentoService
    ItemMovimentoService --> ItemMovimentoRepository

    DentistaController --> DentistaService
    DentistaService --> DentistaRepository

    FornecedorController --> FornecedorService
    FornecedorService --> FornecedorRepository

    TipoReceitaController --> TipoReceitaService
    TipoReceitaService --> TipoReceitaRepository

    TipoDespesaController --> TipoDespesaService
    TipoDespesaService --> TipoDespesaRepository

    LoginController --> UsuarioService

    RelatorioController --> ItemMovimentoService

    %% service -> service

    CaixaService ..> UsuarioService

    ItemMovimentoService ..> CaixaService
    ItemMovimentoService ..> DentistaService
    ItemMovimentoService ..> FornecedorService
    ItemMovimentoService ..> TipoReceitaService
    ItemMovimentoService ..> TipoDespesaService
    
```
