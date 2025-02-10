package com.inf4067.driver_cart.document.model;

import java.text.DecimalFormat;
import java.text.DecimalFormatSymbols;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.Locale;

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
public class TransfertCertificate extends VehicleDocument {
    
    @ManyToOne
    private Vehicule vehicle;

    @ManyToOne
    private User user; // buyer

    private String transferDate;

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

    private String formatPrice(double price) {
        DecimalFormatSymbols symbols = new DecimalFormatSymbols(Locale.getDefault());
        symbols.setGroupingSeparator(' ');

        DecimalFormat decimalFormat = new DecimalFormat("#,###.0", symbols);
        return decimalFormat.format(price);
    }


    @Override
    protected String getFormattedContent() {    
        return String.format("""
                ============================================
                            CERTIFICAT DE CESSION
                ============================================
    
                ## VÉHICULE
    
                Marque : %s
                Modèle : %s
                Type   : %s
                Prix   : %s FCFA
    
                --------------------------------------------
                
                ## VENDEUR

                Nom : CELIAN CORP
                
                --------------------------------------------
    
                ## ACHETEUR
    
                Nom    : %s
                Email  : %s
    
                ============================================
                DATE DE CESSION : %s
                ============================================
                """,
                getVehicle().getMarque(),
            getVehicle().getModel(),
            getVehicle().getType(),
            formatPrice(getVehicle().getPrice()),
            getUser().getName(),
            getUser().getEmail(),
            getTransferDate()
        );
    }
}
