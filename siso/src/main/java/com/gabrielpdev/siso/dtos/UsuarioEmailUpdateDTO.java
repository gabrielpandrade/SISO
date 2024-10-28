package com.gabrielpdev.siso.dtos;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class UsuarioEmailUpdateDTO {

    @NotBlank
    @Email
    @Size(max = 320)
    private String email;
}
