package com.gabrielpdev.siso.dtos;

import com.gabrielpdev.siso.models.Caixa;
import com.gabrielpdev.siso.models.TipoDespesa;
import com.gabrielpdev.siso.models.TipoReceita;
import jakarta.validation.constraints.NotNull;
import lombok.Value;

import java.io.Serializable;
import java.time.OffsetDateTime;

/**
 * DTO for {@link com.gabrielpdev.siso.models.ItemMovimento}
 */
@Value
public class ItemMovimentoDTO implements Serializable {
    @NotNull
    String operacao;
    @NotNull
    String modalidadePagamento;
    @NotNull
    Float valor;
    @NotNull
    Long id_caixa;
    Long id_tipo_despesa;
    Long id_tipo_receita;
    Long id_dentista;
    Long id_fornecedor;
}