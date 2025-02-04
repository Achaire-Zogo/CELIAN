package com.inf4067.driver_cart.document.controller;

import java.io.FileNotFoundException;
import java.io.IOException;
import org.springframework.http.HttpHeaders;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import org.springframework.core.io.Resource;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.UrlResource;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
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
import org.springframework.web.bind.annotation.RequestParam;




@RestController
@RequestMapping("/api/documents")
public class DocumentController {
    
    @Autowired
    private DocumentService documentService;

    private final Path storagePath = Paths.get("storage");

    /*@PostMapping("/pdf/generate")
    public DocumentBundle createPdfDocument(@RequestBody BundleRequest request) {
        return documentService.createPdfDocument(request);
    }*/

    /*@PostMapping("/html/generate")
    public DocumentBundle createHtmlDocument(@RequestBody BundleRequest request) {
        return documentService.createHtmlDocument(request);
    }*/
    
    @GetMapping
    public List<VehicleDocument> getDocuments() {
        return documentService.getAllDocuments();
    }
    
    @GetMapping("/download/{filename}")
    public ResponseEntity<Resource> downloadFile(@PathVariable String filename) throws IOException {
        Path filePath = storagePath.resolve(filename).normalize();

        Resource resource = new UrlResource(filePath.toUri());

        if(!resource.exists() || !resource.isReadable())
        {
            throw new FileNotFoundException("File not found");
        }

        return ResponseEntity.ok()
            .contentType(MediaType.APPLICATION_OCTET_STREAM)
            .header(HttpHeaders.CONTENT_DISPOSITION, "attachement=\"" + resource.getFilename() + "\"")
            .body(resource);
    }

    @GetMapping("/get-by-order/{orderId}")
    public List<String> getDocumentsByOrder(@PathVariable long orderId) {
        List<VehicleDocument> documents = documentService.getDocumentsByOrder(orderId);

        List<String> paths = new ArrayList<>();

        for (VehicleDocument document : documents) {
            String filename = document.getFilepath().split("storage/")[1];

            paths.add(filename);
        }
        return paths;
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
