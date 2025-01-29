package com.inf4067.driver_cart.document.service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationListener;
import org.springframework.context.event.EventListener;
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
import com.inf4067.driver_cart.model.Vehicule;
import com.inf4067.driver_cart.observer.Observer;
import com.inf4067.driver_cart.observer.OrderCreatedEvent;
import com.inf4067.driver_cart.order.model.CartItem;
import com.inf4067.driver_cart.order.model.Order;
import com.inf4067.driver_cart.order.model.OrderItem;
import com.inf4067.driver_cart.repository.VehiculeRepository;
import com.inf4067.driver_cart.service.VehiculeService;
import com.inf4067.driver_cart.user.model.User;
import com.inf4067.driver_cart.user.service.UserService;

@Service
public class DocumentService implements ApplicationListener<OrderCreatedEvent>{
    
    @Autowired
    private VehicleDocumentRepository documentRepository;

    @Autowired
    private VehiculeService vehiculeService;

    @Autowired
    private UserService userService;
    
    private DocumentBundle buildBundle(BundleRequest request, IDocumentBuilder documentBuilder)
    {
        Vehicule vehicule = vehiculeService.getVehiculeById(request.getVehicleId());
        User user = userService.getUser(request.getBuyerId());

        // Set datas for RegistrationRequest
        RegistrationRequest registrationRequest = new RegistrationRequest();
        registrationRequest.setVehicle(vehicule);
        registrationRequest.setUser(user);

        // Set Datas for TransfertCertificate
        TransfertCertificate transfertCertificate = new TransfertCertificate();
        transfertCertificate.setVehicle(vehicule);
        transfertCertificate.setUser(user);
        transfertCertificate.setTransferDate(request.getTransfertDate());

        // Set Datas for purchase Order
        PurchaseOrder purchaseOrder = new PurchaseOrder();
        purchaseOrder.setVehicle(vehicule);
        purchaseOrder.setUser(user);


        RegistrationRequest savedRR =  documentRepository.save(registrationRequest);
        TransfertCertificate savedTC = documentRepository.save(transfertCertificate);
        PurchaseOrder savedPO = documentRepository.save(purchaseOrder);

        // Generate documents
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

    // Methodes a implementer
    /*@EventListener
    public void handleCustomEvent(OrderCreatedEvent event) {
        Order order = event.getOrder();
        DocumentFormat format = event.getFormat();

        BundleRequest request = new BundleRequest();
        request.setBuyerId(order.getUserId());
        request.setTransfertDate(order.getCreatedAt().toString());
        
        for (OrderItem orderItem : order.getItems()) {
            
            for(int i = 0; i < orderItem.getQuantity(); i++)
            {
                request.setVehicleId(orderItem.getVehicleId());

                if(format == DocumentFormat.PDF) createPdfDocument(request);
                else createHtmlDocument(request);
            }
        }
    }*/

    @Override
    public void onApplicationEvent(OrderCreatedEvent event) {
        Order order = event.getOrder();
        List<CartItem> cartItems = event.getCartItems();

        DocumentFormat format = event.getFormat();

        BundleRequest request = new BundleRequest();
        request.setBuyerId(order.getUserId());
        request.setTransfertDate(order.getCreatedAt().toLocalDate().toString());
        
        for (CartItem cartItem : cartItems) {
            
            for(int i = 0; i < cartItem.getQuantity(); i++)
            {
                request.setVehicleId(cartItem.getVehicleId());

                if(format == DocumentFormat.PDF) createPdfDocument(request);
                else createHtmlDocument(request);
            }
        }
    }
}
