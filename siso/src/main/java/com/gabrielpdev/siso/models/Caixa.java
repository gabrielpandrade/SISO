package com.gabrielpdev.siso.models;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import java.time.OffsetDateTime;
import java.util.LinkedHashSet;
import java.util.List;
import java.util.Set;

@Getter
@Setter
@Entity
@Table(name = "caixa")
public class Caixa {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_caixa", nullable = false)
    private Long id;

    @NotNull
    @Column(name = "data_hora_abertura", nullable = false)
    private OffsetDateTime dataHoraAbertura;

    @Column(name = "data_hora_fechamento")
    private OffsetDateTime dataHoraFechamento;

    @NotNull
    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "id_usuario", nullable = false)
    private Usuario usuario;

    @OneToMany(mappedBy = "caixa")
    @JsonIgnore
    private List<ItemMovimento> itemMovimentos;

}