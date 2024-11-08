package com.gabrielpdev.siso.repositories;

import java.util.List;
import java.util.Optional;

import com.gabrielpdev.siso.models.Usuario;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

/**
 * Repository para entidade usuario, conexão com bando de dados
 * @author Gabriel Pinto Andrade
 * @version 1.0.0
 * @since 07/08/2024
 */
@Repository
public interface UsuarioRepository extends JpaRepository<Usuario, Long>{
    Optional<Usuario> findByLogin(String login);

    List<Usuario> findAllByOrderByLogin();
}
