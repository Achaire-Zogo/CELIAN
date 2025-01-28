package com.inf4067.driver_cart.order.controller;

import com.inf4067.driver_cart.order.model.Order;
import com.inf4067.driver_cart.order.service.OrderService;
import com.inf4067.driver_cart.order.state.OrderState;
import com.inf4067.driver_cart.order.model.OrderType;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/orders")
public class OrderController {

    @Autowired
    private OrderService orderService;

    @PostMapping
    public Order createOrder(@RequestParam Long userId, @RequestParam OrderType type) {
        return orderService.createOrderFromCart(userId, type);
    }

    @GetMapping("/user/{userId}")
    public List<Order> getUserOrders(@PathVariable Long userId) {
        return orderService.getUserOrders(userId);
    }

    @PutMapping("/{id}/state")
    public Order updateOrderState(@PathVariable Long id, @RequestParam OrderState state) {
        return orderService.updateOrderState(id, state);
    }

    @GetMapping
    public List<Order> getAllOrders() {
        return orderService.getAllOrders();
    }

    @GetMapping("/{id}")
    public Order getOrderById(@PathVariable Long id) {
        return orderService.getOrderById(id);
    }

    @DeleteMapping("/delete/{id}")
    public void deleteOrderById(@PathVariable Long id) {
        orderService.deleteOrderById(id);
    }
}