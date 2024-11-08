package com.gabrielpdev.siso.repositories;

import com.gabrielpdev.siso.models.TipoDespesa;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TipoDespesaRepository extends JpaRepository<TipoDespesa, Long> {
    List<TipoDespesa> findAllByOrderByDescricao();
}
