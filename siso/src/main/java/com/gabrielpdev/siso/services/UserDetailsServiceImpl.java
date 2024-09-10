package com.gabrielpdev.siso.services;

import com.gabrielpdev.siso.models.CustomUserDetails;
import com.gabrielpdev.siso.models.User;
import com.gabrielpdev.siso.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Component;

import java.util.Optional;

@Component
public class UserDetailsServiceImpl implements UserDetailsService {

    @Autowired
    private UserRepository userRepository;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {

        Optional<User> user = userRepository.findByUsername(username);
        if (user.isPresent()) {
            return new CustomUserDetails(user.get());
        }
        throw new UsernameNotFoundException("Usuário não encontrado.");
    }
}
