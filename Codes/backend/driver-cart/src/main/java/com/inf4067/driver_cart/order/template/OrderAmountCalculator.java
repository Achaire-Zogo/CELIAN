package com.inf4067.driver_cart.order.template;

import java.util.List;
import com.inf4067.driver_cart.order.model.CartItem;

public abstract class OrderAmountCalculator {
    
    // Template method
    public final double calculateOrderAmount(List<CartItem> items) {
        double subtotal = calculateSubtotal(items);
        double taxes = calculateTaxes(subtotal);
        double fees = calculateFees(subtotal);
        return finalizeAmount(subtotal + taxes + fees);
    }

    // Concrete method
    protected double calculateSubtotal(List<CartItem> items) {
        return items.stream()
                .mapToDouble(item -> item.getVehicle().getPrice() * item.getQuantity())
                .sum();
    }

    // Abstract methods to be implemented by concrete classes
    protected abstract double calculateTaxes(double subtotal);
    protected abstract double calculateFees(double subtotal);
    protected abstract double finalizeAmount(double total);
}
