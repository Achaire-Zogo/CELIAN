package com.inf4067.driver_cart.document.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.inf4067.driver_cart.document.builder.HtmlDocumentBuilder;
import com.inf4067.driver_cart.document.builder.IDocumentBuilder;
import com.inf4067.driver_cart.document.builder.PdfDocumentBuilder;
import com.inf4067.driver_cart.document.enumeration.DocumentType;
import com.inf4067.driver_cart.document.model.Document;
import com.inf4067.driver_cart.document.repository.DocumentRepository;

@Service
public class DocumentService {
    
    @Autowired
    private DocumentRepository documentRepository;

    private IDocumentBuilder documentBuilder;

    public Document createHtmlDocument(Document document) {

        documentBuilder = new HtmlDocumentBuilder();

        documentBuilder.setName(document.getName());
        documentBuilder.setHeader(document.getHeader());
        documentBuilder.setTitle(document.getTitle());
        documentBuilder.setContent(document.getContent());

        Document htmlDocument = documentBuilder.getDocument();

        return documentRepository.save(htmlDocument);
    }
    
    public Document createPdfDocument(Document document) {

        documentBuilder = new PdfDocumentBuilder();

        documentBuilder.setName(document.getName());
        documentBuilder.setHeader(document.getHeader());
        documentBuilder.setTitle(document.getTitle());
        documentBuilder.setContent(document.getContent());

        Document pdfDocument = documentBuilder.getDocument();

        return documentRepository.save(pdfDocument);
    }

    public Document getDocumentById(Long id) {
        return documentRepository.findById(id).orElse(null);
    }

    public void deleteDocument(Long id) {
        documentRepository.deleteById(id);
    }

    public List<Document> getAllDocuments() {
        return documentRepository.findAll();
    }

    public List<Document> getHtmlDocuments() {
        return documentRepository.findByType(DocumentType.HTML);
    }

    public List<Document> getPdfDocuments() {
        return documentRepository.findByType(DocumentType.PDF);
    }
}
