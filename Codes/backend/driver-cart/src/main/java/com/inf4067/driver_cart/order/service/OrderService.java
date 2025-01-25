package com.inf4067.driver_cart.order.service;

import com.inf4067.driver_cart.order.model.Cart;
import com.inf4067.driver_cart.order.model.Order;
import com.inf4067.driver_cart.order.model.OrderItem;
import com.inf4067.driver_cart.order.state.OrderState;
import com.inf4067.driver_cart.order.model.OrderType;
import com.inf4067.driver_cart.order.repository.OrderRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
@Transactional
public class OrderService {

    @Autowired
    private OrderRepository orderRepository;

    @Autowired
    private CartService cartService;

    public Order createOrderFromCart(Long userId, OrderType type) {
        Cart cart = cartService.getCart(userId);
        Order order = new Order();
        order.setUserId(userId);
        order.setType(type);
        order.setState(OrderState.CREATED);
        order.setCreatedAt(LocalDateTime.now());

        List<OrderItem> orderItems = cart.getItems().stream()
                .map(cartItem -> {
                    OrderItem orderItem = new OrderItem();
                    orderItem.setOrder(order);
                    orderItem.setVehicleId(cartItem.getVehicleId());
                    orderItem.setQuantity(cartItem.getQuantity());
                    return orderItem;
                })
                .collect(Collectors.toList());

        order.setItems(orderItems);
        return orderRepository.save(order);
    }

    public Order updateOrderState(Long orderId, OrderState state) {
        Order order = orderRepository.findById(orderId)
                .orElseThrow(() -> new RuntimeException("Order not found"));
        order.setState(state);
        return orderRepository.save(order);
    }

    public List<Order> getAllOrders() {
        return orderRepository.findAll();
    }

    public List<Order> getUserOrders(Long userId) {
        return orderRepository.findByUserId(userId);
    }

    public Order getOrderById(Long id) {
        return orderRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Order not found"));
    }
}