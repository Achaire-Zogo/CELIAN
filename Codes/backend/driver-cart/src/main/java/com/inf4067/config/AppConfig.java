package com.inf4067.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import com.inf4067.driver_cart.factory.ElectricVehiculeFactory;
import com.inf4067.driver_cart.factory.PetrolVehiculeFactory;
import com.inf4067.driver_cart.factory.VehiculeFactory;

@Configuration
public class AppConfig {
    

    @Bean
    public VehiculeFactory electricVehiculeFactory() {
        return new ElectricVehiculeFactory();
    }

    @Bean
    public VehiculeFactory petrolVehiculeFactory() {
        return new PetrolVehiculeFactory();
    }
}
