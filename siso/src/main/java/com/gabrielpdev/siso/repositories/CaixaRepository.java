package com.gabrielpdev.siso.repositories;

import com.gabrielpdev.siso.models.Caixa;
import com.gabrielpdev.siso.models.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface CaixaRepository extends JpaRepository<Caixa, Long> {
    Optional<Caixa> findCaixaByUsuarioAndFechamentoIsNull(User user);
}
