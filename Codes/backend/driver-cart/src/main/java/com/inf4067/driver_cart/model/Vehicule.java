package com.inf4067.driver_cart.model;

import jakarta.persistence.ElementCollection;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Inheritance;
import jakarta.persistence.InheritanceType;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.util.HashSet;
import java.util.Set;

import com.fasterxml.jackson.annotation.JsonSubTypes;
import com.fasterxml.jackson.annotation.JsonTypeInfo;

@Entity
@Table(name ="vehicles")
@Inheritance(strategy = InheritanceType.JOINED)
@JsonTypeInfo(use = JsonTypeInfo.Id.NAME, property = "type")
@JsonSubTypes({
    @JsonSubTypes.Type(value = ElectricCar.class, name = "ELECTRIC_CAR"),
    @JsonSubTypes.Type(value = PetrolCar.class, name = "FUEL_CAR"),
    @JsonSubTypes.Type(value = ElectricScooter.class, name = "ELECTRIC_SCOOTER"),
    @JsonSubTypes.Type(value = PetrolScooter.class, name = "FUEL_SCOOTER"),
    @JsonSubTypes.Type(value = Flotte.class, name = "FLEET")

})
@Data
@AllArgsConstructor
@NoArgsConstructor
public abstract class Vehicule {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    public String marque;
    public String model;
    public double price;
    public String uri;

    @ElementCollection
    public Set<String> options = new HashSet<>();

    @Enumerated(EnumType.STRING)
    public VehicleType type;

    public boolean addOption(String option) {
        return options.add(option);
    }

    public boolean removeOption(String option) {
        return options.remove(option);
    }

    public void setMarque(String marque) {
        this.marque = marque;
    }

    public void setModel(String model) {
        this.model = model;
    }

    public void setPrice(double price) {
        this.price = price;
    }

}
