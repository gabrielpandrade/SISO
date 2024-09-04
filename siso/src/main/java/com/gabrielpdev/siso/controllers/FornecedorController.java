package com.gabrielpdev.siso.controllers;

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
@RequestMapping("/api/fornecedor")
@Validated
public class FornecedorController {

    @Autowired
    private FornecedorService fornecedorService;

    @GetMapping
    public ResponseEntity<List<Fornecedor>> getFornecedor() {
        return ResponseEntity.ok().body(fornecedorService.findAll());
    }

    @GetMapping("/{id_fornecedor}")
    public ResponseEntity<Fornecedor> getFornecedorById(@PathVariable("id_fornecedor") Long id) {
        return  ResponseEntity.ok().body(fornecedorService.findById(id));
    }

    @PostMapping
    public  ResponseEntity<Void> postFornecedor(@Valid @RequestBody Fornecedor fornecedor) {
        fornecedorService.createFornecedor(fornecedor);

        URI uri = ServletUriComponentsBuilder.fromCurrentRequest().path("/{id_fornecedor").buildAndExpand(fornecedor.getId()).toUri();

        return ResponseEntity.created(uri).build();
    }

    @PutMapping("/{id_fornecedor}")
    public ResponseEntity<Void> putFornecedor(@PathVariable("id_fornecedor") Long id, @RequestBody Fornecedor fornecedor) {
        fornecedor.setId(id);

        fornecedorService.updateFornecedor(fornecedor);

        return ResponseEntity.noContent().build();
    }

    @DeleteMapping("/{id_fornecedor}")
    public ResponseEntity<Void> deleteFornecedorById(@PathVariable("id_fornecedor") Long id) {
        fornecedorService.deleteFornecedorById(id);

        return ResponseEntity.noContent().build();
    }
}
