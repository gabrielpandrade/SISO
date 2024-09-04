package com.gabrielpdev.siso.services;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import com.gabrielpdev.siso.models.User;
import com.gabrielpdev.siso.dtos.UserCreateDTO;
import com.gabrielpdev.siso.dtos.UserUpdateDTO;
import com.gabrielpdev.siso.repositories.UserRepository;
import com.gabrielpdev.siso.models.exceptions.DataBindingViolationException;
import com.gabrielpdev.siso.models.exceptions.ObjectNotFoundException;

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

    @Autowired
    UserRepository userRepository;

    @Autowired
    BCryptPasswordEncoder bCryptPasswordEncoder;

    /**
     * Procura um usuario por id
     * @param id id do usuario
     * @return Usuario
     */
    public User findById(Long id) {
        Optional<User> obj = this.userRepository.findById(id);
        return obj.orElseThrow(() -> new ObjectNotFoundException("Usuário {id:"+id+"} não encontrado"));
    }

    public User findByUsername(String username) {
        Optional<User> obj = this.userRepository.findByUsername(username);
        return obj.orElseThrow(() -> new UsernameNotFoundException("Usuário não encontrado"));
    }

    /**
     * Cria um usuario
     * @param obj Objeto Usuario
     */
    @Transactional
    public void createUser(User obj) {
        obj.setId(null);
        obj.setPassword(bCryptPasswordEncoder.encode(obj.getPassword()));
        obj.addProfile("USER");
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
        newObj.setPassword(bCryptPasswordEncoder.encode(obj.getPassword()));
        newObj.setEmail(obj.getEmail());
        newObj.setProfiles(obj.getProfiles());
        newObj.setAtivo(obj.getAtivo());
        this.userRepository.save(newObj);
    }

    /**
     * Deleta um usuario do banco por id
     * @param id id do usuario a ser deletado
     */
    public void deleteUserById(Long id) {
        findById(id);

        try {
            this.userRepository.deleteById(id);
        } catch (Exception e) {
            throw new DataBindingViolationException("O usuário não pode ser deletado pois existem objetos relacionados a ele");
        }
    }

    public User fromDTO(@Valid UserCreateDTO obj) {
        User user = new User();
        user.setUsername(obj.getUsername());
        user.setPassword(obj.getPassword());
        user.setEmail(obj.getEmail());
        return user;
    }

    public User fromDTO(@Valid UserUpdateDTO obj) {
        User user = new User();
        user.setPassword(obj.getPassword());
        user.setEmail(obj.getEmail());
        user.setProfiles(obj.getProfiles());
        user.setAtivo(obj.getAtivo());
        return user;
    }
}
