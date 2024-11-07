package com.gabrielpdev.siso.services;

import com.gabrielpdev.siso.dtos.TipoReceitaDTO;
import com.gabrielpdev.siso.models.TipoReceita;
import com.gabrielpdev.siso.models.exceptions.DataBindingViolationException;
import com.gabrielpdev.siso.models.exceptions.ObjectNotFoundException;
import com.gabrielpdev.siso.repositories.TipoReceitaRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

import static org.springframework.util.StringUtils.capitalize;

@Service
public class TipoReceitaService {

    @Autowired
    private TipoReceitaRepository tipoReceitaRepository;

    public List<TipoReceita> findAll() {
        return tipoReceitaRepository.findAll();
    }

    public TipoReceita findById(Long id) {
        Optional<TipoReceita> tipoReceita = tipoReceitaRepository.findById(id);
        return tipoReceita.orElseThrow(() -> new ObjectNotFoundException("O tipo de receita {id: {"+id+"}} não foi encontrado"));
    }

    @Transactional
    public void createTipoReceita(TipoReceita tipoReceita) {
        tipoReceita.setId(null);
        this.tipoReceitaRepository.save(tipoReceita);
    }

    @Transactional
    public void updateTipoReceita(TipoReceita tipoReceita) {
        TipoReceita newTipoReceita = this.findById(tipoReceita.getId());
        newTipoReceita.setDescricao(tipoReceita.getDescricao());
        this.tipoReceitaRepository.save(newTipoReceita);
    }

    public void deleteTipoReceitaById(Long id) {
        findById(id);

        try {
            this.tipoReceitaRepository.deleteById(id);
        } catch (Exception e) {
            throw new DataBindingViolationException(" O tipo de receita não pode ser deletado.");
        }
    }

    public TipoReceita fromDTO(TipoReceitaDTO tipoReceitaDTO) {
        TipoReceita tipoReceita = new TipoReceita();
        tipoReceita.setDescricao(capitalize(tipoReceitaDTO.getDescricao()));
        return tipoReceita;
    }
}
