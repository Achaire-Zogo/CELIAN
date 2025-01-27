package com.inf4067.driver_cart.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.inf4067.driver_cart.factory.*;
import com.inf4067.driver_cart.model.*;
import com.inf4067.driver_cart.repository.*;

@Service
public class VehiculeService {

    @Autowired
    private VehiculeRepository vehiculeRepository;

    @Autowired
    private FlotteRepository flotteRepository;

    @Autowired
    private CarRepository carRepository;

    @Autowired
    private ScooterRepository scooterRepository;

    
    private VehiculeFactory electricFactory = new ElectricVehiculeFactory();;

   
    private VehiculeFactory petrolFactory = new PetrolVehiculeFactory();;



   

    public List<Vehicule> getVehicules() {
        return vehiculeRepository.findAll();
    }

    public Vehicule getVehiculeById(Long id) {
        return vehiculeRepository.findById(id).orElse(null);
    }

    public Vehicule saveVehicule(Vehicule vehicule) {
        return vehiculeRepository.save(vehicule);
    }

    public void deleteVehicule(Long id) {
        vehiculeRepository.deleteById(id);
    }

    public Scooter savePetrolScooter(PetrolScooter vehicule) {
        // TODO Auto-generated method stub
       
        Scooter scooter = petrolFactory.getScooter();
        scooter.setMarque(vehicule.marque);
        scooter.setModel(vehicule.model);
        scooter.setOptions(vehicule.options);
        scooter.setPrice(vehicule.price);
        scooter.setType(VehicleType.FUEL_SCOOTER);
        scooter.setUri(vehicule.uri);
        ((PetrolScooter) scooter).setFuelType(vehicule.fuelType);
        ((PetrolScooter) scooter).setEngineSize(vehicule.engineSize);

        return scooterRepository.save(scooter);


    }

    public Scooter saveElectricScooter(ElectricScooter vehicule) {
        Scooter scooter = electricFactory.getScooter();
        scooter.setMarque(vehicule.marque);
        scooter.setModel(vehicule.model);
        scooter.setOptions(vehicule.options);
        scooter.setPrice(vehicule.price);
        scooter.setType(VehicleType.ELECTRIC_SCOOTER);
        scooter.setUri(vehicule.uri);
        ((ElectricScooter) scooter).setBatteryCapacity(vehicule.batteryCapacity);

        return scooterRepository.save(scooter);
    }

    public Car savePetrolCar(PetrolCar vehicule) {
        
        Car car = petrolFactory.getCar(vehicule.model,vehicule.price);
        
        car.setMarque(vehicule.marque);
        car.setOptions(vehicule.options);
        car.setUri(vehicule.uri);
        ((PetrolCar) car).setEngineSize(vehicule.engineSize);
        ((PetrolCar) car).setFuelType(vehicule.fuelType);

        return carRepository.save(vehicule);

    }

    public Flotte saveFlotte(Flotte flotte) {
        flotte.setType(VehicleType.FLEET);
        return flotteRepository.save(flotte);
    }

    

    public void deleteFlotteById(Long id) {
        flotteRepository.deleteById(id);
    }

   

    public List<Flotte> getFlottes() {
        return flotteRepository.findAll();
    }

    public Car saveElectricCar(ElectricCar vehicule) {
        Car car = electricFactory.getCar(vehicule.model,vehicule.price);
        
        car.setMarque(vehicule.marque);
        car.setOptions(vehicule.options);
        car.setUri(vehicule.uri);
        car.setType(VehicleType.ELECTRIC_CAR);
        System.out.print("ok create car");
        ((ElectricCar) car).setBatteryCapacity(vehicule.batteryCapacity);
        ((ElectricCar) car).setDrivingRange(vehicule.drivingRange);

        return carRepository.save(vehicule);
    }

    public Flotte getFlotteById(Long id) {
        // TODO Auto-generated method stub
        return flotteRepository.findById(id).orElse(null);}

    

}
