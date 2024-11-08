package com.gabrielpdev.siso.services;

import com.gabrielpdev.siso.dtos.TipoDespesaDTO;
import com.gabrielpdev.siso.models.TipoDespesa;
import com.gabrielpdev.siso.models.exceptions.DataBindingViolationException;
import com.gabrielpdev.siso.models.exceptions.ObjectNotFoundException;
import com.gabrielpdev.siso.repositories.TipoDespesaRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

import static io.jsonwebtoken.lang.Strings.capitalize;

@Service
public class TipoDespesaService {

    @Autowired
    private TipoDespesaRepository tipoDespesaRepository;

    public List<TipoDespesa> findAll(){
        return tipoDespesaRepository.findAllByOrderByDescricao();
    }

    public TipoDespesa findById(Long id){
        Optional<TipoDespesa> tipoDespesa = tipoDespesaRepository.findById(id);
        return tipoDespesa.orElseThrow(() -> new ObjectNotFoundException("O tipo de despesa {id: {"+id+"}} não foi encontrado"));
    }

    @Transactional
    public void createTipoDespesa(TipoDespesa tipoDespesa){
        tipoDespesa.setId(null);
        tipoDespesaRepository.save(tipoDespesa);
    }

    @Transactional
    public void updateTipoDespesa(TipoDespesa tipoDespesa){
        TipoDespesa newTipoDespesa = this.findById(tipoDespesa.getId());
        newTipoDespesa.setId(tipoDespesa.getId());
        tipoDespesaRepository.save(newTipoDespesa);
    }

    public void deleteTipoDespesaById(Long id){
        findById(id);

        try {
            tipoDespesaRepository.deleteById(id);
        } catch (Exception e) {
            throw new DataBindingViolationException("O tipo de despesa não pode ser deletado.");
        }
    }

    public TipoDespesa fromDTO(TipoDespesaDTO tipoDespesaDTO) {
        TipoDespesa tipoDespesa = new TipoDespesa();
        tipoDespesa.setDescricao(capitalize(tipoDespesaDTO.getDescricao()));
        return tipoDespesa;
    }
}
