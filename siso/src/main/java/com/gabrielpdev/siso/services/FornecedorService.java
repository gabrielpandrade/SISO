package com.gabrielpdev.siso.services;

import com.gabrielpdev.siso.models.Fornecedor;
import com.gabrielpdev.siso.models.exceptions.DataBindingViolationException;
import com.gabrielpdev.siso.models.exceptions.ObjectNotFoundException;
import com.gabrielpdev.siso.repositories.FornecedorRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class FornecedorService {

    @Autowired
    private FornecedorRepository fornecedorRepository;

    public List<Fornecedor> findAll() {
        return fornecedorRepository.findAll();
    }

    public Fornecedor findById(Long id) {
        Optional<Fornecedor> fornecedor = fornecedorRepository.findById(id);
        return fornecedorRepository.findById(id).orElseThrow(() -> new ObjectNotFoundException("O fornecedor {id: {"+id+"}} não foi encontrado"));
    }

    @Transactional
    public void createFornecedor(Fornecedor fornecedor) {
        fornecedor.setId(null);
        fornecedorRepository.save(fornecedor);
    }

    @Transactional
    public void updateFornecedor(Fornecedor fornecedor) {
        Fornecedor newFornecedor = findById(fornecedor.getId());
        newFornecedor.setNome(fornecedor.getNome());
        newFornecedor.setFone(fornecedor.getFone());
        fornecedorRepository.save(newFornecedor);
    }

    public void deleteFornecedorById(Long id) {
        findById(id);

        try {
            fornecedorRepository.deleteById(id);
        } catch (Exception e) {
            throw new DataBindingViolationException("O fornecedor não pode ser deletado.");
        }
    }
}
