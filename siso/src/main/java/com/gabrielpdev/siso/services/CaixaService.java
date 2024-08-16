package com.gabrielpdev.siso.services;

import com.gabrielpdev.siso.models.Caixa;
import com.gabrielpdev.siso.models.User;
import com.gabrielpdev.siso.repositories.CaixaRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.stereotype.Service;

import java.sql.Timestamp;
import java.time.LocalDateTime;
import java.util.Optional;

@Service
public class CaixaService {

    @Autowired
    CaixaRepository caixaRepository;

    @Autowired
    UserService userService;

    public Optional<Caixa> getCaixaAberto(Long id_usuario) {
        User user = this.userService.findById(id_usuario);
        return caixaRepository.findCaixaByUsuarioAndFechamentoIsNull(user);
    }

    @Transactional
    public void abrirCaixa(Long id_usuario) {
        User user = this.userService.findById(id_usuario);
        if (getCaixaAberto(id_usuario).isPresent()) {
            throw new DataIntegrityViolationException("O usuário já possui um caixa aberto");
        }

        Caixa caixa = new Caixa();
        caixa.setId(null);
        caixa.setUsuario(user);
        caixa.setAbertura(Timestamp.valueOf(LocalDateTime.now()));
        caixa.setFechamento(null);

        this.caixaRepository.save(caixa);
    }

    @Transactional
    public void fecharCaixa(Long id_usuario) {
        Optional<Caixa> caixa = getCaixaAberto(id_usuario);
        if (caixa.isEmpty()){
            throw new DataIntegrityViolationException("O usuário não possui um caixa aberto");
        }
        caixa.get().setFechamento(Timestamp.valueOf(LocalDateTime.now()));

        this.caixaRepository.save(caixa.get());
    }
}
