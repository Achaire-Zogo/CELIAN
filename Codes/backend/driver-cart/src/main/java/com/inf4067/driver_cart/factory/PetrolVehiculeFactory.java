package com.inf4067.driver_cart.factory;

import org.springframework.stereotype.Component;

import com.inf4067.driver_cart.model.*;


@Component
public class PetrolVehiculeFactory implements VehiculeFactory {

    @Override
    public Car getCar(String model, double price) {
        PetrolCar petrolCar = new PetrolCar();
        petrolCar.setModel(model);
        petrolCar.setPrice(price);
        petrolCar.setType(VehicleType.CAR);
        petrolCar.setEngineSize(2000); // cc
        petrolCar.setFuelType(FuelType.GASOLINE);

        return petrolCar;
    }

    @Override
    public Scooter getScooter(String model, double price) {
        PetrolScooter scooter = new PetrolScooter();
        
        scooter.setEngineSize(125); // cc
        scooter.setFuelType(FuelType.GASOLINE);
        
        return scooter;
    }

    @Override
    public Car getCar() {
       return new PetrolCar();
    }

    @Override
    public Scooter getScooter() {
       return new PetrolScooter();
    }
    
}
