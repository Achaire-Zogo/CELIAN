package com.inf4067.driver_cart.document.builder;

import org.springframework.stereotype.Component;

import com.inf4067.driver_cart.document.adapter.IDocumentFormat;
import com.inf4067.driver_cart.document.adapter.PdfDocumentAdapter;

@Component  
public class PdfDocumentBuilder implements IDocumentBuilder {

    private IDocumentFormat document;

    public PdfDocumentBuilder() {
        this.document = new PdfDocumentAdapter();
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
    public IDocumentFormat getDocument() {
        //this.document.generatedDocument();
        return this.document;
    }
    
}
