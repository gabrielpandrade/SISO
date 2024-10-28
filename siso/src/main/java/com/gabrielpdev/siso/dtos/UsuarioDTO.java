package com.gabrielpdev.siso.dtos;

import jakarta.validation.constraints.NotNull;
import lombok.Value;

import java.io.Serializable;

/**
 * DTO for {@link com.gabrielpdev.siso.models.Usuario}
 */
@Value
public class UsuarioDTO implements Serializable {
    @NotNull
    String login;
    @NotNull
    String senha;
    @NotNull
    String email;
    @NotNull
    Boolean ativo;
}