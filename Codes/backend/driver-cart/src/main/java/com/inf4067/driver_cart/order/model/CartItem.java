package com.inf4067.driver_cart.order.model;

import com.inf4067.driver_cart.model.Vehicule;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Table(name = "cart_items")
@Data
public class CartItem {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Long userId; // ID de l'utilisateur

    private Long vehicleId; // ID du véhicule

    private int quantity; // Quantité du véhicule

    @Enumerated(EnumType.STRING)
    private CartStatus status;

    
    @Column(nullable = true)
    private Long orderId; // ID de la commande (NULL si pas encore converti en commande)


    @Transient // This field won't be persisted in database
    private Vehicule vehicle; // Complete vehicle information
    
    // Getters and setters
}