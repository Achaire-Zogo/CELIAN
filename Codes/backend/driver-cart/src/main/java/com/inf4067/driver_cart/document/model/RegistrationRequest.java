package com.inf4067.driver_cart.document.model;

import java.text.SimpleDateFormat;
import java.util.Date;

import com.inf4067.driver_cart.document.adapter.IDocumentFormat;
import com.inf4067.driver_cart.document.builder.IDocumentBuilder;
import com.inf4067.driver_cart.document.enumeration.DocumentType;
import com.inf4067.driver_cart.model.Vehicule;
import com.inf4067.driver_cart.user.model.User;

import jakarta.persistence.Entity;
import jakarta.persistence.ManyToOne;
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

    @ManyToOne
    private Vehicule vehicle;

    @ManyToOne
    private User user; // buyer

    @Override
    public void generate(IDocumentBuilder documentBuilder) {

        long timestamp = System.currentTimeMillis();
        try {
            Thread.sleep(1); // Sleep for 1 millisecond to ensure unique timestamp
        } catch (InterruptedException e) {
            Thread.currentThread().interrupt();
        }
        SimpleDateFormat sdf = new SimpleDateFormat("yyyy_MM_dd_HHmmssSSS");
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
        String moreUserInf = """
                
                """;
        return String.format("""
                    DEMANDE D'IMMATRICULATION
                    
                    # VEHICULE

                    Nom : %s %s
                    Type : %s
                    Prix : %s FCFA

                    # PROPRIETAIRE

                    Nom : %s
                    email : %s
                    """, this.getVehicle().getMarque(),
                        this.getVehicle().getModel(),
                        this.getVehicle().getType().toString(),
                        this.getVehicle().getPrice(),
                        this.getUser().getName(),
                        this.getUser().getEmail());
    }
}
