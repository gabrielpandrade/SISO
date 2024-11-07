package com.gabrielpdev.siso.controllers;

import com.gabrielpdev.siso.dtos.TipoReceitaDTO;
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
@Validated
public class TipoReceitaController {

    @Autowired
    private TipoReceitaService tipoReceitaService;

    @GetMapping("/receita")
    public ResponseEntity<List<TipoReceita>> getTipoReceita() {
        return ResponseEntity.ok().body(tipoReceitaService.findAll());
    }

    @GetMapping("/receita/{id_tipo_receita}")
    public ResponseEntity<TipoReceita> getTipoReceitaById(@PathVariable("id_tipo_receita") Long id) {
        return ResponseEntity.ok().body(tipoReceitaService.findById(id));
    }

    @PostMapping("/receita")
    public ResponseEntity<Void> postTipoReceita(@Valid @RequestBody TipoReceitaDTO tipoReceitaDTO) {
        TipoReceita tipoReceita = tipoReceitaService.fromDTO(tipoReceitaDTO);
        tipoReceitaService.createTipoReceita(tipoReceita);

        URI uri = ServletUriComponentsBuilder.fromCurrentRequest().path("/{id_tipo_receita}").buildAndExpand(tipoReceita.getId()).toUri();

        return ResponseEntity.created(uri).build();
    }

    @PutMapping("/receita/{id_tipo_receita}")
    public ResponseEntity<Void> putTipoReceita(@PathVariable("id_tipo_receita") Long id, @Valid @RequestBody TipoReceitaDTO tipoReceitaDTO) {
        TipoReceita tipoReceita = tipoReceitaService.fromDTO(tipoReceitaDTO);
        tipoReceita.setId(id);

        tipoReceitaService.updateTipoReceita(tipoReceita);

        return ResponseEntity.noContent().build();
    }

    @DeleteMapping("/receita/{id_tipo_receita}")
    public ResponseEntity<Void> deleteTipoReceitaById(@PathVariable("id_tipo_receita") Long id) {
        tipoReceitaService.deleteTipoReceitaById(id);

        return ResponseEntity.noContent().build();
    }

}
