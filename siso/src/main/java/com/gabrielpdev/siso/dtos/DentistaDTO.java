package com.gabrielpdev.siso.dtos;

import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Value;

import java.io.Serializable;

/**
 * DTO for {@link com.gabrielpdev.siso.models.Dentista}
 */
@Value
public class DentistaDTO implements Serializable {
    @NotNull
    String nome;
    @NotNull
    @Size(max = 11)
    String cro;
    @Size(max = 11)
    String fone;
    Float percentualRecebido;
}