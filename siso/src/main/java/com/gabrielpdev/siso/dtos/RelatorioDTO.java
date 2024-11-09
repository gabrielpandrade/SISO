package com.gabrielpdev.siso.dtos;

import jakarta.validation.constraints.NotNull;
import lombok.Value;

import java.io.Serializable;
import java.time.OffsetDateTime;

@Value
public class RelatorioDTO implements Serializable {
    @NotNull
    OffsetDateTime data_inicio;
    @NotNull
    OffsetDateTime data_fim;
    Long id_dentista;
}
