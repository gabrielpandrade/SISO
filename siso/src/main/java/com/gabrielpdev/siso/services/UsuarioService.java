package com.gabrielpdev.siso.services;

import java.util.List;
import java.util.Objects;
import java.util.Optional;
import java.util.Set;

import com.gabrielpdev.siso.dtos.*;
import com.gabrielpdev.siso.models.CustomUserDetails;
import com.gabrielpdev.siso.models.exceptions.AuthorizationException;
import com.gabrielpdev.siso.repositories.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import com.gabrielpdev.siso.models.Usuario;
import com.gabrielpdev.siso.models.exceptions.DataBindingViolationException;
import com.gabrielpdev.siso.models.exceptions.ObjectNotFoundException;

import jakarta.transaction.Transactional;

@Service
public class UsuarioService {

    @Autowired
    UsuarioRepository usuarioRepository;

    @Autowired
    BCryptPasswordEncoder bCryptPasswordEncoder;

    public List<Usuario> findAll() {
        return usuarioRepository.findAll();
    }

    public Usuario findById(Long id) {
        if(!(isSelf(id) || isAdmin())) throw new AuthorizationException("Acesso negado.");
        Optional<Usuario> obj = this.usuarioRepository.findById(id);
        return obj.orElseThrow(() -> new ObjectNotFoundException("Usuário {id:"+id+"} não encontrado"));
    }

    @Transactional
    public void createUsuario(Usuario newUsuario) {
        if(!isAdmin()) throw new AuthorizationException("Acesso negado.");
        newUsuario.setId(null);
        newUsuario.setAtivo(true);
        newUsuario.setPermissoes(Set.of("ROLE_USER"));
        this.usuarioRepository.save(newUsuario);
    }

    @Transactional
    public void updateUsuario(Usuario newUsuario) {
        Usuario oldUsuario = findById(newUsuario.getId());
        if(hasRoot(oldUsuario) || !(isSelf(oldUsuario.getId()) || isAdmin())) throw new AuthorizationException("Acesso negado.");
        this.usuarioRepository.save(newUsuario);
    }

    public void deleteUsuarioById(Long id) {
        findById(id);
        if(!isAdmin()) throw new AuthorizationException("Acesso negado.");
        try {
            this.usuarioRepository.deleteById(id);
        } catch (Exception e) {
            throw new DataBindingViolationException("O usuário não pode ser deletado pois existem objetos relacionados a ele");
        }
    }

    public CustomUserDetails authenticated() {
        try {
            return (CustomUserDetails) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        } catch (Exception e) {
            return null;
        }
    }

    public boolean isAuthenticated() {
        if(Objects.isNull(authenticated())) {
            throw new AuthorizationException("Acesso negado.");
        }
        return true;
    }

    public boolean isSelf(Long id) {
        return id.equals(authenticated().getId()) && isAuthenticated();
    }

    public boolean isAdmin() {
        return authenticated().hasRole("ROLE_ADMIN") && isAuthenticated();
    }

    public boolean isRoot() {
        return authenticated().hasRole("ROLE_ROOT") && isAuthenticated();
    }

    public boolean hasRoot(Usuario obj) {
        return obj.getPermissoes().contains("ROLE_ROOT");
    }

    public Usuario mergeDTO(UsuarioEmailUpdateDTO usuarioEmailUpdateDTO, Long id) {
        Usuario usuario = this.findById(id);
        usuario.setEmail(usuarioEmailUpdateDTO.getEmail());
        return usuario;
    }

    public Usuario mergeDTO(UsuarioPasswordUpdateDTO usuarioPasswordUpdateDTO, Long id) {
        Usuario usuario = this.findById(id);
        if(!bCryptPasswordEncoder.matches(usuarioPasswordUpdateDTO.getSenha_old(), usuario.getSenha())) {
            throw new RuntimeException("Senha incorreta.");
        }
        usuario.setSenha(bCryptPasswordEncoder.encode(usuarioPasswordUpdateDTO.getSenha_new()));
        return usuario;
    }

    public Usuario mergeDTO(UsuarioAdminUpdateDTO usuarioAdminUpdateDTO, Long id) {
        Usuario usuario = this.findById(id);
        usuario.setEmail(usuarioAdminUpdateDTO.getEmail());
        usuario.setAtivo(usuarioAdminUpdateDTO.getAtivo());
        usuario.setPermissoes(usuarioAdminUpdateDTO.getPermissoes());
        return usuario;
    }

    public Usuario mergeDTO(UsuarioPasswordAdminUpdateDTO usuarioPasswordAdminUpdateDTO, Long id) {
        Usuario usuario = this.findById(id);
        usuario.setSenha(bCryptPasswordEncoder.encode(usuarioPasswordAdminUpdateDTO.getSenha()));
        return usuario;
    }

    public Usuario fromDTO(UsuarioCreateDTO usuarioCreateDTO) {
        Usuario usuario = new Usuario();
        usuario.setEmail(usuarioCreateDTO.getEmail());
        usuario.setLogin(usuarioCreateDTO.getLogin());
        usuario.setSenha(bCryptPasswordEncoder.encode(usuarioCreateDTO.getSenha()));
        return usuario;
    }
}
