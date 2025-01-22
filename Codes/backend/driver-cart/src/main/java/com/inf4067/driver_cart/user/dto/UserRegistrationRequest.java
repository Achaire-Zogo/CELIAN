package com.inf4067.driver_cart.user.dto;

import com.inf4067.driver_cart.user.model.ClientType;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class UserRegistrationRequest {
    @NotBlank
    @Email
    private String email;

    @NotBlank
    private String password;

    @NotBlank
    private String name;

    @NotNull
    private ClientType clientType;

    // Pour les clients moraux (entreprises)
    private String companyName;
    private String registrationNumber;
    
    // Pour les clients physiques
    private String firstName;
    private String lastName;
    private String phoneNumber;
}
