package com.inf4067.driver_cart.document.builder;

import com.inf4067.driver_cart.document.adapter.IDocumentFormat;

public interface IDocumentBuilder {

    public void setName(String name);

    public void setHeader(String header);

    public void setTitle(String title);

    public void setContent(String text);

    public IDocumentFormat getDocument();

    //void addImage(String imagePath);
}
