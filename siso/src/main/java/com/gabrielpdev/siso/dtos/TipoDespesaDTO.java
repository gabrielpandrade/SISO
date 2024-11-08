package com.gabrielpdev.siso.dtos;

import jakarta.validation.constraints.NotNull;
import lombok.Data;
import lombok.Value;

import java.io.Serializable;

/**
 * DTO for {@link com.gabrielpdev.siso.models.TipoDespesa}
 */
@Data
public class TipoDespesaDTO implements Serializable {
    @NotNull
    String descricao;
}