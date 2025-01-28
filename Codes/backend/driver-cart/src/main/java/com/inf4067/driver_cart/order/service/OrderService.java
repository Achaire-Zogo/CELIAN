package com.inf4067.driver_cart.order.service;

import com.inf4067.driver_cart.order.model.CartItem;
import com.inf4067.driver_cart.order.model.CartStatus;
import com.inf4067.driver_cart.document.enumeration.DocumentFormat;
import com.inf4067.driver_cart.observer.Subject;
import com.inf4067.driver_cart.order.model.Order;
import com.inf4067.driver_cart.order.state.OrderState;
import com.inf4067.driver_cart.order.model.OrderType;
import com.inf4067.driver_cart.order.repository.OrderRepository;
import com.inf4067.driver_cart.order.repository.CartItemRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.time.LocalDateTime;
import java.util.List;

@Service
@Transactional
public class OrderService extends Subject {

    @Autowired
    private OrderRepository orderRepository;

    @Autowired
    private CartItemRepository cartItemRepository;

    public Order createOrderFromCart(Long userId, OrderType type) {
        // Retrieve all active cart items for the user
        List<CartItem> activeCartItems = cartItemRepository.findByUserIdAndStatus(userId, CartStatus.ACTIVE);
        
        // Create the order
        Order order = new Order();
        order.setUserId(userId);
        order.setType(type);
        order.setState(OrderState.CREATED);
        order.setCreatedAt(LocalDateTime.now());
    
        // Save the order to get the generated orderId
        Order savedOrder = orderRepository.save(order);
        Long orderId = savedOrder.getId();
    
        // Update the status and orderId of each cart item
        for (CartItem cartItem : activeCartItems) {
            cartItem.setStatus(CartStatus.ORDERED);
            cartItem.setOrderId(orderId);
        }
        
        // Save the updated cart items
        cartItemRepository.saveAll(activeCartItems);
        // Communiquer avec les observateurs
        this.notifyObservers(order, DocumentFormat.HTML);
        return savedOrder;
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

    public void deleteOrderById(Long id) {
        Order order = orderRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Order not found with id: " + id));
        orderRepository.delete(order);
    }
}