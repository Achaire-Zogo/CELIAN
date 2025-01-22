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
public class RegistrationRequest extends VehicleDocument{

    private String vehicleId;
    private String ownerInfo; // buyer
    private String vehicleDetails;

    @Override
    public void generate(IDocumentBuilder documentBuilder) {

        long timestamp = System.currentTimeMillis();
        SimpleDateFormat sdf = new SimpleDateFormat("yyyy_MM_dd_HHmmss");
        String dateFormatted = sdf.format(new Date(timestamp));

        documentBuilder.setName(dateFormatted + "_demande_immatriculation");
        documentBuilder.setHeader("");
        documentBuilder.setTitle("DEMANDE D'IMMATRICULATION");
        documentBuilder.setContent(this.getFormattedContent());
        
        IDocumentFormat document = documentBuilder.getDocument();

        document.generatedDocument();

        this.setFilepath(document.getFilePath());
        this.setDocumentFormat(document.getFormat());
        this.setDocumentType(DocumentType.REGISTRATION_REQUEST);
    }

    @Override
    protected String getFormattedContent() {
        return String.format("""
                    DEMANDE D'IMMATRICULATION
                    
                    Véhicule ID: %s
                    Propriétaire: %s
                    Détails du véhicule: %s
                    """, this.getVehicleId(), getOwnerInfo(), getVehicleDetails());
    }
}
