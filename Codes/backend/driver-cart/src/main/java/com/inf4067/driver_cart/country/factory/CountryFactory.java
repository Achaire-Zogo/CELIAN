package com.inf4067.driver_cart.country.factory;

import com.inf4067.driver_cart.country.model.Country;

public interface CountryFactory {
    Country createCountry(String name, double taxRate);
}