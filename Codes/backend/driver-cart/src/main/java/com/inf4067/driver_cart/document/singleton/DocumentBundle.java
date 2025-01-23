package com.inf4067.driver_cart.document.singleton;
import org.springframework.stereotype.Component;

import com.inf4067.driver_cart.document.model.PurchaseOrder;
import com.inf4067.driver_cart.document.model.RegistrationRequest;
import com.inf4067.driver_cart.document.model.TransfertCertificate;

import lombok.Data;

@Component
@Data
public class DocumentBundle {
    public static DocumentBundle instance = null;

    private RegistrationRequest registrationRequest;
    private TransfertCertificate transfertCertificate;
    private PurchaseOrder purchaseOrder;

    private DocumentBundle () {}

    /*private DocumentBundle(RegistrationRequest registrationRequest,
    TransfertCertificate transfertCertificate,
    PurchaseOrder purchaseOrder)
    {
        this.registrationRequest = registrationRequest;
        this.transfertCertificate = transfertCertificate;
        this.purchaseOrder = purchaseOrder;
    }*/

    public static DocumentBundle getInstance()
    {
        if(instance == null)
        {
            instance = new DocumentBundle();
        }
        return instance;
    }

    /*public static DocumentBundle getInstance(RegistrationRequest registrationRequest, TransfertCertificate transfertCertificate, PurchaseOrder purchaseOrder)
    {
        if(instance == null)
        {
            instance = new DocumentBundle(registrationRequest, transfertCertificate, purchaseOrder);
        }
        return instance;
    }*/
}
