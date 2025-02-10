package com.inf4067.driver_cart.order.factory;

import com.inf4067.driver_cart.order.model.Order;
import com.inf4067.driver_cart.order.model.CartItem;
import com.inf4067.driver_cart.order.model.OrderType;
import com.inf4067.driver_cart.order.state.OrderState;
import org.springframework.stereotype.Component;
import java.time.LocalDateTime;
import java.util.List;
import java.util.ArrayList;

@Component
public class CreditOrderFactory implements OrderFactory {
    @Override
    public Order createOrder(Long userId, Long countryId, OrderType type, List<CartItem> items) {
        Order order = new Order();
        order.setUserId(userId);
        order.setCountryId(countryId);
        order.setType(OrderType.CREDIT);
        order.setState(OrderState.CREATED);
        order.setCreatedAt(LocalDateTime.now());
        order.setItems(new ArrayList<>());
        
        // Ajouter les items
        if (items != null) {
            items.forEach(order::addItem);
        }
        
        return order;
    }
}
