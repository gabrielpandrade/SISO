package com.gabrielpdev.siso.models;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
@Table(name = "fornecedor")
public class Fornecedor {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_fornecedor", nullable = false)
    private Long id;

    @NotNull
    @Column(name = "nome", nullable = false, length = Integer.MAX_VALUE)
    private String nome;

    @Size(max = 11)
    @NotNull
    @Column(name = "fone", nullable = false, length = 11)
    private String fone;

}