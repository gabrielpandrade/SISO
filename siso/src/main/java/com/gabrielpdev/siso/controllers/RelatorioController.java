package com.gabrielpdev.siso.controllers;

import com.gabrielpdev.siso.dtos.RelatorioDTO;
import com.gabrielpdev.siso.models.ItemMovimento;
import com.gabrielpdev.siso.services.ItemMovimentoService;
import com.gabrielpdev.siso.services.RelatorioService;
import com.gabrielpdev.siso.services.UsuarioService;
import com.itextpdf.text.DocumentException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.InputStreamResource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.io.ByteArrayInputStream;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;
import java.util.Objects;

@RestController
public class RelatorioController {

    @Autowired
    private ItemMovimentoService itemMovimentoService;

    @Autowired
    private RelatorioService relatorioService;

    @PostMapping("/relatorio")
    public ResponseEntity<InputStreamResource> relatorio(@RequestBody RelatorioDTO relatorioDTO) throws DocumentException, IOException {
        List<ItemMovimento> lista;
        if (Objects.nonNull(relatorioDTO.getId_dentista())) {
            lista = itemMovimentoService.findByDataBetweenDentista(relatorioDTO.getId_dentista(), relatorioDTO.getData_inicio(), relatorioDTO.getData_fim());
        }else {
            lista = itemMovimentoService.findByDataBetween(relatorioDTO.getData_inicio(), relatorioDTO.getData_fim());
        }
        byte[] pdfBytes = relatorioService.criarPdf(lista, relatorioDTO.getData_inicio(), relatorioDTO.getData_fim());
        ByteArrayInputStream bis = new ByteArrayInputStream(pdfBytes);

        HttpHeaders headers = new HttpHeaders();
        headers.add("Content-Disposition", "inline; filename=relatorio.pdf");

        return ResponseEntity
                .ok()
                .headers(headers)
                .contentType(MediaType.APPLICATION_PDF)
                .body(new InputStreamResource(bis));
    }
}
