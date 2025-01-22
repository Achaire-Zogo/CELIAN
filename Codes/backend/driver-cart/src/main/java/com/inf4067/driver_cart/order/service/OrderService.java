package com.inf4067.driver_cart.order.service;

import com.inf4067.driver_cart.order.dto.CreateOrderRequest;
import com.inf4067.driver_cart.order.factory.CompanyOrderFactory;
import com.inf4067.driver_cart.order.factory.IndividualOrderFactory;
import com.inf4067.driver_cart.order.factory.OrderFactory;
import com.inf4067.driver_cart.order.model.Cart;
import com.inf4067.driver_cart.order.model.Order;
import com.inf4067.driver_cart.order.model.OrderItem;
import com.inf4067.driver_cart.order.repository.CartRepository;
import com.inf4067.driver_cart.order.repository.OrderRepository;
import com.inf4067.driver_cart.order.state.OrderState;
import com.inf4067.driver_cart.user.model.User;
import com.inf4067.driver_cart.user.model.ClientType;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import jakarta.persistence.EntityNotFoundException;
import java.math.BigDecimal;
import java.util.List;
import java.util.stream.Collectors;

@Service
@Transactional
public class OrderService {

    @Autowired
    private OrderRepository orderRepository;

    @Autowired
    private CartRepository cartRepository;

    @Autowired
    private IndividualOrderFactory individualOrderFactory;

    @Autowired
    private CompanyOrderFactory companyOrderFactory;

    public Order createOrderFromCart(CreateOrderRequest request, User user) {
        Cart cart = cartRepository.findByIdAndUser(request.getCartId(), user)
                .orElseThrow(() -> new AccessDeniedException("Cart not found or access denied"));

        OrderFactory factory = user.getClientType() == ClientType.COMPANY ? 
                companyOrderFactory : individualOrderFactory;

        Order order = factory.createOrder();
        order.setUser(user);
        
        // Convert CartItems to OrderItems
        List<OrderItem> orderItems = cart.getItems().stream()
                .map(cartItem -> {
                    OrderItem orderItem = new OrderItem();
                    orderItem.setProductName(cartItem.getProductName());
                    orderItem.setQuantity(cartItem.getQuantity());
                    orderItem.setPrice(cartItem.getPrice());
                    orderItem.setOrder(order);
                    return orderItem;
                })
                .collect(Collectors.toList());
        
        order.setItems(orderItems);
        order.setDeliveryAddress(request.getDeliveryAddress());
        order.setTotalAmount(BigDecimal.valueOf(cart.getTotalAmount()));
        order.setState(OrderState.CREATED);

        // Une fois la commande créée, on peut supprimer le panier
        cartRepository.delete(cart);

        return orderRepository.save(order);
    }

    public Order updateOrderState(Long orderId, OrderState newState, User user) {
        Order order = orderRepository.findById(orderId)
                .orElseThrow(() -> new EntityNotFoundException("Order not found"));

        if (!order.getUser().equals(user)) {
            throw new AccessDeniedException("You don't have permission to update this order");
        }

        if (!order.canTransitionTo(newState)) {
            throw new IllegalStateException("Invalid state transition from " + order.getState() + " to " + newState);
        }

        order.setState(newState);
        return orderRepository.save(order);
    }

    public List<Order> getOrdersByUser(User user) {
        return orderRepository.findByUser(user);
    }

    public Order getOrder(Long orderId, User user) {
        Order order = orderRepository.findById(orderId)
                .orElseThrow(() -> new EntityNotFoundException("Order not found"));

        if (!order.getUser().getId().equals(user.getId())) {
            throw new AccessDeniedException("Not authorized to view this order");
        }

        return order;
    }

    public List<Order> getOrdersByType(ClientType clientType) {
        return orderRepository.findByUserClientType(clientType);
    }
}
