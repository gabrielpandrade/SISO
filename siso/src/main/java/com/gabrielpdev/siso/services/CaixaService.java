package com.gabrielpdev.siso.services;

import com.gabrielpdev.siso.models.Caixa;
import com.gabrielpdev.siso.models.ItemMovimento;
import com.gabrielpdev.siso.models.Usuario;
import com.gabrielpdev.siso.models.exceptions.ObjectNotFoundException;
import com.gabrielpdev.siso.repositories.CaixaRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.stereotype.Service;

import java.time.OffsetDateTime;
import java.util.List;
import java.util.Optional;

@Service
public class CaixaService {

    @Autowired
    CaixaRepository caixaRepository;

    @Autowired
    UsuarioService usuarioService;

    public Caixa getCaixaById(Long id) {
        Optional<Caixa> caixa = caixaRepository.findById(id);
        return caixa.orElseThrow(() -> new ObjectNotFoundException("O caixa não foi encontrado"));
    }

    public List<Caixa> getCaixasByUsuario(Long id_usuario) {
        return caixaRepository.findCaixaByUsuario_IdOrderByDataHoraAbertura(id_usuario);
    }

    public Optional<Caixa> getCaixaAberto(Long id_usuario) {
        Usuario usuario = this.usuarioService.findById(id_usuario);
        return caixaRepository.findCaixaByUsuarioAndDataHoraFechamentoIsNull(usuario);
    }

    @Transactional
    public void abrirCaixa(Long id_usuario) {
        Usuario user = this.usuarioService.findById(id_usuario);
        if (getCaixaAberto(id_usuario).isPresent()) {
            throw new DataIntegrityViolationException("O usuário já possui um caixa aberto");
        }

        Caixa caixa = new Caixa();
        caixa.setId(null);
        caixa.setUsuario(user);
        caixa.setDataHoraAbertura(OffsetDateTime.now());
        caixa.setDataHoraFechamento(null);

        this.caixaRepository.save(caixa);
    }

    @Transactional
    public void fecharCaixa(Long id_usuario) {
        Optional<Caixa> caixa = getCaixaAberto(id_usuario);
        if (caixa.isEmpty()){
            throw new DataIntegrityViolationException("O usuário não possui um caixa aberto");
        }
        caixa.get().setDataHoraFechamento(OffsetDateTime.now());

        this.caixaRepository.save(caixa.get());
    }
}
