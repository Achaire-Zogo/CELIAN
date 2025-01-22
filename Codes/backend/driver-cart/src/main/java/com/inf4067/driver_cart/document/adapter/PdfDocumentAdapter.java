package com.inf4067.driver_cart.document.adapter;

import java.io.FileNotFoundException;
import java.io.FileOutputStream;

import com.inf4067.driver_cart.document.enumeration.DocumentFormat;
import com.itextpdf.text.DocumentException;
import com.itextpdf.text.Paragraph;
import com.itextpdf.text.pdf.PdfWriter;

public class PdfDocumentAdapter extends IDocumentFormat{

    @Override
    public void generatedDocument() {
        this.setFormat(DocumentFormat.PDF);
        com.itextpdf.text.Document document = new com.itextpdf.text.Document();
        try {
            String path = "storage/" + this.getName() + ".pdf";
            PdfWriter.getInstance(document, new FileOutputStream(path));

            this.setFilepath(path);

            document.open();
            document.addTitle(this.getTitle());
            document.addHeader("PDF HEADER", this.getHeader());
            document.add(new Paragraph(this.getContent()));
        } catch (FileNotFoundException | DocumentException e) {
            e.printStackTrace();
        } finally {
            document.close();
        }
    }
    
}
