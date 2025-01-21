package com.inf4067.driver_cart.document.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.inf4067.driver_cart.document.model.VehicleDocument;
import com.inf4067.driver_cart.document.request.BundleRequest;
import com.inf4067.driver_cart.document.service.DocumentService;
import com.inf4067.driver_cart.document.singleton.DocumentBundle;

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
    public DocumentBundle createPdfDocument(@RequestBody BundleRequest request) {
        return documentService.createPdfDocument(request);
    }

    @PostMapping("/html/generate")
    public DocumentBundle createHtmlDocument(@RequestBody BundleRequest request) {
        return documentService.createHtmlDocument(request);
    }
    
    @GetMapping
    public List<VehicleDocument> getDocuments() {
        return documentService.getAllDocuments();
    }
    
    @GetMapping("/{id}")
    public VehicleDocument getDocument(@PathVariable long id) {
        return documentService.getDocumentById(id);
    }

    @GetMapping("/pdf")
    public List<VehicleDocument> getPdfDocuments() {
        return documentService.getPdfDocuments();
    }
    
    @GetMapping("/html")
    public List<VehicleDocument> getHtmlDocuments() {
        return documentService.getHtmlDocuments();
    }
    
    @GetMapping("/registration-requests")
    public List<VehicleDocument> getRegistrationRequestsDocuments() {
        return documentService.getRegistrationRequestsDocuments();
    }

    @GetMapping("/transfert-certificates")
    public List<VehicleDocument> getTransfertCertificateDocuments() {
        return documentService.getTransfertCertificatesDocuments();
    }

    @GetMapping("/purchase-orders")
    public List<VehicleDocument> getPurchaseOrdersDocuments() {
        return documentService.getPurchaseOrdersDocuments();
    }

    @DeleteMapping("/{id}")
    public String deleteDocument(@PathVariable long id) {
        documentService.deleteDocument(id);
        return "Document deleted";
    }
}
