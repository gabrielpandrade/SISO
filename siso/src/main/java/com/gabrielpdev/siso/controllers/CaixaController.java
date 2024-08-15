package com.gabrielpdev.siso.controllers;

import com.gabrielpdev.siso.models.Caixa;
import com.gabrielpdev.siso.services.CaixaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/api/caixa")
public class CaixaController {

    @Autowired
    CaixaService caixaService;

    @GetMapping("/{id_usuario}")
    public ResponseEntity<Caixa> getCaixa(@PathVariable Long id_usuario) {
        Optional<Caixa> caixa = this.caixaService.getCaixaAberto(id_usuario);
        caixa.ifPresent(value -> ResponseEntity.ok().body(value));
        return ResponseEntity.ok().body(null);
    }

    @PostMapping("/{id_usuario}")
    public ResponseEntity<Void> postCaixa(@PathVariable Long id_usuario) {
        this.caixaService.abrirCaixa(id_usuario);
        return ResponseEntity.noContent().build();
    }

    @PutMapping("/{id_usuario}")
    public ResponseEntity<Void> putCaixa(@PathVariable Long id_usuario) {
        this.caixaService.fecharCaixa(id_usuario);
        return ResponseEntity.noContent().build();
    }
}
