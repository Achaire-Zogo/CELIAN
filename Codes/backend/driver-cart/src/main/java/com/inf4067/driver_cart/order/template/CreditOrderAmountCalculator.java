package com.inf4067.driver_cart.order.template;

import org.springframework.stereotype.Component;

@Component
public class CreditOrderAmountCalculator extends OrderAmountCalculator {
    
    private static final double TAX_RATE = 0.20; // 20% TVA
    private static final double CREDIT_FEE_RATE = 0.03; // 3% de frais de crédit

    @Override
    protected double calculateTaxes(double subtotal) {
        return subtotal * TAX_RATE;
    }

    @Override
    protected double calculateFees(double subtotal) {
        return subtotal * CREDIT_FEE_RATE; // Ajoute les frais de crédit
    }

    @Override
    protected double finalizeAmount(double total) {
        return total; // Pas de réduction pour le paiement par crédit
    }
}
