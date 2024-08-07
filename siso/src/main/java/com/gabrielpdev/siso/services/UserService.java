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

@Service
public class UserService {
    
    @Autowired
    BCryptPasswordEncoder bCryptPasswordEncoder;

    @Autowired
    UserRepository userRepository;

    public User findById(Long id) {
        verifyUserAdmin(id);

        Optional<User> obj = this.userRepository.findById(id);
        return obj.orElseThrow(() -> new ObjectNotFoundException("Usuário {id:"+id+"} não encontrado"));
    }

    @Transactional
    public User createUser(User obj) {
        obj.setId(null);
        obj.setPassword(this.bCryptPasswordEncoder.encode(obj.getPassword()));
        obj.setProfiles(Stream.of(ProfileEnum.USER.getCode()).collect(Collectors.toSet()));
        obj.setAtivo(true);
        return this.userRepository.save(obj);
    }

    @Transactional
    public User updateUser(User obj) {
        verifyUserAdmin(obj.getId());

        User newObj = this.findById(obj.getId());
        newObj.setPassword(this.bCryptPasswordEncoder.encode(obj.getPassword()));
        newObj.setEmail(obj.getEmail());
        return this.userRepository.save(newObj);
    }

    public void deleteUserById(Long id) {
        verifyUserAdmin(id);

        findById(id);
        try {
            this.userRepository.deleteById(id);
        } catch (Exception e) {
            throw new DataBindingViolationException("O usuário não pode ser deletado pois existem objetos relacionados a ele");
        }
    }

    public static UserSpringSecurity authenticated() {
        try {
            return (UserSpringSecurity) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        } catch (Exception e) {
            return null;
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
        return user;
    }

    private void verifyUserAdmin(Long id) {
        UserSpringSecurity userSpringSecurity = authenticated();
        if(!Objects.nonNull(userSpringSecurity) || !userSpringSecurity.hasRole(ProfileEnum.ADMIN) && !id.equals(userSpringSecurity.getId())) {
            throw new AuthorizationException("Acesso negado");
        }
    }
}
