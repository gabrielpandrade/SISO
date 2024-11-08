package com.gabrielpdev.siso.repositories;

import com.gabrielpdev.siso.models.Caixa;
import com.gabrielpdev.siso.models.Usuario;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface CaixaRepository extends JpaRepository<Caixa, Long> {
    Optional<Caixa> findCaixaByUsuarioAndDataHoraFechamentoIsNull(Usuario usuario);

    List<Caixa> findCaixaByUsuario_IdOrderByDataHoraAbertura(Long id);
}
