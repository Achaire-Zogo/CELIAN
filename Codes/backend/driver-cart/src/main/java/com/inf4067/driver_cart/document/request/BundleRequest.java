package com.inf4067.driver_cart.document.request;

import com.inf4067.driver_cart.order.model.Order;

import lombok.Data;

@Data
public class BundleRequest {

    private long buyerId;
    private long vehicleId;
    private String transfertDate;
    
    private long orderId;
}
