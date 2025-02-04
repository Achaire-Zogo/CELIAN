package com.inf4067.driver_cart.document.model;

import java.text.DecimalFormat;
import java.text.DecimalFormatSymbols;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Collections;
import java.util.Date;
import java.util.List;
import java.util.Locale;
import java.util.Set;

import com.inf4067.driver_cart.document.adapter.IDocumentFormat;
import com.inf4067.driver_cart.document.builder.IDocumentBuilder;
import com.inf4067.driver_cart.document.enumeration.DocumentType;
import com.inf4067.driver_cart.model.Vehicule;
import com.inf4067.driver_cart.user.model.User;

import jakarta.persistence.Entity;
import jakarta.persistence.ManyToMany;
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

    @ManyToMany
    private List<Vehicule> vehicles = new ArrayList<>();

    @ManyToOne
    private User user; // buyer

    private double orderTotal;

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

    private String formatPrice(double price) {
        DecimalFormatSymbols symbols = new DecimalFormatSymbols(Locale.getDefault());
        symbols.setGroupingSeparator(' ');

        DecimalFormat decimalFormat = new DecimalFormat("#,###.0", symbols);
        return decimalFormat.format(price);
    }

    private String formatOptions(Set<String> options) {
        if (options == null || options.isEmpty()) {
            return "        Aucune option";
        }
        return "        • " + String.join("\n        • ", options);
    }

    @Override
    protected String getFormattedContent() {
        long timestamp = System.currentTimeMillis();
        SimpleDateFormat sdf = new SimpleDateFormat("dd/MM/yyyy");
        String dateFormatted = sdf.format(new Date(timestamp));
    
        // Formatage du contenu des véhicules
        StringBuilder vehicleContent = new StringBuilder();
        for (Vehicule vehicle : this.getVehicles()) {
            vehicleContent.append(String.format("""
                    --------------------------------------------
                    Véhicule : %s %s
                    Type     : %s
                    Prix     : %s FCFA
                    Options  :
                    %s
                    """,
                    vehicle.getMarque(),
                    vehicle.getModel(),
                    vehicle.getType(),
                    formatPrice(vehicle.getPrice()),
                    formatOptions(vehicle.getOptions()) // Formate les options
            ));
        }
    
        // Formatage du contenu global
        return String.format("""
                ============================================
                                COMMANDE N°000%s
                                DATE : %s
                ============================================
    
                ## CLIENT
    
                Nom   : %s
                Email : %s
    
                ## VÉHICULES
    
                %s
                ============================================
                            TOTAL : %s FCFA
                ============================================
                """,
                getId(),
                dateFormatted,
                getUser().getName(),
                getUser().getEmail(),
                vehicleContent.toString(),
                formatPrice(getOrderTotal())
        );
    }
    

    public List<Vehicule> getVehicles() {
        return Collections.unmodifiableList(vehicles);
    }

    public void setVehicles(List<Vehicule> vehicles) {
        this.vehicles = new ArrayList<>(vehicles);
    }
}
