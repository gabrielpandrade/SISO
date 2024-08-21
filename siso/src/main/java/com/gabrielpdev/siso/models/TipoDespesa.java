package com.gabrielpdev.siso.models;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = TipoDespesa.TABLE_NAME)
@AllArgsConstructor
@NoArgsConstructor
@Data
public class TipoDespesa {
    public static final String TABLE_NAME = "tipo_despesa";

    @Column(name = "id_tipo_receita")
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "descricao")
    @NotBlank
    private String descricao;
}
