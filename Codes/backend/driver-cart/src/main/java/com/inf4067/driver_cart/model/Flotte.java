package com.inf4067.driver_cart.model;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Inheritance;
import jakarta.persistence.InheritanceType;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name ="flottes")
@Inheritance(strategy = InheritanceType.JOINED)
@AllArgsConstructor
@Getter
@Setter
public class Flotte extends Vehicule {
   public Flotte() {
      this.setType(VehicleType.FLEET);
    }

@Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Enumerated(EnumType.STRING)
    public FlotteType flotteType;
    
    @OneToMany(cascade = CascadeType.ALL, orphanRemoval = true)
    protected List<Vehicule> vehicules = new ArrayList<>();

    
    public Flotte addVehicle(Vehicule vehicule) {
        vehicules.add(vehicule);
        return this;
    }

        @Override
        public double getPrice(){
            return vehicules.stream().mapToDouble(Vehicule::getPrice).sum();
        }
   
}
