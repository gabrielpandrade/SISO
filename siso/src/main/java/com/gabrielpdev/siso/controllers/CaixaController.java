package com.gabrielpdev.siso.controllers;

import com.gabrielpdev.siso.models.Caixa;
import com.gabrielpdev.siso.models.ItemMovimento;
import com.gabrielpdev.siso.models.exceptions.ObjectNotFoundException;
import com.gabrielpdev.siso.services.CaixaService;
import com.gabrielpdev.siso.services.ItemMovimentoService;
import com.gabrielpdev.siso.services.UsuarioService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.net.URI;
import java.util.List;
import java.util.Optional;

@RestController
public class CaixaController {

    @Autowired
    UsuarioService usuarioService;

    @Autowired
    CaixaService caixaService;
    @Autowired
    private ItemMovimentoService itemMovimentoService;

    @GetMapping("/caixa")
    public ResponseEntity<Long> getCaixa() {
        Long id = usuarioService.authenticated().getId();
        System.out.println(id);
        Optional<Caixa> caixa = caixaService.getCaixaAberto(id);

        return caixa.map(c -> ResponseEntity.ok(c.getId()))
                .orElseGet(() -> ResponseEntity.noContent().build());
    }


    @PostMapping("/caixa")
    public ResponseEntity<Caixa> postCaixa(){
        Long id = usuarioService.authenticated().getId();
        caixaService.abrirCaixa(id);
        URI uri = ServletUriComponentsBuilder.fromCurrentRequest().path("/{id_usuario}").buildAndExpand(id).toUri();
        return ResponseEntity.created(uri).build();
    }

    @PutMapping("/caixa")
    public ResponseEntity<Caixa> putCaixa(){
        Long id = usuarioService.authenticated().getId();
        caixaService.fecharCaixa(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/caixa/movimentos")
    public ResponseEntity<List<ItemMovimento>> getMovimentos() {
        Long id = usuarioService.authenticated().getId();
        Optional<Caixa> caixa_opt = caixaService.getCaixaAberto(id);
        Caixa caixa = caixa_opt.orElseThrow(() -> new DataIntegrityViolationException("O caixa está fechado"));
        List<ItemMovimento> movimentos = itemMovimentoService.findByCaixaId(caixa.getId());
        System.out.println(movimentos);
        return ResponseEntity.ok().body(movimentos);
    }

    @GetMapping("/admin/caixa/{id_usuario}")
    public ResponseEntity<Caixa> getCaixaAdmin(@PathVariable Long id_usuario){
        Optional<Caixa> caixa = caixaService.getCaixaAberto(id_usuario);
        caixa.ifPresent(value -> ResponseEntity.ok().body(value));
        return ResponseEntity.ok().body(null);
    }

    @PutMapping("/admin/caixa/{id_usuario}")
    public ResponseEntity<Caixa> putCaixaAdmin(@PathVariable Long id_usuario){
        caixaService.fecharCaixa(id_usuario);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/admin/caixa/{id_usuario}/movimentos")
    public ResponseEntity<List<ItemMovimento>> getMovimentosByUsuarioAdmin(@PathVariable Long id_usuario){
        Optional<Caixa> caixa_opt = caixaService.getCaixaAberto(id_usuario);
        Caixa caixa = caixa_opt.orElseThrow(() -> new ObjectNotFoundException("Caixa não encontrado"));
        List<ItemMovimento> movimentos = itemMovimentoService.findByCaixaId(caixa.getId());
        return ResponseEntity.ok().body(movimentos);
    }

    @GetMapping("/admin/caixa/{id_caixa}/movimentos")
    public ResponseEntity<List<ItemMovimento>> getMovimentosByCaixaAdmin(@PathVariable Long id_caixa){
        List<ItemMovimento> movimentos = itemMovimentoService.findByCaixaId(id_caixa);
        return ResponseEntity.ok().body(movimentos);
    }

    @GetMapping("/admin/caixas/{id_usuario}")
    public ResponseEntity<List<Caixa>> getCaixasByUser(@PathVariable Long id_usuario) {
        List<Caixa> caixa = caixaService.getCaixasByUsuario(id_usuario);
        return ResponseEntity.ok().body(caixa);
    }
}
