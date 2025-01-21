package com.inf4067.driver_cart.document.request;

import lombok.Data;

@Data
public class BundleRequest {
    private long sellerId;
    private long buyerId;
    private long vehicleId;
    private String transfertDate;
    private String price; 
}
