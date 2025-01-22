package com.inf4067.driver_cart.order.builder;

import com.inf4067.driver_cart.order.model.Order;
import com.inf4067.driver_cart.order.model.OrderItem;
import com.inf4067.driver_cart.order.state.OrderState;
import com.inf4067.driver_cart.user.model.User;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;

public class OrderBuilder {
    private Order order;
    private List<OrderItem> items;

    public OrderBuilder() {
        this.order = new Order();
        this.items = new ArrayList<>();
    }

    public OrderBuilder withClient(User client) {
        order.setUser(client);
        return this;
    }

    public OrderBuilder withDeliveryAddress(String address) {
        order.setDeliveryAddress(address);
        return this;
    }

    public OrderBuilder withOrderType(String type) {
        order.setOrderType(type);
        return this;
    }

    public OrderBuilder addItem(OrderItem item) {
        this.items.add(item);
        return this;
    }

    public Order build() {
        order.setItems(items);
        order.setState(OrderState.CREATED);
        BigDecimal total = items.stream()
                .map(item -> BigDecimal.valueOf(item.getQuantity()).multiply(BigDecimal.valueOf(item.getPrice())))
                .reduce(BigDecimal.ZERO, BigDecimal::add);
        order.setTotalAmount(total);
        return order;
    }
}
