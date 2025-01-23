package com.inf4067.driver_cart.order.model;

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

    // Getters and setters
}