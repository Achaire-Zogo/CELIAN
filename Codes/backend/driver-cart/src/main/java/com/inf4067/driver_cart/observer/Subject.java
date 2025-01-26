package com.inf4067.driver_cart.observer;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationEventPublisher;
import org.springframework.stereotype.Component;

import com.inf4067.driver_cart.document.enumeration.DocumentFormat;
import com.inf4067.driver_cart.order.model.Order;

@Component
public class Subject {

    @Autowired
    private ApplicationEventPublisher eventPublisher;

    protected void notifyObservers(Order order, DocumentFormat format) {
        eventPublisher.publishEvent(new OrderCreatedEvent(this, order, format));
    }
}
