package com.inf4067.driver_cart.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.inf4067.driver_cart.model.*;

@Repository
public interface CarRepository extends JpaRepository<Car, Long> {
    List<Car> findByType(VehicleType type);
    List<Car> findByOptionsContaining(String option);
}
