package com.inf4067.driver_cart.document.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.inf4067.driver_cart.document.model.Document;
import com.inf4067.driver_cart.document.model.HtmlDocument;
import com.inf4067.driver_cart.document.model.PdfDocument;
import com.inf4067.driver_cart.document.service.DocumentService;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;



@RestController
@RequestMapping("/api/documents")
public class DocumentController {
    
    @Autowired
    private DocumentService documentService;

    @PostMapping("/pdf/generate")
    public Document createPdfDocument(@RequestBody PdfDocument document) {
        return documentService.createPdfDocument(document);
    }

    @PostMapping("/html/generate")
    public Document createHtmlDocument(@RequestBody HtmlDocument document) {
        return documentService.createHtmlDocument(document);
    }
    
    @GetMapping
    public List<Document> getDocuments() {
        return documentService.getAllDocuments();
    }
    
    @GetMapping("/{id}")
    public Document getDocument(@PathVariable long id) {
        return documentService.getDocumentById(id);
    }

    @GetMapping("/pdf")
    public List<Document> getPdfDocuments() {
        return documentService.getPdfDocuments();
    }
    
    @GetMapping("/html")
    public List<Document> getHtmlDocuments() {
        return documentService.getHtmlDocuments();
    }
    
    @DeleteMapping("/{id}")
    public String deleteDocument(@PathVariable long id) {
        documentService.deleteDocument(id);
        return "Document deleted";
    }
}
