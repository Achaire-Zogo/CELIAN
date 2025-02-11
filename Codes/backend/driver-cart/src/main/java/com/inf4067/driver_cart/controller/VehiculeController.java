package com.inf4067.driver_cart.controller;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.inf4067.driver_cart.model.*;
import com.inf4067.driver_cart.service.VehiculeService;


@RestController
@RequestMapping("/api/vehicules")
public class VehiculeController {

    @Autowired
    private VehiculeService vehiculeService;

    @GetMapping
    public ResponseEntity<List<Vehicule>> getVehicules() {
        return ResponseEntity.ok(vehiculeService.getVehicules());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Vehicule> getVehiculeById(@PathVariable Long id) {
        return ResponseEntity.ok(vehiculeService.getVehiculeById(id));
    }

    @PostMapping("/{id}")
    public ResponseEntity<Boolean> addOption(@PathVariable Long id, @RequestBody String option) {
        return ResponseEntity.ok(vehiculeService.getVehiculeById(id).addOption(option));
    }

    @GetMapping("/search")
    public List<Vehicule> searchVehicules(
            @RequestParam(required = false) String model,
            @RequestParam(required = false) String marque,
            @RequestParam(required = false) VehicleType type,
            @RequestParam(required = false) Double minPrice,
            @RequestParam(required = false) Double maxPrice,
            @RequestParam(required = false) Double price

    ) {
        return vehiculeService.searchVehicules(model, marque, type, minPrice, maxPrice, price);
    }

    @PostMapping("/{id}/addOption")
    public ResponseEntity<Boolean> removeOption(@PathVariable Long id, @RequestBody String option) {
        return ResponseEntity.ok(vehiculeService.getVehiculeById(id).removeOption(option));
    }

    @PostMapping("/electric/car")
    public ResponseEntity<ElectricCar> saveElectricCar(@RequestBody ElectricCar vehicule) {
        return ResponseEntity.ok((ElectricCar) vehiculeService.saveElectricCar(vehicule));
    }

    @PostMapping("/petrol/car")
    public ResponseEntity<Car> savePetrolCar(@RequestBody PetrolCar vehicule) {
        return ResponseEntity.ok((PetrolCar) vehiculeService.savePetrolCar(vehicule));
    }

    @PostMapping("/electric/scooter")
    public ResponseEntity<Scooter> saveElectricScooter(@RequestBody ElectricScooter vehicule) {
        return ResponseEntity.ok(vehiculeService.saveElectricScooter(vehicule));
    }

    @PostMapping("/petrol/scooter")
    public ResponseEntity<Scooter> savePetrolScooter(@RequestBody PetrolScooter vehicule) {
        return ResponseEntity.ok(vehiculeService.savePetrolScooter(vehicule));
    }

    @PostMapping("/flotte")
    public ResponseEntity<Flotte> saveFlotte(@RequestBody Flotte vehicule) {
        return ResponseEntity.ok(vehiculeService.saveFlotte(vehicule));
    }

    @GetMapping("/flotte")
    public ResponseEntity<List<Flotte>> getFlottes() {
        return ResponseEntity.ok(vehiculeService.getFlottes());
    }

    @GetMapping("/flotte/{id}")
    public ResponseEntity<Flotte> getFlotteById(@PathVariable Long id) {
        return ResponseEntity.ok(vehiculeService.getFlotteById(id));
    }
    
    

    @PutMapping("/{id}")
    public ResponseEntity<Vehicule> updateVehicule(@PathVariable Long id, @RequestBody Vehicule vehicule) {
        vehicule.setId(id);
        return ResponseEntity.ok(vehiculeService.saveVehicule(vehicule));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteVehicule(@PathVariable Long id) {
        vehiculeService.deleteVehicule(id);
        return ResponseEntity.noContent().build();
    }
}
