package com.gabrielpdev.siso.dtos;

import jakarta.validation.constraints.NotBlank;
import lombok.Value;

import java.io.Serializable;

/**
 * DTO for {@link com.gabrielpdev.siso.models.Usuario}
 */
@Value
public class UsuarioPasswordUpdateDTO implements Serializable {
    @NotBlank
    String senha_old;

    @NotBlank
    String senha_new;
}