package com.gabrielpdev.siso.dtos;

import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Value;

import java.io.Serializable;

/**
 * DTO for {@link com.gabrielpdev.siso.models.Fornecedor}
 */
@Value
public class FornecedorDTO implements Serializable {
    @NotNull
    String nome;
    @NotNull
    @Size(max = 11)
    String fone;
}