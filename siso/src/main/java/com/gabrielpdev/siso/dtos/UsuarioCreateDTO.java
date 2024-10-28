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
public class UsuarioCreateDTO {
    
    @NotBlank
    @Size(min = 2, max = 50)
    private String login;

    @NotBlank
    @Size(min = 8, max = 50)
    private String senha;

    @NotBlank
    @Email
    @Size(max = 320)
    private String email;
}
