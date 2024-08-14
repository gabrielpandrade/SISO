package com.gabrielpdev.siso.controllers;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import com.gabrielpdev.siso.models.User;
import com.gabrielpdev.siso.dtos.UserCreateDTO;
import com.gabrielpdev.siso.dtos.UserUpdateDTO;
import com.gabrielpdev.siso.services.UserService;

import jakarta.validation.Valid;

import java.net.URI;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.PutMapping;

/**
 * Controller para a entidade usuario
 * @author Gabriel Pinto Andrade
 * @version 1.0.0
 * @since 07/08/2024
 */
@RestController
@RequestMapping("/api/usuario")
@Validated
public class UserController {

    @Autowired
    UserService userService;

    @GetMapping("/{id_usuario}")
    public ResponseEntity<User> getUsuario(@PathVariable("id_usuario") Long id) {
        User user = this.userService.findById(id);
        return ResponseEntity.ok().body(user);
    }

    @PostMapping
    public ResponseEntity<Void> postUser(@Valid @RequestBody UserCreateDTO userDTO) {
        User user = this.userService.fromDTO(userDTO);
        this.userService.createUser(user);

        URI uri = ServletUriComponentsBuilder.fromCurrentRequest().path("/{id_usuario}").buildAndExpand(user.getId()).toUri();

        return ResponseEntity.created(uri).build();
    }

    @PutMapping("/{id_usuario}")
    public ResponseEntity<Void> putUser(@PathVariable("id_usuario") Long id,@Valid @RequestBody UserUpdateDTO userDTO) {
        User user = this.userService.fromDTO(userDTO);
        user.setId(id);

        this.userService.updateUser(user);

        return ResponseEntity.noContent().build();
    }

    @DeleteMapping("/{id_usuario}")
    public ResponseEntity<Void> deleteUserById(@PathVariable("id_usuario") Long id) {
        this.userService.deleteUserById(id);

        return ResponseEntity.noContent().build();
    }
}
