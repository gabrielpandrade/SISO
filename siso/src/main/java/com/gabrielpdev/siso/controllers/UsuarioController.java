package com.gabrielpdev.siso.controllers;

import com.gabrielpdev.siso.dtos.*;
import com.gabrielpdev.siso.models.Usuario;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.gabrielpdev.siso.services.UsuarioService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.net.URI;
import java.util.List;

/**
 * Controller para a entidade usuario
 * @author Gabriel Pinto Andrade
 * @version 1.0.0
 * @since 07/08/2024
 */
@RestController
@Validated
public class UsuarioController {

    @Autowired
    UsuarioService usuarioService;
    
    @GetMapping("/me")
    public ResponseEntity<Usuario> getMe() {
        System.out.println(usuarioService.authenticated().getAuthorities());
        Long id = usuarioService.authenticated().getId();
        Usuario usuario = usuarioService.findById(id);
        return ResponseEntity.ok().body(usuario);
    }

    @PutMapping("/me")
    public ResponseEntity<Usuario> emailUpdate(@RequestBody @Valid UsuarioEmailUpdateDTO usuarioEmailUpdateDTO) {
        Long id = usuarioService.authenticated().getId();
        Usuario newUsuario = usuarioService.mergeDTO(usuarioEmailUpdateDTO, id);
        usuarioService.updateUsuario(newUsuario);
        return ResponseEntity.noContent().build();
    }

    @PutMapping("/me/senha")
    public ResponseEntity<Usuario> passwordUpdate(@RequestBody @Valid UsuarioPasswordUpdateDTO usuarioPasswordUpdateDTO) {
        Long id = usuarioService.authenticated().getId();
        Usuario newUsuario = usuarioService.mergeDTO(usuarioPasswordUpdateDTO, id);
        usuarioService.updateUsuario(newUsuario);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/admin/usuario/{id_usuario}")
    public ResponseEntity<Usuario> getUsuario(@PathVariable Long id_usuario) {
        Usuario usuario = usuarioService.findById(id_usuario);
        return ResponseEntity.ok().body(usuario);
    }

    @PutMapping("/admin/usuario/{id_usuario}")
    public ResponseEntity<Usuario> updateUsuario(@RequestBody @Valid UsuarioAdminUpdateDTO usuarioAdminUpdateDTO, @PathVariable Long id_usuario) {
        Usuario newUsuario = usuarioService.mergeDTO(usuarioAdminUpdateDTO,id_usuario);
        usuarioService.updateUsuario(newUsuario);
        return ResponseEntity.noContent().build();
    }

    @PutMapping("/admin/usuario/{id_usuario}/senha")
    public ResponseEntity<Usuario> updateAdminUsuario(@RequestBody @Valid UsuarioPasswordAdminUpdateDTO usuarioPasswordAdminUpdateDTO, @PathVariable Long id_usuario) {
        Usuario newUsuario = usuarioService.mergeDTO(usuarioPasswordAdminUpdateDTO,id_usuario);
        usuarioService.updateUsuario(newUsuario);
        return ResponseEntity.noContent().build();
    }

    @DeleteMapping("/admin/usuario/{id_usuario}")
    public ResponseEntity<Usuario> deleteUsuario(@PathVariable Long id_usuario) {
        usuarioService.deleteUsuarioById(id_usuario);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/admin/usuarios")
    public ResponseEntity<List<Usuario>> getAllUsuarios() {
        List<Usuario> usuarios = usuarioService.findAll();
        return ResponseEntity.ok().body(usuarios);
    }

    @PostMapping("/admin/usuario")
    public ResponseEntity<Usuario> createUsuario(@RequestBody @Valid UsuarioCreateDTO usuarioCreateDTO) {
        Usuario newUsuario = usuarioService.fromDTO(usuarioCreateDTO);
        usuarioService.createUsuario(newUsuario);
        URI uri = ServletUriComponentsBuilder.fromCurrentRequest().path("/{id_usuario}").buildAndExpand(newUsuario.getId()).toUri();
        return ResponseEntity.created(uri).build();
    }
}
