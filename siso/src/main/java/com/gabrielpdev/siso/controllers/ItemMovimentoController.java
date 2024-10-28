package com.gabrielpdev.siso.controllers;

import com.gabrielpdev.siso.dtos.ItemMovimentoDTO;
import com.gabrielpdev.siso.dtos.ItemMovimentoUpdateDTO;
import com.gabrielpdev.siso.models.ItemMovimento;
import com.gabrielpdev.siso.services.ItemMovimentoService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.net.URI;

@RestController
public class ItemMovimentoController {

    @Autowired
    ItemMovimentoService itemMovimentoService;

    @PostMapping("/movimento")
    public ResponseEntity<ItemMovimento> addItem(@RequestBody @Valid ItemMovimentoDTO item){
        ItemMovimento newItem = itemMovimentoService.fromDTO(item);
        itemMovimentoService.createItemMovimento(newItem);
        URI uri = ServletUriComponentsBuilder.fromCurrentRequest().path("/{id_movimento}").buildAndExpand(newItem.getId()).toUri();
        return ResponseEntity.created(uri).build();
    }

    @GetMapping("/movimento/{id_movimento}")
    public ResponseEntity<ItemMovimento> getItem(@PathVariable Long id_movimento){
        ItemMovimento itemMovimento = itemMovimentoService.findById(id_movimento);
        return ResponseEntity.ok().body(itemMovimento);
    }

    @PutMapping("/movimento/{id_movimento}")
    public ResponseEntity<Void> updateItem(@PathVariable Long id_movimento, @RequestBody @Valid ItemMovimentoUpdateDTO item){
        ItemMovimento itemMovimento = itemMovimentoService.fromDTO(item);
        itemMovimento.setId(id_movimento);
        itemMovimentoService.updateItemMovimento(itemMovimento);
        return ResponseEntity.noContent().build();
    }
}
