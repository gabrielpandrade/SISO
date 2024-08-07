package com.gabrielpdev.siso.models;

import java.util.HashSet;
import java.util.Set;
import java.util.stream.Collectors;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonProperty.Access;
import com.gabrielpdev.siso.models.enums.ProfileEnum;

import jakarta.persistence.CollectionTable;
import jakarta.persistence.Column;
import jakarta.persistence.ElementCollection;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = User.TABLE_NAME)
@AllArgsConstructor
@NoArgsConstructor
@Data
public class User {
    public static final String TABLE_NAME = "usuario";

    @Column(name = "id_usuario")
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ElementCollection(fetch = FetchType.EAGER)
    @JsonProperty(access = Access.WRITE_ONLY)
    @CollectionTable(name = "tipo_usuario")
    @Column(name = "tipo", unique = false, nullable = false, insertable = true, updatable = true)
    private Set<Integer> profiles = new HashSet<>();

    @Column(name = "login", unique = true, nullable = false, insertable = true, updatable = false, columnDefinition = "TEXT", length = 50)
    @NotBlank
    @Size(min = 2, max = 50)
    private String username; 

    @Column(name = "senha", unique = false, nullable = false, insertable = true, updatable = true, columnDefinition = "TEXT", length = 100)
    @NotBlank
    @Size(min = 8, max = 100)
    @JsonProperty(access = Access.WRITE_ONLY)
    private String password;

    @Column(name = "email_recuperacao", unique = false, nullable = false, insertable = true, updatable = true, columnDefinition = "TEXT", length = 320)
    @NotBlank
    @Email
    @Size(max = 320)
    private String email;

    @Column(name = "ativo", unique = false, nullable = false, insertable = true, updatable = true, columnDefinition = "BOOLEAN")
    private Boolean ativo;

    public Set<ProfileEnum> getProfiles() {
        return this.profiles.stream().map(x -> ProfileEnum.toEnum(x)).collect(Collectors.toSet());
    }

    public void addProfiles(ProfileEnum profileEnum) {
        this.profiles.add(profileEnum.getCode());
    }
}
