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
public class TransfertCertificate extends VehicleDocument {
    private String vehicleId;
    private String sellerInfo;
    private String buyerInfo;
    private String transferDate;

    @Override
    public void generate(IDocumentBuilder documentBuilder) {

        long timestamp = System.currentTimeMillis();
        SimpleDateFormat sdf = new SimpleDateFormat("yyyy_MM_dd_HHmmss");
        String dateFormatted = sdf.format(new Date(timestamp));

        documentBuilder.setName(dateFormatted + "_certificat_cession");
        documentBuilder.setHeader("");
        documentBuilder.setTitle("CERTIFICAT DE CESSION");
        documentBuilder.setContent(this.getFormattedContent());
        
        IDocumentFormat document = documentBuilder.getDocument();

        document.generatedDocument();

        this.setFilepath(document.getFilePath());
        this.setDocumentFormat(document.getFormat());
        this.setDocumentType(DocumentType.TRANSFER_CERTIFICATE);
    }

    @Override
    protected String getFormattedContent() {
        return String.format("""
            CERTIFICAT DE CESSION
            
            Véhicule ID: %s
            Vendeur: %s
            Acheteur: %s
            Date de cession: %s
            """, getVehicleId(), getSellerInfo(), getBuyerInfo(), getTransferDate());
    }
}
