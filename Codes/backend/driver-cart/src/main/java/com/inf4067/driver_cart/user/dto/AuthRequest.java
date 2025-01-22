package com.inf4067.driver_cart.user.dto;

import lombok.Data;

@Data
public class AuthRequest {
    private String email;
    private String password;
}
