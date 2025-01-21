package com.inf4067.driver_cart.document.model;

import java.text.SimpleDateFormat;
import java.util.Date;

import com.inf4067.driver_cart.document.adapter.IDocumentFormat;
import com.inf4067.driver_cart.document.builder.IDocumentBuilder;
import com.inf4067.driver_cart.document.enumeration.DocumentType;

import jakarta.persistence.Entity;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@EqualsAndHashCode(callSuper = false)
public class PurchaseOrder extends VehicleDocument {
    //private String orderId;
    private String customerInfo;
    private String vehicleDetails;
    private String price;
    //private List<String> options;
    private String options;

    @Override
    public void generate(IDocumentBuilder documentBuilder) {

        long timestamp = System.currentTimeMillis();
        SimpleDateFormat sdf = new SimpleDateFormat("yyyy_MM_dd_HHmmss");
        String dateFormatted = sdf.format(new Date(timestamp));

        documentBuilder.setName(dateFormatted + "_bon_commande");
        documentBuilder.setHeader("");
        documentBuilder.setTitle("BON DE COMMANDE");
        documentBuilder.setContent(this.getFormattedContent());
        
        IDocumentFormat document = documentBuilder.getDocument();

        document.generatedDocument();

        this.setFilepath(document.getFilePath());
        this.setDocumentFormat(document.getFormat());
        this.setDocumentType(DocumentType.PURCHASE_ORDER);
    }

    @Override
    protected String getFormattedContent() {
        return String.format("""
            BON DE COMMANDE N°%s

            Client: %s
            Véhicule: %s
            Prix: %s
            Options: %s
            """, getId(), getCustomerInfo(), getVehicleDetails(), getPrice(), getOptions());
            //String.join(", ", getOptions()));
    }

}
