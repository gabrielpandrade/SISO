package com.gabrielpdev.siso.dtos;

import jakarta.validation.constraints.NotNull;
import lombok.Value;

import java.io.Serializable;
import java.util.Set;

/**
 * DTO for {@link com.gabrielpdev.siso.models.Usuario}
 */
@Value
public class UsuarioAdminUpdateDTO implements Serializable {
    @NotNull
    String email;
    @NotNull
    Boolean ativo;
    Set<String> permissoes;
}