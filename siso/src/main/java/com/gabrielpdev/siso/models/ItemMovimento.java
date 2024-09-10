package com.gabrielpdev.siso.models;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.*;
import org.hibernate.proxy.HibernateProxy;

import java.sql.Timestamp;
import java.util.Objects;

@Entity
@Table(name = ItemMovimento.TABLE_NAME)
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@ToString
public class ItemMovimento {
    public static final String TABLE_NAME = "item_movimento";

    @Column(name = "id_movimento")
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "operacao")
    @NotBlank
    private String operacao;

    @Column(name = "modalidade_pagamento")
    @NotBlank
    private String modalidade;

    @Column(name = "valor")
    @NotNull
    private Double valor;

    @Column(name = "data_hora_movimento")
    @NotNull
    private Timestamp dataHoraMovimento;

    @ManyToOne
    @JoinColumn(name = "id_caixa")
    private Caixa caixa;

    @ManyToOne
    @JoinColumn(name = "id_tipo_receita")
    private TipoReceita receita;

    @ManyToOne
    @JoinColumn(name = "id_tipo_despesa")
    private TipoReceita despesa;

    @ManyToOne
    @JoinColumn(name = "id_dentista")
    private Dentista dentista;

    @ManyToOne
    @JoinColumn(name = "id_fornecedor")
    private Fornecedor fornecedor;

    @Override
    public final boolean equals(Object o) {
        if (this == o) return true;
        if (o == null) return false;
        Class<?> oEffectiveClass = o instanceof HibernateProxy ? ((HibernateProxy) o).getHibernateLazyInitializer().getPersistentClass() : o.getClass();
        Class<?> thisEffectiveClass = this instanceof HibernateProxy ? ((HibernateProxy) this).getHibernateLazyInitializer().getPersistentClass() : this.getClass();
        if (thisEffectiveClass != oEffectiveClass) return false;
        ItemMovimento that = (ItemMovimento) o;
        return getId() != null && Objects.equals(getId(), that.getId());
    }

    @Override
    public final int hashCode() {
        return this instanceof HibernateProxy ? ((HibernateProxy) this).getHibernateLazyInitializer().getPersistentClass().hashCode() : getClass().hashCode();
    }
}
