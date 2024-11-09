package com.gabrielpdev.siso.services;

import com.gabrielpdev.siso.models.ItemMovimento;
import org.springframework.stereotype.Service;

import com.itextpdf.text.Document;
import com.itextpdf.text.DocumentException;
import com.itextpdf.text.Element;
import com.itextpdf.text.Font;
import com.itextpdf.text.PageSize;
import com.itextpdf.text.Paragraph;
import com.itextpdf.text.Phrase;
import com.itextpdf.text.pdf.PdfPCell;
import com.itextpdf.text.pdf.PdfPTable;
import com.itextpdf.text.pdf.PdfWriter;

import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.IOException;
import java.time.OffsetDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;

@Service
public class RelatorioService {

    public void criarPdf(String filePath, List<ItemMovimento> movimentos, OffsetDateTime inicio, OffsetDateTime fim) throws DocumentException, IOException, FileNotFoundException {
        Document document = new Document(PageSize.A4);
        PdfWriter.getInstance(document, new FileOutputStream(filePath));
        document.open();

        // Definir fonte
        Font fontTitulo = new Font(Font.FontFamily.HELVETICA, 16, Font.BOLD);
        Font fontNormal = new Font(Font.FontFamily.HELVETICA, 12, Font.NORMAL);

        // Cabeçalho com datas de início e fim
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("dd/MM/yyyy HH:mm:ss");
        String periodo = "Período: " + inicio.format(formatter) + " - " + fim.format(formatter);
        Paragraph titulo = new Paragraph("Relatório de Movimentos", fontTitulo);
        titulo.setAlignment(Element.ALIGN_CENTER);
        document.add(titulo);
        document.add(new Paragraph(periodo, fontNormal));
        document.add(new Paragraph("\n")); // Espaço entre o cabeçalho e a tabela

        // Criação da tabela
        PdfPTable tabela = new PdfPTable(3); // 3 colunas: DataHora, Operação, Valor
        tabela.setWidthPercentage(100);
        tabela.setSpacingBefore(10f);
        tabela.setSpacingAfter(10f);

        // Cabeçalhos da Tabela
        PdfPCell cabecalhoDataHora = new PdfPCell(new Phrase("DataHora", fontNormal));
        PdfPCell cabecalhoOperacao = new PdfPCell(new Phrase("Operação", fontNormal));
        PdfPCell cabecalhoValor = new PdfPCell(new Phrase("Valor", fontNormal));

        cabecalhoDataHora.setHorizontalAlignment(Element.ALIGN_CENTER);
        cabecalhoOperacao.setHorizontalAlignment(Element.ALIGN_CENTER);
        cabecalhoValor.setHorizontalAlignment(Element.ALIGN_CENTER);

        tabela.addCell(cabecalhoDataHora);
        tabela.addCell(cabecalhoOperacao);
        tabela.addCell(cabecalhoValor);

        // Preenchendo a tabela com dados dos itens de movimento
        for (ItemMovimento movimento : movimentos) {
            tabela.addCell(new Phrase(movimento.getDataHoraMovimento().format(formatter), fontNormal));
            tabela.addCell(new Phrase(movimento.getOperacao(), fontNormal));
            tabela.addCell(new Phrase(String.format("%.2f", movimento.getValor()), fontNormal));
        }

        document.add(tabela);
        document.close();
    }
}
