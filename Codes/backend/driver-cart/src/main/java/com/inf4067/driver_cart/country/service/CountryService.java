package com.inf4067.driver_cart.country.service;

import com.inf4067.driver_cart.country.model.Country;
import com.inf4067.driver_cart.country.repository.CountryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.context.event.ApplicationReadyEvent;
import org.springframework.context.event.EventListener;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class CountryService {

    @Autowired
    private CountryRepository countryRepository;

    

    public List<Country> getAllCountries() {
        return countryRepository.findAll();
    }

    public Optional<Country> getCountryById(Long id) {
        return countryRepository.findById(id);
    }

    public Country saveCountry(Country country) {
        return countryRepository.save(country);
    }

    // Additional methods for updating and deleting countries can be added here
}