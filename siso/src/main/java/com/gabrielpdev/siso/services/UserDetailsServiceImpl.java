package com.gabrielpdev.siso.services;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.gabrielpdev.siso.models.User;
import com.gabrielpdev.siso.repositories.UserRepository;
import com.gabrielpdev.siso.security.UserSpringSecurity;

@Service
public class UserDetailsServiceImpl implements UserDetailsService{
    
    @Autowired
    UserRepository userRepository;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        Optional<User> user = this.userRepository.findByUsername(username);
        if(user.isEmpty()) {
            throw new UsernameNotFoundException("Usuário: "+username+" não encontrado");
        }
        return new UserSpringSecurity(user.get().getId(), user.get().getUsername(), user.get().getPassword(), user.get().getProfiles());
    }
}
