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
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationEventPublisher;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.time.LocalDateTime;
import java.util.List;
import com.inf4067.driver_cart.country.repository.CountryRepository;
import com.inf4067.driver_cart.repository.VehiculeRepository;
import com.inf4067.driver_cart.order.factory.CashOrderFactory;
import com.inf4067.driver_cart.order.factory.CreditOrderFactory;
import com.inf4067.driver_cart.order.template.CashOrderAmountCalculator;
import com.inf4067.driver_cart.order.template.CreditOrderAmountCalculator;

@Service
@Transactional
public class OrderService extends Subject {

    private final OrderRepository orderRepository;
    private final CartItemRepository cartItemRepository;
    private final CountryRepository countryRepository;
    private final VehiculeRepository vehicleRepository;
    private final CashOrderFactory cashOrderFactory;
    private final CreditOrderFactory creditOrderFactory;
    private final CashOrderAmountCalculator cashOrderAmountCalculator;
    private final CreditOrderAmountCalculator creditOrderAmountCalculator;

    @Autowired
    public OrderService(
            ApplicationEventPublisher eventPublisher,
            OrderRepository orderRepository,
            CartItemRepository cartItemRepository,
            CountryRepository countryRepository,
            VehiculeRepository vehicleRepository,
            CashOrderFactory cashOrderFactory,
            CreditOrderFactory creditOrderFactory,
            CashOrderAmountCalculator cashOrderAmountCalculator,
            CreditOrderAmountCalculator creditOrderAmountCalculator) {
        super(eventPublisher);
        this.orderRepository = orderRepository;
        this.cartItemRepository = cartItemRepository;
        this.countryRepository = countryRepository;
        this.vehicleRepository = vehicleRepository;
        this.cashOrderFactory = cashOrderFactory;
        this.creditOrderFactory = creditOrderFactory;
        this.cashOrderAmountCalculator = cashOrderAmountCalculator;
        this.creditOrderAmountCalculator = creditOrderAmountCalculator;
    }

    public Order createOrderFromCart(Long userId, OrderType type, Long countryId) {
        // Retrieve all active cart items for the user
        List<CartItem> activeCartItems = cartItemRepository.findByUserIdAndStatus(userId, CartStatus.ACTIVE);
        
        // Load vehicle information for each cart item
        activeCartItems.forEach(item -> {
            Vehicule vehicle = vehicleRepository.findById(item.getVehicleId())
                .orElseThrow(() -> new RuntimeException("Vehicle not found with id: " + item.getVehicleId()));
            item.setVehicle(vehicle);
        });
        
        // Create order using appropriate factory
        Order order;
        if (type == OrderType.CASH) {
            order = cashOrderFactory.createOrder(userId, countryId, type, null);
            order.setTotal(cashOrderAmountCalculator.calculateOrderAmount(activeCartItems));
        } else {
            order = creditOrderFactory.createOrder(userId, countryId, type, null);
            order.setTotal(creditOrderAmountCalculator.calculateOrderAmount(activeCartItems));
        }

        // Save the order first
        final Order savedOrder = orderRepository.save(order);

        // Update cart items status and associate with order
        activeCartItems.forEach(item -> {
            item.setStatus(CartStatus.ORDERED);
            item.setOrderId(savedOrder.getId());
            cartItemRepository.save(item);
            savedOrder.getItems().add(item);
        });

        // Save the order again with items
        return orderRepository.save(savedOrder);

        // Notify observers
        // this.notifyObservers(order, activeCartItems, DocumentFormat.PDF);
        // this.notifyObservers(order, activeCartItems, DocumentFormat.HTML);

        // return order;
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
        List<Order> orders = orderRepository.findAll();
        orders.forEach(this::loadOrderDetails);
        return orders;
    }

    public List<Order> getUserOrders(Long userId) {
        List<Order> orders = orderRepository.findByUserId(userId);
        orders.forEach(this::loadOrderDetails);
        return orders;
    }

    public Order getOrderById(Long id) {
        Order order = orderRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("Order not found"));
        loadOrderDetails(order);
        return order;
    }

    private void loadOrderDetails(Order order) {
        // Load vehicle details for each cart item
        if (order.getItems() != null) {
            order.getItems().forEach(item -> {
                Vehicule vehicle = vehicleRepository.findById(item.getVehicleId())
                    .orElseThrow(() -> new RuntimeException("Vehicle not found"));
                item.setVehicle(vehicle);
            });
        }

        // Country details are automatically loaded through the @ManyToOne relationship
        // User details are automatically loaded through the @ManyToOne relationship
    }

    public void deleteOrderById(Long id) {
        Order order = orderRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Order not found with id: " + id));
        orderRepository.delete(order);
    }
}