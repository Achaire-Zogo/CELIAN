package com.inf4067.driver_cart.country.repository;

import com.inf4067.driver_cart.country.model.Country;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CountryRepository extends JpaRepository<Country, Long> {
    // Additional query methods can be defined here if needed
}