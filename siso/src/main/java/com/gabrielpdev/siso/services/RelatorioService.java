package com.gabrielpdev.siso.services;

import com.gabrielpdev.siso.models.ItemMovimento;
import com.itextpdf.text.*;
import org.springframework.stereotype.Service;

import com.itextpdf.text.pdf.PdfPCell;
import com.itextpdf.text.pdf.PdfPTable;
import com.itextpdf.text.pdf.PdfWriter;

import java.io.ByteArrayOutputStream;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.IOException;
import java.time.OffsetDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;

@Service
public class RelatorioService {

    public byte[] criarPdf(List<ItemMovimento> movimentos, OffsetDateTime inicio, OffsetDateTime fim) throws DocumentException, IOException, FileNotFoundException {
        Document document = new Document(PageSize.A4);
        ByteArrayOutputStream outputStream = new ByteArrayOutputStream();

        PdfWriter.getInstance(document, outputStream);
        document.open();

        // Adiciona a imagem da logo no canto da folha
        Image logo = Image.getInstance("src/main/java/com/gabrielpdev/siso/services/logo.png"); // Use o caminho correto para o arquivo PNG
        logo.setAbsolutePosition(450, 750); // Ajuste a posição conforme necessário (x, y)
        logo.scaleToFit(100, 50); // Redimensiona a imagem para caber no espaço desejado
        document.add(logo);

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

        double totalSangria=0, totalDespesa=0, totalEntrada=0, totalAporte=0;

        // Define a tabela com 7 colunas: DataHora, Operação, Tipo, Dentista/Fornecedor, Usuário, Método de Pagamento, Valor
        PdfPTable tabela = new PdfPTable(7); // Ajuste para 7 colunas
        tabela.setWidthPercentage(100);
        tabela.setSpacingBefore(10f);
        tabela.setSpacingAfter(10f);


// Adicionando as linhas de total (como já presente no código original)
        Font fontBold = new Font(Font.FontFamily.HELVETICA, 12, Font.BOLD);

// Cabeçalhos da Tabela
        PdfPCell cabecalhoDataHora = new PdfPCell(new Phrase("DataHora", fontBold));
        PdfPCell cabecalhoOperacao = new PdfPCell(new Phrase("Operação", fontBold));
        PdfPCell cabecalhoTipo = new PdfPCell(new Phrase("Tipo", fontBold));
        PdfPCell cabecalhoDentistaFornecedor = new PdfPCell(new Phrase("Dentista/Fornecedor", fontBold));
        PdfPCell cabecalhoUsuario = new PdfPCell(new Phrase("Usuário", fontBold));
        PdfPCell cabecalhoMetodoPagamento = new PdfPCell(new Phrase("Modalidade de Pagamento", fontBold)); // Novo cabeçalho
        PdfPCell cabecalhoValor = new PdfPCell(new Phrase("Valor", fontBold));

// Alinhamento dos cabeçalhos
        cabecalhoDataHora.setHorizontalAlignment(Element.ALIGN_CENTER);
        cabecalhoOperacao.setHorizontalAlignment(Element.ALIGN_CENTER);
        cabecalhoTipo.setHorizontalAlignment(Element.ALIGN_CENTER);
        cabecalhoDentistaFornecedor.setHorizontalAlignment(Element.ALIGN_CENTER);
        cabecalhoUsuario.setHorizontalAlignment(Element.ALIGN_CENTER);
        cabecalhoMetodoPagamento.setHorizontalAlignment(Element.ALIGN_CENTER); // Alinhamento do novo cabeçalho
        cabecalhoValor.setHorizontalAlignment(Element.ALIGN_CENTER);

// Adiciona os cabeçalhos à tabela
        tabela.addCell(cabecalhoDataHora);
        tabela.addCell(cabecalhoOperacao);
        tabela.addCell(cabecalhoTipo);
        tabela.addCell(cabecalhoDentistaFornecedor);
        tabela.addCell(cabecalhoUsuario);
        tabela.addCell(cabecalhoMetodoPagamento); // Adiciona a nova coluna
        tabela.addCell(cabecalhoValor);

// Preenchendo a tabela com dados dos itens de movimento e calculando os totais
        for (ItemMovimento movimento : movimentos) {
            // Define a cor da fonte com base no tipo de operação
            BaseColor fontColor;
            switch (movimento.getOperacao().toLowerCase()) {
                case "sangria":
                    fontColor = BaseColor.RED;
                    totalSangria += movimento.getValor();
                    break;
                case "despesa":
                    fontColor = BaseColor.RED;
                    totalDespesa += movimento.getValor();
                    break;
                case "receita":
                    fontColor = BaseColor.BLUE;
                    totalEntrada += movimento.getValor();
                    break;
                case "aporte":
                    fontColor = BaseColor.BLUE;
                    totalAporte += movimento.getValor();
                    break;
                default:
                    fontColor = BaseColor.BLACK; // cor padrão
            }

            // Cria uma fonte com a cor definida
            Font coloredFont = new Font(Font.FontFamily.HELVETICA, 12, Font.NORMAL, fontColor);

            // Adiciona células com os dados de cada coluna
            PdfPCell cellDataHora = new PdfPCell(new Phrase(movimento.getDataHoraMovimento().format(formatter), fontNormal));
            tabela.addCell(cellDataHora);

            PdfPCell cellOperacao = new PdfPCell(new Phrase(movimento.getOperacao(), fontNormal));
            tabela.addCell(cellOperacao);

            // Adiciona a coluna Tipo
            PdfPCell cellTipo;
            switch (movimento.getOperacao().toLowerCase()) {
                case "receita":
                    cellTipo = new PdfPCell(new Phrase(movimento.getTipoReceita().getDescricao(), fontNormal));
                    break;
                case "despesa":
                    cellTipo = new PdfPCell(new Phrase(movimento.getTipoDespesa().getDescricao(), fontNormal));
                    break;
                default:
                    cellTipo = new PdfPCell(new Phrase(" ", fontNormal));
            }
            tabela.addCell(cellTipo);

            // Adiciona a coluna Dentista/Fornecedor
            PdfPCell cellDentistaFornecedor;
            switch (movimento.getOperacao().toLowerCase()) {
                case "receita":
                    cellDentistaFornecedor = new PdfPCell(new Phrase(movimento.getDentista().getNome(), fontNormal));
                    break;
                case "despesa":
                    cellDentistaFornecedor = new PdfPCell(new Phrase(movimento.getFornecedor().getNome(), fontNormal));
                    break;
                default:
                    cellDentistaFornecedor = new PdfPCell(new Phrase(" ", fontNormal));
            }
            tabela.addCell(cellDentistaFornecedor);

            // Adiciona a coluna Usuário
            PdfPCell cellUsuario = new PdfPCell(new Phrase(movimento.getCaixa().getUsuario().getLogin(), fontNormal));
            tabela.addCell(cellUsuario);

            // Adiciona a nova coluna Método de Pagamento
            PdfPCell cellMetodoPagamento = new PdfPCell(new Phrase(movimento.getModalidadePagamento(), fontNormal)); // Supõe que `getMetodoPagamento()` retorna a descrição do método
            tabela.addCell(cellMetodoPagamento);

            // Adiciona a coluna Valor
            PdfPCell cellValor;
            switch (movimento.getOperacao().toLowerCase()) {
                case "aporte", "receita":
                    cellValor = new PdfPCell(new Phrase(String.format("R$%.2f", movimento.getValor()), coloredFont));
                    break;
                case "sangria", "despesa":
                    cellValor = new PdfPCell(new Phrase(String.format("-R$%.2f", movimento.getValor()), coloredFont));
                    break;
                default:
                    cellValor = new PdfPCell(new Phrase(String.format("R$%.2f", movimento.getValor()), fontNormal));
            }
            tabela.addCell(cellValor);
        }

// Adicione as linhas de total para cada tipo de operação, conforme necessário

        PdfPTable tabelaTotais = new PdfPTable(2); // Ajuste para 6 colunas
        tabelaTotais.setWidthPercentage(100);
        tabelaTotais.setSpacingBefore(10f);
        tabelaTotais.setSpacingAfter(10f);

        // Linha de Total para Sangria
        if (totalSangria > 0) {
            tabelaTotais.addCell(new PdfPCell(new Phrase("Total Sangria", fontBold)));
            PdfPCell celula = new PdfPCell(new Phrase(String.format("-R$%.2f", totalSangria), fontBold));
            celula.setHorizontalAlignment(Element.ALIGN_RIGHT);
            tabelaTotais.addCell(celula);
        }

// Linha de Total para Despesa
        if (totalDespesa > 0) {
            tabelaTotais.addCell(new PdfPCell(new Phrase("Total Despesa", fontBold)));
            PdfPCell celula = new PdfPCell(new Phrase(String.format("-R$%.2f", totalDespesa), fontBold));
            celula.setHorizontalAlignment(Element.ALIGN_RIGHT);
            tabelaTotais.addCell(celula);
        }

// Linha de Total para Entrada
        if (totalEntrada > 0) {
            tabelaTotais.addCell(new PdfPCell(new Phrase("Total Entrada", fontBold)));
            PdfPCell celula = new PdfPCell(new Phrase(String.format("R$%.2f", totalEntrada), fontBold));
            celula.setHorizontalAlignment(Element.ALIGN_RIGHT);
            tabelaTotais.addCell(celula);
        }

// Linha de Total para Aporte
        if (totalAporte > 0) {
            tabelaTotais.addCell(new PdfPCell(new Phrase("Total Aporte", fontBold)));
            PdfPCell celula = new PdfPCell(new Phrase(String.format("R$%.2f", totalAporte), fontBold));
            celula.setHorizontalAlignment(Element.ALIGN_RIGHT);
            tabelaTotais.addCell(celula);
        }

        tabelaTotais.addCell(new PdfPCell(new Phrase("Total Líquido", fontBold)));
        PdfPCell celula = new PdfPCell(new Phrase(String.format("R$%.2f", totalAporte + totalEntrada - (totalSangria + totalDespesa)), fontBold));
        celula.setHorizontalAlignment(Element.ALIGN_RIGHT);
        tabelaTotais.addCell(celula);

// Adicione a tabela ao documento
        document.add(tabela);
        document.add(tabelaTotais);
        document.close();

        return outputStream.toByteArray();
    }
}
