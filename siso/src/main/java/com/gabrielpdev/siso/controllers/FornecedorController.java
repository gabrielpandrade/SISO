package com.gabrielpdev.siso.controllers;

import com.gabrielpdev.siso.dtos.FornecedorDTO;
import com.gabrielpdev.siso.models.Fornecedor;
import com.gabrielpdev.siso.services.FornecedorService;
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
public class FornecedorController {

    @Autowired
    private FornecedorService fornecedorService;

    @GetMapping("/fornecedor")
    public ResponseEntity<List<Fornecedor>> getFornecedor() {
        return ResponseEntity.ok().body(fornecedorService.findAll());
    }

    @GetMapping("/fornecedor/{id_fornecedor}")
    public ResponseEntity<Fornecedor> getFornecedorById(@PathVariable("id_fornecedor") Long id) {
        return  ResponseEntity.ok().body(fornecedorService.findById(id));
    }

    @PostMapping("/fornecedor")
    public  ResponseEntity<Void> postFornecedor(@Valid @RequestBody FornecedorDTO fornecedorDTO) {
        Fornecedor fornecedor = fornecedorService.fromDTO(fornecedorDTO);
        fornecedorService.createFornecedor(fornecedor);

        URI uri = ServletUriComponentsBuilder.fromCurrentRequest().path("/{id_fornecedor").buildAndExpand(fornecedor.getId()).toUri();

        return ResponseEntity.created(uri).build();
    }

    @PutMapping("/fornecedor/{id_fornecedor}")
    public ResponseEntity<Void> putFornecedor(@PathVariable("id_fornecedor") Long id, @RequestBody FornecedorDTO fornecedorDTO) {
        Fornecedor fornecedor = fornecedorService.fromDTO(fornecedorDTO);
        fornecedor.setId(id);

        fornecedorService.updateFornecedor(fornecedor);

        return ResponseEntity.noContent().build();
    }

    @DeleteMapping("/fornecedor/{id_fornecedor}")
    public ResponseEntity<Void> deleteFornecedorById(@PathVariable("id_fornecedor") Long id) {
        fornecedorService.deleteFornecedorById(id);

        return ResponseEntity.noContent().build();
    }
}
