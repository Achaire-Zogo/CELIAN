package com.inf4067.driver_cart.order.template;

import org.springframework.stereotype.Component;

@Component
public class CashOrderAmountCalculator extends OrderAmountCalculator {
    
    private static final double TAX_RATE = 0.20; // 20% TVA
    private static final double CASH_DISCOUNT = 0.05; // 5% de réduction pour paiement en espèces

    @Override
    protected double calculateTaxes(double subtotal) {
        return subtotal * TAX_RATE;
    }

    @Override
    protected double calculateFees(double subtotal) {
        return 0; // Pas de frais supplémentaires pour le paiement en espèces
    }

    @Override
    protected double finalizeAmount(double total) {
        return total * (1 - CASH_DISCOUNT); // Applique la réduction pour paiement en espèces
    }
}
