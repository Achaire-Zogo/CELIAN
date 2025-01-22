package com.inf4067.driver_cart.order.dto;

import lombok.Data;
import java.math.BigDecimal;

@Data
public class AddToCartRequest {
    private Long vehicleId;
    private String vehicleName;
    private String vehicleType;
    private BigDecimal price;
}
