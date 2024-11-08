package com.gabrielpdev.siso.models;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

import java.time.OffsetDateTime;

@Getter
@Setter
@Entity
@Table(name = "item_movimento")
public class ItemMovimento {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_movimento", nullable = false)
    private Long id;

    @NotNull
    @Column(name = "operacao", nullable = false, length = Integer.MAX_VALUE)
    private String operacao;

    @NotNull
    @Column(name = "modalidade_pagamento", nullable = false, length = Integer.MAX_VALUE)
    private String modalidadePagamento;

    @NotNull
    @Column(name = "valor", nullable = false)
    private Float valor;

    @NotNull
    @Column(name = "data_hora_movimento", nullable = false)
    private OffsetDateTime dataHoraMovimento;

    @NotNull
    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "id_caixa", nullable = false)
    @JsonIgnore
    private Caixa caixa;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "id_tipo_despesa")
    private TipoDespesa tipoDespesa;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "id_tipo_receita")
    private TipoReceita tipoReceita;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "id_dentista")
    private Dentista dentista;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "id_fornecedor")
    private Fornecedor fornecedor;

}