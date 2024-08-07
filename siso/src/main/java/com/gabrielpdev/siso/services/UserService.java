package com.gabrielpdev.siso.services;

import java.util.Objects;
import java.util.Optional;
import java.util.stream.Collectors;
import java.util.stream.Stream;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import com.gabrielpdev.siso.models.User;
import com.gabrielpdev.siso.models.dto.UserCreateDTO;
import com.gabrielpdev.siso.models.dto.UserUpdateDTO;
import com.gabrielpdev.siso.models.enums.ProfileEnum;
import com.gabrielpdev.siso.repositories.UserRepository;
import com.gabrielpdev.siso.security.UserSpringSecurity;
import com.gabrielpdev.siso.services.exceptions.AuthorizationException;
import com.gabrielpdev.siso.services.exceptions.DataBindingViolationException;
import com.gabrielpdev.siso.services.exceptions.ObjectNotFoundException;

import jakarta.transaction.Transactional;
import jakarta.validation.Valid;

/**
 * Service para entidade usuario, "API" entre controller e banco de dados
 * @author Gabriel Pinto Andrade
 * @version 1.0.0
 * @since 07/08/2024
 */
@Service
public class UserService {
    
    /**
     * Criptografia de senhas
     */
    @Autowired
    BCryptPasswordEncoder bCryptPasswordEncoder;

    /**
     * Repository do usuario
     */
    @Autowired
    UserRepository userRepository;

    /**
     * Procura um usuario por id
     * @param id id do usuario
     * @return Usuario
     */
    public User findById(Long id) {
        verifyUserSelfOrAdmin(id);

        Optional<User> obj = this.userRepository.findById(id);
        return obj.orElseThrow(() -> new ObjectNotFoundException("Usuário {id:"+id+"} não encontrado"));
    }

    /**
     * Cria um usuario
     * @param obj Objeto Usuario
     */
    @Transactional
    public void createUser(User obj) {
        verifyUserAdmin();

        obj.setId(null);
        obj.setPassword(this.bCryptPasswordEncoder.encode(obj.getPassword()));
        obj.setProfiles(Stream.of(ProfileEnum.USER.getCode()).collect(Collectors.toSet()));
        obj.setAtivo(true);
        this.userRepository.save(obj);
    }

    /**
     * Atualiza um usuario
     * @param obj Objeto Usuario
     */
    @Transactional
    public void updateUser(User obj) {
        User newObj = this.findById(obj.getId());
        newObj.setPassword(this.bCryptPasswordEncoder.encode(obj.getPassword()));
        newObj.setEmail(obj.getEmail());
        if(isAdmin()){
            newObj.setProfiles(obj.getProfiles().stream().map(x -> x.getCode()).collect(Collectors.toSet()));
            newObj.setAtivo(obj.getAtivo());
        }
        this.userRepository.save(newObj);
    }

    /**
     * Deleta um usuario do banco por id
     * @param id id do usuario a ser deletado
     */
    public void deleteUserById(Long id) {
        verifyUserAdmin();

        findById(id);
        try {
            this.userRepository.deleteById(id);
        } catch (Exception e) {
            throw new DataBindingViolationException("O usuário não pode ser deletado pois existem objetos relacionados a ele");
        }
    }

    /**
     * Verifica se um usuario está autenticado
     * @return
     */
    public static UserSpringSecurity authenticated() {
        try {
            return (UserSpringSecurity) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        } catch (Exception e) {
            return null;
        }
    }

    /**
     * Transforma do DTO para criação do usuario
     * @param obj UserCreateDTO
     * @return
     */
    public User fromDTO(@Valid UserCreateDTO obj) {
        User user = new User();
        user.setUsername(obj.getUsername());
        user.setPassword(obj.getPassword());
        user.setEmail(obj.getEmail());
        return user;
    }

    /**
     * Transforma do DTO para atualização do usuario
     * @param obj UserUpdateDTO
     * @return
     */
    public User fromDTO(@Valid UserUpdateDTO obj) {
        User user = new User();
        user.setPassword(obj.getPassword());
        user.setEmail(obj.getEmail());
        user.setProfiles(obj.getProfiles());
        user.setAtivo(obj.getAtivo());
        return user;
    }

    /**
     * Verifica se o usuario logado é admnistrador
     * @throws AuthorizationException
     */
    private void verifyUserAdmin() {
        if(!isAdmin()) {
            throw new AuthorizationException("Acesso negado");
        }
    }

    /**
     * Verifica se um usuário está fazendo uma operação nele mesmo ou é admnistardor
     * @param id Id do usuário em operação
     * @throws AuthorizationException
     */
    private void verifyUserSelfOrAdmin(Long id) {
        UserSpringSecurity userSpringSecurity = authenticated();
        if(!Objects.nonNull(userSpringSecurity) || (!userSpringSecurity.hasRole(ProfileEnum.ADMIN) && !id.equals(userSpringSecurity.getId())) ) {
            throw new AuthorizationException("Acesso negado");
        }
    }

    /**
     * Retona true para admnistrador ou false para não admnsitardor
     * @return Boolean
     */
    private Boolean isAdmin() {
        UserSpringSecurity userSpringSecurity = authenticated();
        if(!Objects.nonNull(userSpringSecurity) || !userSpringSecurity.hasRole(ProfileEnum.ADMIN)) {
            return false;
        }
        return true;
    }
}
