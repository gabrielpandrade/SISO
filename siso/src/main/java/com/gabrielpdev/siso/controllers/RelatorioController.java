package com.gabrielpdev.siso.controllers;

import com.gabrielpdev.siso.dtos.RelatorioDTO;
import com.gabrielpdev.siso.models.ItemMovimento;
import com.gabrielpdev.siso.services.ItemMovimentoService;
import com.gabrielpdev.siso.services.RelatorioService;
import com.gabrielpdev.siso.services.UsuarioService;
import com.itextpdf.text.DocumentException;
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

    private final ItemMovimentoService itemMovimentoService;
    private final UsuarioService usuarioService;
    private final RelatorioService relatorioService;

    public RelatorioController(ItemMovimentoService itemMovimentoService, UsuarioService usuarioService, RelatorioService relatorioService) {
        this.itemMovimentoService = itemMovimentoService;
        this.usuarioService = usuarioService;
        this.relatorioService = relatorioService;
    }

    @PostMapping("/relatorio")
    public ResponseEntity<InputStreamResource> relatorio(@RequestBody RelatorioDTO relatorioDTO) throws DocumentException, IOException {
        Long id_usuario = usuarioService.authenticated().getId();
        List<ItemMovimento> lista;
        if (Objects.nonNull(relatorioDTO.getId_dentista())) {
            lista = itemMovimentoService.findByDataBetweenDentista(id_usuario, relatorioDTO.getId_dentista(), relatorioDTO.getData_inicio(), relatorioDTO.getData_fim());
        }else {
            lista = itemMovimentoService.findByDataBetween(id_usuario, relatorioDTO.getData_inicio(), relatorioDTO.getData_fim());
        }
        relatorioService.criarPdf("relatorio.pdf", lista, relatorioDTO.getData_inicio(), relatorioDTO.getData_fim());
        Path pdfPath = Paths.get("relatorio.pdf");
        ByteArrayInputStream bis = new ByteArrayInputStream(Files.readAllBytes(pdfPath));

        HttpHeaders headers = new HttpHeaders();
        headers.add("Content-Disposition", "inline; filename=relatorio.pdf");

        return ResponseEntity
                .ok()
                .headers(headers)
                .contentType(MediaType.APPLICATION_PDF)
                .body(new InputStreamResource(bis));
    }
}
