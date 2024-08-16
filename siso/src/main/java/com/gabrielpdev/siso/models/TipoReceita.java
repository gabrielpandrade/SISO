package com.gabrielpdev.siso.models;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = TipoReceita.TABLE_NAME)
@AllArgsConstructor
@NoArgsConstructor
@Data
public class TipoReceita {
    public static final String TABLE_NAME = "tipo_receita";

    @Column(name = "id_tipo_receita")
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "descricao")
    @NotBlank
    private String descricao;
}
