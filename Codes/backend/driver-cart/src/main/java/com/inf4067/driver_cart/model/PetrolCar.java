package com.inf4067.driver_cart.model;

import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name ="petrol_cars")
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class PetrolCar extends Car {
  
     @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

   
    private int engineSize;

    @Enumerated(EnumType.STRING)
    private FuelType fuelType;


}
