package com.inf4067.driver_cart.observer;

import java.util.List;

import org.springframework.context.ApplicationEvent;

import com.inf4067.driver_cart.document.enumeration.DocumentFormat;
import com.inf4067.driver_cart.order.model.CartItem;
import com.inf4067.driver_cart.order.model.Order;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class OrderCreatedEvent extends ApplicationEvent {
    
    private Order order;
    private List<CartItem> cartItems;
    private DocumentFormat format;

    public OrderCreatedEvent(Object source, Order order, List<CartItem> cartItems, DocumentFormat format) {
        super(source);
        this.order = order;
        this.cartItems = cartItems;
        this.format = format;
    }

}
