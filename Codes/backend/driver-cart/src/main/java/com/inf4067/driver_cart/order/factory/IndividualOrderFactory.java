package com.inf4067.driver_cart.order.factory;

import com.inf4067.driver_cart.order.model.Order;
import org.springframework.stereotype.Component;

@Component
public class IndividualOrderFactory implements OrderFactory {
    @Override
    public Order createOrder() {
        Order order = new Order();
        order.setOrderType("INDIVIDUAL");
        return order;
    }
}
