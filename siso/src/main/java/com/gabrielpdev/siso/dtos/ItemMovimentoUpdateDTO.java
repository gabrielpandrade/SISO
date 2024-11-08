package com.gabrielpdev.siso.dtos;

import jakarta.validation.constraints.NotNull;
import lombok.Value;

import java.io.Serializable;
import java.time.OffsetDateTime;

/**
 * DTO for {@link com.gabrielpdev.siso.models.ItemMovimento}
 */
@Value
public class ItemMovimentoUpdateDTO implements Serializable {
    @NotNull
    String operacao;
    @NotNull
    String modalidadePagamento;
    @NotNull
    Float valor;
    Long id_tipo_despesa;
    Long id_tipo_receita;
    Long id_dentista;
    Long id_fornecedor;
}