package com.inf4067.driver_cart.observer;

import com.inf4067.driver_cart.document.enumeration.DocumentFormat;
import com.inf4067.driver_cart.order.model.Order;

public interface Observer {
    void update(Order order, DocumentFormat format);
}
