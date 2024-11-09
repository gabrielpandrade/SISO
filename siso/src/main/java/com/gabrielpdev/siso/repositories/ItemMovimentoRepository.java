package com.gabrielpdev.siso.repositories;

import com.gabrielpdev.siso.models.ItemMovimento;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.OffsetDateTime;
import java.util.List;
import java.util.Optional;

@Repository
public interface ItemMovimentoRepository extends JpaRepository<ItemMovimento, Long> {
    List<ItemMovimento> findByCaixa_IdOrderByDataHoraMovimento(Long id_caixa);
    List<ItemMovimento> findByCaixa_Usuario_IdAndDataHoraMovimentoBetween(Long id_usuario, OffsetDateTime dataHoraInicio, OffsetDateTime dataHoraFim);
    List<ItemMovimento> findByCaixa_Usuario_IdAndDentista_IdAndDataHoraMovimentoBetween(Long id_usuario, Long id_dentista, OffsetDateTime dataHoraInicio, OffsetDateTime dataHoraFim);
}
