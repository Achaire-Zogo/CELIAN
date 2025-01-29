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
public class PurchaseOrder extends VehicleDocument {

    @ManyToOne
    private Vehicule vehicle;

    @ManyToOne
    private User user; // buyer

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

        long timestamp = System.currentTimeMillis();
        SimpleDateFormat sdf = new SimpleDateFormat("dd/MM/yyyy");
        String dateFormatted = sdf.format(new Date(timestamp));

        return String.format("""
            COMMANDE N°000%s DU %s

            # CLIENT

            Nom : %s
            Email : %s

            # VEHICULE
            
            Nom : %s %s
            Type : %s
            Prix : %s FCFA
            Options: 
                - %s
            """, getId(),
            dateFormatted,
            getUser().getName(),
            getUser().getEmail(),
            
            getVehicle().getMarque(),
            getVehicle().getModel(),
            getVehicle().getType(),
            getVehicle().getPrice(),
            String.join(
                "\n\t-", getVehicle().getOptions()));
            //String.join(", ", getOptions()));
    }

}
