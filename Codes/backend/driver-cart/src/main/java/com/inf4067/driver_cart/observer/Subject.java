package com.inf4067.driver_cart.observer;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationEventPublisher;
import org.springframework.stereotype.Component;

import com.inf4067.driver_cart.document.enumeration.DocumentFormat;
import com.inf4067.driver_cart.order.model.CartItem;
import com.inf4067.driver_cart.order.model.Order;

@Component
public class Subject {

    private final ApplicationEventPublisher eventPublisher;

    @Autowired
    public Subject(ApplicationEventPublisher eventPublisher) {
        this.eventPublisher = eventPublisher;
    }

    protected void notifyObservers(Order order, List<CartItem> cartItems, DocumentFormat format) {
        eventPublisher.publishEvent(new OrderCreatedEvent(this, order, cartItems, format));
    }
}
