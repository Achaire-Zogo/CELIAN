package com.inf4067.driver_cart.document.model;

import java.io.BufferedWriter;
import java.io.FileWriter;
import java.io.IOException;

import com.inf4067.driver_cart.document.enumeration.DocumentType;
import jakarta.persistence.Entity;

@Entity
public class HtmlDocument extends Document {

    @Override
    public void generatedDocument() {
        this.setType(DocumentType.HTML);
        String htmlContent = "<!DOCTYPE html>\n" +
                                "<html>\n" +
                                "<head>\n" +
                                "<title>" + this.getTitle() + "</title>\n" +
                                "</head>\n" +
                                "<body>\n" +
                                "<h1>" + this.getHeader() + "</h1>\n" +
                                this.getContent() + "\n" +
                                "</body>\n" +
                                "</html>";

        //try (BufferedWriter writer = new BufferedWriter(new FileWriter("../storage/" + this.getName() + ".html"))) {
        try (BufferedWriter writer = new BufferedWriter(new FileWriter("storage/" + this.getName() + ".html"))) {
            writer.write(htmlContent);
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
    
    
    
}
