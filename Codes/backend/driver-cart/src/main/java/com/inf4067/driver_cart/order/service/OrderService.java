package com.inf4067.driver_cart.order.service;

import com.inf4067.driver_cart.document.enumeration.DocumentFormat;
import com.inf4067.driver_cart.observer.Subject;
import com.inf4067.driver_cart.order.model.CartItem;
import com.inf4067.driver_cart.order.model.CartStatus;
import com.inf4067.driver_cart.country.model.Country;
import com.inf4067.driver_cart.document.enumeration.DocumentFormat;
import com.inf4067.driver_cart.model.Vehicule;
import com.inf4067.driver_cart.observer.Subject;
import com.inf4067.driver_cart.order.model.Order;
import com.inf4067.driver_cart.order.state.OrderState;
import com.inf4067.driver_cart.order.model.OrderType;
import com.inf4067.driver_cart.order.repository.OrderRepository;
import com.inf4067.driver_cart.order.repository.CartItemRepository;
import com.inf4067.driver_cart.repository.VehiculeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.time.LocalDateTime;
import java.util.List;
import com.inf4067.driver_cart.country.repository.CountryRepository;

@Service
@Transactional
public class OrderService extends Subject {

    @Autowired
    private OrderRepository orderRepository;

    @Autowired
    private CartItemRepository cartItemRepository;

    @Autowired
    private CountryRepository countryRepository;

    @Autowired
    private VehiculeRepository vehicleRepository;

    public Order createOrderFromCart(Long userId, OrderType type, Long countryId) {
        // Retrieve all active cart items for the user
        List<CartItem> activeCartItems = cartItemRepository.findByUserIdAndStatus(userId, CartStatus.ACTIVE);
    
        // Fetch the country's tax rate
        Country country = countryRepository.findById(countryId).orElseThrow(() -> new RuntimeException("Country not found"));
        double taxRate = country.getTaxRate();
    
        // Calculate the total tax for the cart items
        double totalTax = 0.0;
        for (CartItem cartItem : activeCartItems) {
            // Ensure vehicle details are populated
            Vehicule vehicle = fetchVehicleDetails(cartItem.getVehicleId());
            cartItem.setVehicle(vehicle);
    
            // Calculate tax based on vehicle price
            double itemTax = vehicle.getPrice() * taxRate * cartItem.getQuantity();
            totalTax += itemTax;
        }
    
        // Create the order
        Order order = new Order();
        order.setUserId(userId);
        order.setType(type);
        order.setState(OrderState.CREATED);
        order.setCreatedAt(LocalDateTime.now());
        order.setCountryId(countryId);
        order.setTotal(totalTax); // Set the calculated total tax
    
        // Save the order to get the generated orderId
        Order savedOrder = orderRepository.save(order);
        Long orderId = savedOrder.getId();
        
        // Communiquer avec les observateurs
        this.notifyObservers(savedOrder, activeCartItems, DocumentFormat.PDF);
        this.notifyObservers(savedOrder, activeCartItems, DocumentFormat.HTML);
        
        // Update the status and orderId of each cart item
        for (CartItem cartItem : activeCartItems) {
            cartItem.setStatus(CartStatus.ORDERED);
            cartItem.setOrderId(orderId);
        }
    
        // Save the updated cart items
        cartItemRepository.saveAll(activeCartItems);
        
        return savedOrder;
    }

    // Example method to fetch vehicle details
    private Vehicule fetchVehicleDetails(Long vehicleId) {
        // Implement logic to fetch vehicle details from the database or service
        return vehicleRepository.findById(vehicleId).orElseThrow(() -> new RuntimeException("Vehicle not found"));
        
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