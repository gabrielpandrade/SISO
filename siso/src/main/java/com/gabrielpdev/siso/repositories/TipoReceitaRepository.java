package com.gabrielpdev.siso.repositories;

import com.gabrielpdev.siso.models.TipoReceita;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TipoReceitaRepository extends JpaRepository<TipoReceita, Long> {

}
