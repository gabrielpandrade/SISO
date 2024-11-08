package com.gabrielpdev.siso.repositories;

import com.gabrielpdev.siso.models.ItemMovimento;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ItemMovimentoRepository extends JpaRepository<ItemMovimento, Long> {
    List<ItemMovimento> findByCaixa_Id(Long id_caixa);
}
