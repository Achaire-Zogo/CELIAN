package com.inf4067.driver_cart.document.service;

import java.util.ArrayList;
import java.util.List;

import javax.xml.parsers.DocumentBuilder;

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
import com.inf4067.driver_cart.model.Flotte;
import com.inf4067.driver_cart.model.VehicleType;
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
    
    // generated registrations requests
    private RegistrationRequest generateRegistrationRequest(BundleRequest request, Vehicule vehicule, User user, IDocumentBuilder documentBuilder)
    {
        // Set datas for RegistrationRequest
        RegistrationRequest registrationRequest = new RegistrationRequest();
        registrationRequest.setVehicle(vehicule);
        registrationRequest.setUser(user);

        registrationRequest.setOrderId(request.getOrderId());

        // Save in database
        RegistrationRequest savedRR =  documentRepository.save(registrationRequest);

        // Generate
        savedRR.generate(documentBuilder);

        return savedRR;
    }
    
    // Generated transferts certificates
    private TransfertCertificate generateTransfertCertificate(BundleRequest request, Vehicule vehicule, User user, IDocumentBuilder documentBuilder)
    {
        // Set Datas for TransfertCertificate
        TransfertCertificate transfertCertificate = new TransfertCertificate();
        transfertCertificate.setVehicle(vehicule);
        transfertCertificate.setUser(user);
        transfertCertificate.setTransferDate(request.getTransfertDate());

        transfertCertificate.setOrderId(request.getOrderId());

        // Save in database
        TransfertCertificate savedTC = documentRepository.save(transfertCertificate);

        // Generate
        savedTC.generate(documentBuilder);

        return savedTC;
    }

    // Generated purchase Orders
    private PurchaseOrder generatePurchaseOrder(BundleRequest request, List<Vehicule> vehicules, User user, IDocumentBuilder documentBuilder)
    {

        // Set Datas for purchase Order
        PurchaseOrder purchaseOrder = new PurchaseOrder();
        //purchaseOrder.setVehicle(vehicule);
        purchaseOrder.setVehicles(vehicules);
        purchaseOrder.setUser(user);

        purchaseOrder.setOrderId(request.getOrderId());
        purchaseOrder.setOrderTotal(request.getOrderTotal());
        
        
        // Save in database
        PurchaseOrder savedPO = documentRepository.save(purchaseOrder);

        // Generate
        savedPO.generate(documentBuilder);

        return savedPO;
    }

    private DocumentBundle buildBundle(BundleRequest request, IDocumentBuilder documentBuilder)
    {
        Vehicule vehicule = vehiculeService.getVehiculeById(request.getVehicleId());
        User user = userService.getUser(request.getBuyerId());

        // Get saved Registration Request
        RegistrationRequest generatedRR = this.generateRegistrationRequest(request, vehicule, user, documentBuilder);
        
        // Get saved Transfert Certificate
        TransfertCertificate generatedTC = this.generateTransfertCertificate(request, vehicule, user, documentBuilder);
        
        // Vehicles list for purchase order
        List<Vehicule> vehiculesList = new ArrayList<>();
        vehiculesList.add(vehicule);

        // Get saved purchase Order
        PurchaseOrder generatedPO = this.generatePurchaseOrder(request, vehiculesList, user, documentBuilder);
        
        DocumentBundle documentBundle = DocumentBundle.getInstance();
        documentBundle.setRegistrationRequest(generatedRR);
        documentBundle.setTransfertCertificate(generatedTC);
        documentBundle.setPurchaseOrder(generatedPO);

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

    public List<VehicleDocument> getDocumentsByOrder(long orderId) {
        return documentRepository.findByOrderId(orderId);
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

    @Override
    public void onApplicationEvent(OrderCreatedEvent event) {
        Order order = event.getOrder();
        List<CartItem> cartItems = event.getCartItems();

        DocumentFormat format = event.getFormat();

        BundleRequest request = new BundleRequest();
        
        request.setOrderId(order.getId());
        request.setBuyerId(order.getUserId());
        request.setTransfertDate(order.getCreatedAt().toLocalDate().toString());
        request.setOrderTotal(order.getTotal());
        
        for (CartItem cartItem : cartItems) {
            
            if(cartItem.getVehicle().getType() != VehicleType.FLEET)
            {
                for(int i = 0; i < cartItem.getQuantity(); i++)
                {
                    request.setVehicleId(cartItem.getVehicleId());
    
                    if(format == DocumentFormat.PDF) createPdfDocument(request);
                    else createHtmlDocument(request);
                }
            }
            else {
                Flotte fleet = (Flotte) cartItem.getVehicle();
                List<Vehicule> fleetVehicles = fleet.getVehicules();

                User user = userService.getUser(order.getUserId());

                IDocumentBuilder documentBuilder = format == DocumentFormat.PDF ? new PdfDocumentBuilder() : new HtmlDocumentBuilder();

                for (Vehicule fleetVehicle : fleetVehicles) {
                    
                    this.generateRegistrationRequest(request, fleetVehicle, user, documentBuilder);
                    this.generateTransfertCertificate(request, fleetVehicle, user, documentBuilder);
                }

                this.generatePurchaseOrder(request, fleetVehicles, user, documentBuilder);
            }
        }
    }
}
