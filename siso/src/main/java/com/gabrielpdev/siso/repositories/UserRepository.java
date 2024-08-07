package com.gabrielpdev.siso.repositories;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.gabrielpdev.siso.models.User;

/**
 * Repository para entidade usuario, conexão com bando de dados
 * @author Gabriel Pinto Andrade
 * @version 1.0.0
 * @since 07/08/2024
 */
@Repository
public interface UserRepository extends JpaRepository<User, Long>{

    /**
     * Busca um usuário por login/username
     * @param username
     * @return Optional<User>
     */
    Optional<User> findByUsername(String username);
}
