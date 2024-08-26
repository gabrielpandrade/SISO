package com.gabrielpdev.siso.models;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = Fornecedor.TABE_NAME)
@AllArgsConstructor
@NoArgsConstructor
@Data
public class Fornecedor {
    public static final String TABE_NAME = "fornecedor";

    @Column(name = "id_fornecedor")
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "nome", unique = true, nullable = false, columnDefinition = "TEXT", length = 100)
    @NotBlank
    private String nome;

    @Column(name = "fone", nullable = false, length = 11)
    @NotBlank
    private String fone;

    @Column(name = "endereco", nullable = false, length = 100)
    @NotBlank
    private String endereco;
}
