package com.inf4067.driver_cart.user.dto;

import com.inf4067.driver_cart.user.model.User;
import lombok.Data;

@Data
public class AuthResponse {
    private String token;
    private User user;
    
    public AuthResponse(String token, User user) {
        this.token = token;
        this.user = user;
    }
}
