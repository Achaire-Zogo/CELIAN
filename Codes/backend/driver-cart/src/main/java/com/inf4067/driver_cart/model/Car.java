package com.inf4067.driver_cart.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Inheritance;
import jakarta.persistence.InheritanceType;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;


@Entity
@Table(name ="cars")
@Inheritance(strategy = InheritanceType.JOINED)
@AllArgsConstructor
public class Car extends Vehicule {
   @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    public Car(){
        this.setType(VehicleType.CAR);
    }

    
    
}
