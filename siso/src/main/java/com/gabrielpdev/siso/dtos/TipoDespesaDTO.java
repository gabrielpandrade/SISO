package com.gabrielpdev.siso.dtos;

import jakarta.validation.constraints.NotNull;
import lombok.Value;

import java.io.Serializable;

/**
 * DTO for {@link com.gabrielpdev.siso.models.TipoDespesa}
 */
@Value
public class TipoDespesaDTO implements Serializable {
    @NotNull
    String descricao;
}