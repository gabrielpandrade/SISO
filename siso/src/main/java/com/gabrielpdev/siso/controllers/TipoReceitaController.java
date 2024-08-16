package com.gabrielpdev.siso.controllers;

import com.gabrielpdev.siso.models.TipoReceita;
import com.gabrielpdev.siso.services.TipoReceitaService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.net.URI;
import java.util.List;

@RestController
@RequestMapping("/api/receita")
@Validated
public class TipoReceitaController {

    @Autowired
    private TipoReceitaService tipoReceitaService;

    @GetMapping
    public ResponseEntity<List<TipoReceita>> getTipoReceita() {
        return ResponseEntity.ok().body(tipoReceitaService.findAll());
    }

    @GetMapping("/{id_tipo_receita}")
    public ResponseEntity<TipoReceita> getTipoReceitaById(@PathVariable("id_tipo_receita") Long id) {
        return ResponseEntity.ok().body(tipoReceitaService.findById(id));
    }

    @PostMapping
    public ResponseEntity<Void> postTipoReceita(@Valid @RequestBody TipoReceita tipoReceita) {
        tipoReceitaService.createTipoReceita(tipoReceita);

        URI uri = ServletUriComponentsBuilder.fromCurrentRequest().path("/{id_tipo_receita}").buildAndExpand(tipoReceita.getId()).toUri();

        return ResponseEntity.created(uri).build();
    }

    @PutMapping("/{id_tipo_receita}")
    public ResponseEntity<Void> putTipoReceita(@PathVariable("id_tipo_receita") Long id, @Valid @RequestBody TipoReceita tipoReceita) {
        tipoReceita.setId(id);

        tipoReceitaService.updateTipoReceita(tipoReceita);

        return ResponseEntity.noContent().build();
    }

    @DeleteMapping("/{id_tipo_receita}")
    public ResponseEntity<Void> deleteTipoReceitaById(@PathVariable("id_tipo_receita") Long id) {
        tipoReceitaService.deleteTipoReceitaById(id);

        return ResponseEntity.noContent().build();
    }

}
