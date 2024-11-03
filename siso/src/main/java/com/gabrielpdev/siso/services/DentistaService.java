package com.gabrielpdev.siso.services;

import com.gabrielpdev.siso.dtos.DentistaDTO;
import com.gabrielpdev.siso.models.Dentista;
import com.gabrielpdev.siso.models.exceptions.DataBindingViolationException;
import com.gabrielpdev.siso.models.exceptions.ObjectNotFoundException;
import com.gabrielpdev.siso.repositories.DentistaRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class DentistaService {

    @Autowired
    private DentistaRepository dentistaRepository;

    public List<Dentista> findAll() {
        return dentistaRepository.findAll();
    }

    public Dentista findById(Long id) {
        Optional<Dentista> dentista = dentistaRepository.findById(id);
        return dentistaRepository.findById(id).orElseThrow(() -> new ObjectNotFoundException("O dentista {id: {"+id+"}} não foi encontrado"));
    }

    @Transactional
    public void createDentista(Dentista dentista) {
        dentista.setId(null);
        dentistaRepository.save(dentista);
    }

    @Transactional
    public void updateDentista(Dentista dentista) {
        Dentista newDentista = findById(dentista.getId());
        newDentista.setNome(dentista.getNome());
        newDentista.setFone(dentista.getFone());
        newDentista.setCro(dentista.getCro());
        newDentista.setPercentualRecebido(dentista.getPercentualRecebido());
        dentistaRepository.save(newDentista);
    }

    public void deleteDentistaById(Long id) {
        findById(id);

        try {
            dentistaRepository.deleteById(id);
        } catch (Exception e) {
            throw new DataBindingViolationException("O dentista não pode ser deletado.");
        }
    }

    public Dentista fromDTO(DentistaDTO dentistaDTO) {
        Dentista dentista = new Dentista();
        dentista.setNome(dentistaDTO.getNome());
        dentista.setFone(dentistaDTO.getFone());
        dentista.setCro(dentistaDTO.getCro());
        dentista.setPercentualRecebido(dentistaDTO.getPercentualRecebido());
        return dentista;
    }
}
