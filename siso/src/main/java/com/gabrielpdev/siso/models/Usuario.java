package com.gabrielpdev.siso.models;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

import java.util.HashSet;
import java.util.Set;

@Getter
@Setter
@Entity
@Table(name = "usuario")
public class Usuario {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_usuario", nullable = false)
    private Long id;

    @NotNull
    @Column(name = "login", nullable = false, length = Integer.MAX_VALUE)
    private String login;

    @NotNull
    @Column(name = "senha", nullable = false, length = Integer.MAX_VALUE)
    private String senha;

    @NotNull
    @Column(name = "email", nullable = false, length = Integer.MAX_VALUE)
    private String email;

    @NotNull
    @Column(name = "ativo", nullable = false)
    private Boolean ativo = false;

    @ElementCollection(fetch = FetchType.EAGER)
    @CollectionTable(name = "tipo_usuario", joinColumns = @JoinColumn(name = "id_usuario"))
    @Column(name = "tipo", unique = false, nullable = false, insertable = true, updatable = true)
    private Set<String> permissoes = new HashSet<>();

    public void addPermissao(String permissao) {
        this.permissoes.add(permissao);
    }
}