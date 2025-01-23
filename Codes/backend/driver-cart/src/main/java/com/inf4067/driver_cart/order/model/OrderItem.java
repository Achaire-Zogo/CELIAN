package com.inf4067.driver_cart.order.model;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Table(name = "order_items")
@Data
public class OrderItem {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "order_id")
    private Order order;

    private Long vehicleId; // ID du véhicule

    private int quantity; // Quantité du véhicule

    // Getters and setters
}
