package com.gabrielpdev.siso.controllers;

import com.gabrielpdev.siso.models.TipoDespesa;
import com.gabrielpdev.siso.services.TipoDespesaService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.net.URI;
import java.util.List;

@RestController
@RequestMapping("/api/despesa")
@Validated
public class TipoDespesaController {

    @Autowired
    private TipoDespesaService tipoDespesaService;

    @GetMapping
    public ResponseEntity<List<TipoDespesa>> getTipoDespesa() {
        return ResponseEntity.ok().body(tipoDespesaService.findAll());
    }

    @GetMapping("/{id_tipo_despesa")
    public ResponseEntity<TipoDespesa> getTipoDespesaById(@PathVariable("id_tipo_despesa") Long id) {
        return  ResponseEntity.ok().body(tipoDespesaService.findById(id));
    }

    @PostMapping
    public  ResponseEntity<Void> postTipoDespesa(@Valid @RequestBody TipoDespesa tipoDespesa) {
        tipoDespesaService.createTipoDespesa(tipoDespesa);

        URI uri = ServletUriComponentsBuilder.fromCurrentRequest().path("/{id_tipo_despesa").buildAndExpand(tipoDespesa.getId()).toUri();

        return ResponseEntity.created(uri).build();
    }

    @PutMapping("/{id_tipo_despesa")
    public ResponseEntity<Void> putTipoDespesa(@PathVariable("id_tipo_despesa") Long id, @RequestBody TipoDespesa tipoDespesa) {
        tipoDespesa.setId(id);

        tipoDespesaService.updateTipoDespesa(tipoDespesa);

        return ResponseEntity.noContent().build();
    }

    @DeleteMapping("/{id_tipo_despesa}")
    public ResponseEntity<Void> deleteTipoDespesaById(@PathVariable("id_tipo_despesa") Long id) {
        tipoDespesaService.deleteTipoDespesaById(id);

        return ResponseEntity.noContent().build();
    }
}
