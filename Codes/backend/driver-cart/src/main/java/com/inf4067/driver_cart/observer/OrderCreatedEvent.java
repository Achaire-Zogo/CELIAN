package com.inf4067.driver_cart.observer;

import org.springframework.context.ApplicationEvent;

import com.inf4067.driver_cart.document.enumeration.DocumentFormat;
import com.inf4067.driver_cart.order.model.Order;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class OrderCreatedEvent extends ApplicationEvent {
    
    private Order order;
    private DocumentFormat format;

    public OrderCreatedEvent(Object source, Order order, DocumentFormat format) {
        super(source);
        this.order = order;
        this.format = format;
    }

}
