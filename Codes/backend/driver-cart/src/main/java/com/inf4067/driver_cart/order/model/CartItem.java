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

    @ManyToOne
    @JoinColumn(name = "cart_id")
    private Cart cart;

    private Long vehicleId; // ID du véhicule

    private int quantity; // Quantité du véhicule

    @Transient // This field won't be persisted in database
    private Vehicule vehicle; // Complete vehicle information
    
    // Getters and setters
}