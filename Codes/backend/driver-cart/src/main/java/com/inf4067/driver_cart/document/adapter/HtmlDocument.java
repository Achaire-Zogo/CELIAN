package com.inf4067.driver_cart.document.adapter;

import java.io.BufferedWriter;
import java.io.FileWriter;
import java.io.IOException;

import org.springframework.stereotype.Component;

import com.inf4067.driver_cart.document.enumeration.DocumentFormat;

@Component
public class HtmlDocument extends IDocumentFormat{

    @Override
    public void generatedDocument() {
        this.setFormat(DocumentFormat.HTML);
        String htmlContent = "<!DOCTYPE html>\n" +
                                "<html>\n" +
                                "<head>\n" +
                                "<title>" + this.getTitle() + "</title>\n" +
                                "</head>\n" +
                                "<body>\n" +
                                "<h1>" + this.getHeader() + "</h1>\n" +
                                this.getContent().replaceAll("\n", "<br>") + "\n" +
                                "</body>\n" +
                                "</html>";

        //try (BufferedWriter writer = new BufferedWriter(new FileWriter("../storage/" + this.getName() + ".html"))) {
        String path = "storage/" + this.getName() + ".html";
        try (BufferedWriter writer = new BufferedWriter(new FileWriter(path))) {
            this.setFilepath(path);
            writer.write(htmlContent);
        } catch (IOException e) {
            e.printStackTrace();
        }
    }


    /*@Override
    public Document adaptToFormat(VehiculeDocument vehiculeDocument) {
        HtmlDocument htmlDoc = new HtmlDocument();
        htmlDoc.setName(generateFileName(vehiculeDocument));
        htmlDoc.setTitle(getDocumentTitle(vehiculeDocument));
        htmlDoc.setHeader(getDocumentHeader(vehiculeDocument));
        htmlDoc.setContent(vehiculeDocument.getFormattedContent());
        return htmlDoc;
    }*/
    
}
