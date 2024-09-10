package com.gabrielpdev.siso.services;

import com.gabrielpdev.siso.models.ItemMovimento;
import com.gabrielpdev.siso.models.exceptions.DataBindingViolationException;
import com.gabrielpdev.siso.models.exceptions.ObjectNotFoundException;
import com.gabrielpdev.siso.repositories.ItemMovimentoRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ItemMovimentoService {

    @Autowired
    private ItemMovimentoRepository itemMovimentoRepository;

    public List<ItemMovimento> findAll() {
        return itemMovimentoRepository.findAll();
    }

    public ItemMovimento findById(Long id) {
        Optional<ItemMovimento> itemMovimento = itemMovimentoRepository.findById(id);
        return itemMovimentoRepository.findById(id).orElseThrow(() -> new ObjectNotFoundException("O itemMovimento {id: {"+id+"}} não foi encontrado"));
    }

    @Transactional
    public void createItemMovimento(ItemMovimento itemMovimento) {
        itemMovimento.setId(null);
        itemMovimentoRepository.save(itemMovimento);
    }

    @Transactional
    public void updateItemMovimento(ItemMovimento itemMovimento) {
        ItemMovimento newItemMovimento = findById(itemMovimento.getId());
        newItemMovimento.setCaixa(itemMovimento.getCaixa());
        newItemMovimento.setDataHoraMovimento(itemMovimento.getDataHoraMovimento());
        newItemMovimento.setDentista(itemMovimento.getDentista());
        newItemMovimento.setFornecedor(itemMovimento.getFornecedor());
        newItemMovimento.setDespesa(itemMovimento.getDespesa());
        newItemMovimento.setReceita(itemMovimento.getReceita());
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
}

