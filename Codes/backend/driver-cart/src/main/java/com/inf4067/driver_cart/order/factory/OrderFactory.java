package com.inf4067.driver_cart.order.factory;

import com.inf4067.driver_cart.order.model.Order;
import com.inf4067.driver_cart.order.model.CartItem;

public interface OrderFactory {
    Order createOrder(Long userId, CartItem cart);
}