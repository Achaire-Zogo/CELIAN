package com.inf4067.driver_cart.factory;

import com.inf4067.driver_cart.model.Car;
import com.inf4067.driver_cart.model.Scooter;

public interface VehiculeFactory {
    
    Car getCar(String model, double price);
    Car getCar();
    Scooter getScooter(String model, double price);
    Scooter getScooter();
}
