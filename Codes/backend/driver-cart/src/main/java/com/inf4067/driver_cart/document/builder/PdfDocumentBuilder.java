package com.inf4067.driver_cart.document.builder;

import org.springframework.stereotype.Component;

import com.inf4067.driver_cart.document.model.Document;
import com.inf4067.driver_cart.document.model.PdfDocument;

@Component  
public class PdfDocumentBuilder implements IDocumentBuilder {

    private Document document;

    public PdfDocumentBuilder() {
        this.document = new PdfDocument();
    }

    @Override
    public void setName(String name) {
        this.document.setName(name);
    }
    
    @Override
    public void setHeader(String header) {
        this.document.setHeader(header);
    }
    @Override
    public void setTitle(String title) {
        this.document.setTitle(title); 
    }

    @Override
    public void setContent(String content) {
        this.document.setContent(content);
    }

    @Override
    public Document getDocument() {
        this.document.generatedDocument();
        return this.document;
    }
    
}
