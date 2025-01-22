package com.inf4067.driver_cart.document.adapter;

import org.springframework.stereotype.Component;

import com.inf4067.driver_cart.document.enumeration.DocumentFormat;

import lombok.Data;

@Component
@Data
public abstract class IDocumentFormat {

    private String name;
    private String header;
    private String title;
    private String content;
    private DocumentFormat format;
    private String filepath;

    public abstract void generatedDocument();

    public DocumentFormat getFormat()
    {
        return this.format;
    }

    protected void setFormat(DocumentFormat documentFormat)
    {
        this.format = documentFormat;
    }

    protected void setFilepath(String filepath)
    {
        this.filepath = filepath;
    }

    public String getFilePath()
    {
        return this.filepath;
    }

    //public abstract Document adaptToFormat(VehiculeDocument vehiculeDocument);
}
