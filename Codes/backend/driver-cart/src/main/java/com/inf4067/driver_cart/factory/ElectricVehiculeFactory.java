package com.inf4067.driver_cart.factory;

import org.springframework.stereotype.Component;

import com.inf4067.driver_cart.model.*;

@Component
public class ElectricVehiculeFactory implements VehiculeFactory {

    @Override
    public Car getCar(String model, double price) {
        ElectricCar electricCar = new ElectricCar();
        electricCar.setModel(model);
        electricCar.setPrice(price);
        electricCar.setBatteryCapacity(75); // kWh
        electricCar.setRange(400); 

        return electricCar;
    }

    @Override
    public Scooter getScooter(String model, double price) {
        ElectricScooter electricScooter = new ElectricScooter();
        electricScooter.setModel(model);
        electricScooter.setPrice(price);
        electricScooter.setBatteryCapacity(30); // kWh
       
        return electricScooter;
    }

    @Override
    public Car getCar() {
        ElectricCar electricCar = new ElectricCar();
       

        return electricCar;
    }

    @Override
    public Scooter getScooter() {
       return new ElectricScooter();
    }
}
