package com.gabrielpdev.siso.controllers;

import com.gabrielpdev.siso.dtos.DentistaDTO;
import com.gabrielpdev.siso.models.Dentista;
import com.gabrielpdev.siso.services.DentistaService;
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
public class DentistaController {

    @Autowired
    private DentistaService dentistaService;

    @GetMapping("/dentista")
    public ResponseEntity<List<Dentista>> getDentistas() {
        return ResponseEntity.ok().body(dentistaService.findAll());
    }

    @GetMapping("/dentista/{id_dentista}")
    public ResponseEntity<Dentista> getDentistaById(@PathVariable("id_dentista") Long id) {
        return  ResponseEntity.ok().body(dentistaService.findById(id));
    }

    @PostMapping("/dentista")
    public  ResponseEntity<Void> postDentista(@Valid @RequestBody DentistaDTO dentista) {
        Dentista newDentista = dentistaService.fromDTO(dentista);
        dentistaService.createDentista(newDentista);

        URI uri = ServletUriComponentsBuilder.fromCurrentRequest().path("/{id_dentista").buildAndExpand(newDentista.getId()).toUri();

        return ResponseEntity.created(uri).build();
    }

    @PutMapping("/dentista/{id_dentista}")
    public ResponseEntity<Void> putDentista(@PathVariable("id_dentista") Long id, @RequestBody Dentista dentista) {
        dentista.setId(id);

        dentistaService.updateDentista(dentista);

        return ResponseEntity.noContent().build();
    }

    @DeleteMapping("/dentista/{id_dentista}")
    public ResponseEntity<Void> deleteDentistaById(@PathVariable("id_dentista") Long id) {
        dentistaService.deleteDentistaById(id);

        return ResponseEntity.noContent().build();
    }
}
