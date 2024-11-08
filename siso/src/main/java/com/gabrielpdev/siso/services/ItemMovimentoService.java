package com.gabrielpdev.siso.services;

import com.gabrielpdev.siso.dtos.ItemMovimentoDTO;
import com.gabrielpdev.siso.dtos.ItemMovimentoUpdateDTO;
import com.gabrielpdev.siso.models.ItemMovimento;
import com.gabrielpdev.siso.models.exceptions.DataBindingViolationException;
import com.gabrielpdev.siso.models.exceptions.ObjectNotFoundException;
import com.gabrielpdev.siso.repositories.ItemMovimentoRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Objects;
import java.util.Optional;

import static org.apache.tomcat.util.IntrospectionUtils.capitalize;

@Service
public class ItemMovimentoService {

    @Autowired
    private ItemMovimentoRepository itemMovimentoRepository;

    @Autowired
    private CaixaService caixaService;

    @Autowired
    private TipoDespesaService tipoDespesaService;

    @Autowired
    private TipoReceitaService tipoReceitaService;

    @Autowired
    private DentistaService dentistaService;

    @Autowired
    private FornecedorService fornecedorService;

    public List<ItemMovimento> findAll() {
        return itemMovimentoRepository.findAll();
    }

    public ItemMovimento findById(Long id) {
        Optional<ItemMovimento> itemMovimento = itemMovimentoRepository.findById(id);
        return itemMovimentoRepository.findById(id).orElseThrow(() -> new ObjectNotFoundException("O itemMovimento {id: {"+id+"}} não foi encontrado"));
    }

    public List<ItemMovimento> findByCaixaId(Long id_caixa) {

        return itemMovimentoRepository.findByCaixa_Id(id_caixa);
    }

    @Transactional
    public void createItemMovimento(ItemMovimento itemMovimento) {
        itemMovimento.setId(null);
        itemMovimentoRepository.save(itemMovimento);
    }

    @Transactional
    public void updateItemMovimento(ItemMovimento itemMovimento) {
        ItemMovimento newItemMovimento = findById(itemMovimento.getId());
        newItemMovimento.setDentista(itemMovimento.getDentista());
        newItemMovimento.setFornecedor(itemMovimento.getFornecedor());
        newItemMovimento.setTipoDespesa(itemMovimento.getTipoDespesa());
        newItemMovimento.setTipoReceita(itemMovimento.getTipoReceita());
        newItemMovimento.setValor(itemMovimento.getValor());
        newItemMovimento.setOperacao(itemMovimento.getOperacao());
        itemMovimentoRepository.save(newItemMovimento);
    }

    public void deleteItemMovimentoById(Long id) {
        findById(id);

        try {
            itemMovimentoRepository.deleteById(id);
        } catch (Exception e) {
            throw new DataBindingViolationException("O itemMovimento não pode ser deletado.");
        }
    }

    public ItemMovimento fromDTO(ItemMovimentoDTO itemMovimentoDTO) {
        ItemMovimento itemMovimento = new ItemMovimento();
        itemMovimento.setOperacao(capitalize(itemMovimentoDTO.getOperacao()));
        itemMovimento.setModalidadePagamento(capitalize(itemMovimentoDTO.getModalidadePagamento()));
        itemMovimento.setValor(itemMovimentoDTO.getValor());
        itemMovimento.setCaixa(caixaService.getCaixaById(itemMovimentoDTO.getId_caixa()));
        if(Objects.nonNull(itemMovimentoDTO.getId_tipo_despesa())) {
            itemMovimento.setTipoDespesa(tipoDespesaService.findById(itemMovimentoDTO.getId_tipo_despesa()));
        }
        if(Objects.nonNull(itemMovimentoDTO.getId_tipo_receita())) {
            itemMovimento.setTipoReceita(tipoReceitaService.findById(itemMovimentoDTO.getId_tipo_receita()));
        }
        if(Objects.nonNull(itemMovimentoDTO.getId_dentista())) {
            itemMovimento.setDentista(dentistaService.findById(itemMovimentoDTO.getId_dentista()));
        }
        if(Objects.nonNull(itemMovimentoDTO.getId_fornecedor())) {
            itemMovimento.setFornecedor(fornecedorService.findById(itemMovimentoDTO.getId_fornecedor()));
        }
        return itemMovimento;
    }

    public ItemMovimento fromDTO(ItemMovimentoUpdateDTO itemMovimentoDTO) {
        ItemMovimento itemMovimento = new ItemMovimento();
        itemMovimento.setOperacao(capitalize(itemMovimentoDTO.getOperacao()));
        itemMovimento.setModalidadePagamento(capitalize(itemMovimentoDTO.getModalidadePagamento()));
        itemMovimento.setValor(itemMovimentoDTO.getValor());
        if(Objects.nonNull(itemMovimentoDTO.getId_tipo_despesa())) {
            itemMovimento.setTipoDespesa(tipoDespesaService.findById(itemMovimentoDTO.getId_tipo_despesa()));
        }
        if(Objects.nonNull(itemMovimentoDTO.getId_tipo_receita())) {
            itemMovimento.setTipoReceita(tipoReceitaService.findById(itemMovimentoDTO.getId_tipo_receita()));
        }
        if(Objects.nonNull(itemMovimentoDTO.getId_dentista())) {
            itemMovimento.setDentista(dentistaService.findById(itemMovimentoDTO.getId_dentista()));
        }
        if(Objects.nonNull(itemMovimentoDTO.getId_fornecedor())) {
            itemMovimento.setFornecedor(fornecedorService.findById(itemMovimentoDTO.getId_fornecedor()));
        }
        return itemMovimento;
    }
}

