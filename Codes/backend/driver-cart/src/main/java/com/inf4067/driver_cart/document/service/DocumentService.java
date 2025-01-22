package com.inf4067.driver_cart.document.service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.inf4067.driver_cart.document.builder.HtmlDocumentBuilder;
import com.inf4067.driver_cart.document.builder.IDocumentBuilder;
import com.inf4067.driver_cart.document.builder.PdfDocumentBuilder;
import com.inf4067.driver_cart.document.enumeration.DocumentFormat;
import com.inf4067.driver_cart.document.enumeration.DocumentType;
import com.inf4067.driver_cart.document.model.PurchaseOrder;
import com.inf4067.driver_cart.document.model.RegistrationRequest;
import com.inf4067.driver_cart.document.model.TransfertCertificate;
import com.inf4067.driver_cart.document.model.VehicleDocument;
import com.inf4067.driver_cart.document.repository.VehicleDocumentRepository;
import com.inf4067.driver_cart.document.request.BundleRequest;
import com.inf4067.driver_cart.document.singleton.DocumentBundle;

@Service
public class DocumentService {
    
    @Autowired
    private VehicleDocumentRepository documentRepository;

    private DocumentBundle buildBundle(BundleRequest request, IDocumentBuilder documentBuilder)
    {
        // Set datas for RegistrationRequest
        RegistrationRequest registrationRequest = new RegistrationRequest();
        registrationRequest.setVehicleId(String.valueOf(request.getVehicleId()));
        registrationRequest.setOwnerInfo(String.valueOf(request.getBuyerId()));
        registrationRequest.setVehicleDetails("Vehicle Details :" + String.valueOf(request.getVehicleId()));

        // Set Datas for TransfertCertificate
        TransfertCertificate transfertCertificate = new TransfertCertificate();
        transfertCertificate.setVehicleId(String.valueOf(request.getVehicleId()));
        transfertCertificate.setSellerInfo(String.valueOf(request.getSellerId()));
        transfertCertificate.setBuyerInfo(String.valueOf(request.getBuyerId()));
        transfertCertificate.setTransferDate(request.getTransfertDate());

        // Set Datas for purchase Order
        PurchaseOrder purchaseOrder = new PurchaseOrder();
        purchaseOrder.setCustomerInfo(String.valueOf(request.getBuyerId()));
        purchaseOrder.setVehicleDetails("Vehicle Details : " + String.valueOf(request.getVehicleId()));
        purchaseOrder.setPrice(request.getPrice());

        List<String> options = new ArrayList<>();
        options.add("OPT1");
        options.add("OPT2");
        options.add("OPT3");

        purchaseOrder.setOptions(String.join(", ", options));

        // Generate pdf
        /*registrationRequest.generate(documentBuilder);
        transfertCertificate.generate(documentBuilder);
        purchaseOrder.generate(documentBuilder);*/

        RegistrationRequest savedRR =  documentRepository.save(registrationRequest);
        TransfertCertificate savedTC = documentRepository.save(transfertCertificate);
        PurchaseOrder savedPO = documentRepository.save(purchaseOrder);

        // Generate pdf
        savedRR.generate(documentBuilder);
        savedTC.generate(documentBuilder);
        savedPO.generate(documentBuilder);

        DocumentBundle documentBundle = DocumentBundle.getInstance();
        documentBundle.setRegistrationRequest(savedRR);
        documentBundle.setTransfertCertificate(savedTC);
        documentBundle.setPurchaseOrder(savedPO);

        return documentBundle;
    }

    public DocumentBundle createHtmlDocument(BundleRequest request) {

        IDocumentBuilder documentBuilder = new HtmlDocumentBuilder();

        return this.buildBundle(request, documentBuilder);
    }
    
    public DocumentBundle createPdfDocument(BundleRequest request) {

        IDocumentBuilder documentBuilder = new PdfDocumentBuilder();

        return this.buildBundle(request, documentBuilder);
    }

    public VehicleDocument getDocumentById(Long id) {
        return documentRepository.findById(id).orElse(null);
    }

    public void deleteDocument(Long id) {
        documentRepository.deleteById(id);
    }

    public List<VehicleDocument> getAllDocuments() {
        return documentRepository.findAll();
    }

    public List<VehicleDocument> getHtmlDocuments() {
        return documentRepository.findByDocumentFormat(DocumentFormat.HTML);
    }

    public List<VehicleDocument> getPdfDocuments() {
        return documentRepository.findByDocumentFormat(DocumentFormat.PDF);
    }

    public List<VehicleDocument> getRegistrationRequestsDocuments() {
        return documentRepository.findByDocumentType(DocumentType.REGISTRATION_REQUEST);
    }

    public List<VehicleDocument> getTransfertCertificatesDocuments() {
        return documentRepository.findByDocumentType(DocumentType.TRANSFER_CERTIFICATE);
    }

    public List<VehicleDocument> getPurchaseOrdersDocuments() {
        return documentRepository.findByDocumentType(DocumentType.PURCHASE_ORDER);
    }
}
