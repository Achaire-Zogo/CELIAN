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
    
    @Autowired
    private VehiculeFactory electricVehiculeFactory = new ElectricVehiculeFactory();;

    @Autowired
    private VehiculeFactory petrolVehiculeFactory = new PetrolVehiculeFactory();;



   

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
        Scooter scooter = petrolVehiculeFactory.getScooter();
        scooter = vehicule;

        return scooterRepository.save(scooter);


    }

    public Scooter saveElectricScooter(ElectricScooter vehicule) {
        // TODO Auto-generated method stub
        Scooter scooter = electricVehiculeFactory.getScooter();
        scooter = vehicule;

        return scooterRepository.save(scooter);
    }

    public Car savePetrolCar(PetrolCar vehicule) {
        // TODO Auto-generated method stub
        Car car = petrolVehiculeFactory.getCar();
        car = vehicule;

        return carRepository.save(car);

    }

    public Flotte saveFlotte(Flotte flotte) {
        return flotteRepository.save(flotte);
    }

    public void deleteFlotteById(Long id) {
        flotteRepository.deleteById(id);
    }

   

    public List<Flotte> getFlottes() {
        return flotteRepository.findAll();
    }

    public Car saveElectricCar(ElectricCar vehicule) {
        // TODO Auto-generated method stub
        Car car = electricVehiculeFactory.getCar();
        car = vehicule;

        return carRepository.save(car);
    }

    public Flotte getFlotteById(Long id) {
        // TODO Auto-generated method stub
        return flotteRepository.findById(id).orElse(null);}

    

}
