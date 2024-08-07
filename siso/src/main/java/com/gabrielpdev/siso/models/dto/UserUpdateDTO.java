package com.gabrielpdev.siso.models.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class UserUpdateDTO {
    
    @NotBlank
    @Size(min = 8, max = 50)
    private String password;

    @NotBlank
    @Email
    @Size(max = 320)
    private String email;
}
