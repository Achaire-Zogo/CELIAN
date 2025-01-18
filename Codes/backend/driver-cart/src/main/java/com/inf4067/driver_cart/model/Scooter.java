package com.inf4067.driver_cart.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Inheritance;
import jakarta.persistence.InheritanceType;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;


@Entity
@Table(name ="scooters")
@Inheritance(strategy = InheritanceType.JOINED)
@AllArgsConstructor
public class Scooter extends Vehicule {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    public Scooter(){
        this.setType(VehicleType.SCOOTER);

    }
}
