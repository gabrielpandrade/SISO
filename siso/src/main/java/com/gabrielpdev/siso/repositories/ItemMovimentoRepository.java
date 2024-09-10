package com.gabrielpdev.siso.repositories;

import com.gabrielpdev.siso.models.ItemMovimento;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ItemMovimentoRepository extends JpaRepository<ItemMovimento, Long> {
}
