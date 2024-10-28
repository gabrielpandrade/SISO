package com.gabrielpdev.siso.models;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
@Table(name = "dentista")
public class Dentista {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_dentista", nullable = false)
    private Long id;

    @NotNull
    @Column(name = "nome", nullable = false, length = Integer.MAX_VALUE)
    private String nome;

    @Size(max = 11)
    @NotNull
    @Column(name = "\"CRO\"", nullable = false, length = 11)
    private String cro;

    @Size(max = 11)
    @Column(name = "fone", length = 11)
    private String fone;

    @Column(name = "percentual_recebido")
    private Float percentualRecebido;

}