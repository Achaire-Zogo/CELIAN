package com.inf4067.driver_cart.order.factory;

import com.inf4067.driver_cart.order.model.Order;
import com.inf4067.driver_cart.order.model.CartItem;
import com.inf4067.driver_cart.order.model.OrderType;
import java.util.List;

public interface OrderFactory {
    Order createOrder(Long userId, Long countryId, OrderType type, List<CartItem> items);
}