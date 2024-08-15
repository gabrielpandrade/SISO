package com.gabrielpdev.siso.models;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.sql.Timestamp;

@Entity
@Table(name = Caixa.TABLE_NAME)
@AllArgsConstructor
@NoArgsConstructor
@Data
public class Caixa {
    public static final String TABLE_NAME = "caixa";

    @Column(name = "id_caixa")
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "data_hora_abertura")
    private Timestamp abertura;

    @Column(name = "data_hora_fechamento")
    private Timestamp fechamento;

    @ManyToOne
    @JoinColumn(name = "id_usuario", nullable = false)
    private User usuario;
}
