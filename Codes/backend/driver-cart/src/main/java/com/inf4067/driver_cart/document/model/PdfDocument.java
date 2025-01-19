package com.inf4067.driver_cart.document.model;

import java.io.FileNotFoundException;
import java.io.FileOutputStream;

import com.inf4067.driver_cart.document.enumeration.DocumentType;
import com.itextpdf.text.DocumentException;
import com.itextpdf.text.Paragraph;
import com.itextpdf.text.pdf.PdfWriter;

import jakarta.persistence.Entity;

@Entity
public class PdfDocument extends Document {

    @Override
    public void generatedDocument() {
        this.setType(DocumentType.PDF);
        com.itextpdf.text.Document document = new com.itextpdf.text.Document();
        try {
            PdfWriter.getInstance(document, new FileOutputStream("storage/" + this.getName() + ".pdf"));
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
