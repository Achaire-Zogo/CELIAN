package com.inf4067.driver_cart.order.model;

import com.inf4067.driver_cart.order.state.OrderState;
import com.inf4067.driver_cart.order.model.OrderType;
import com.inf4067.driver_cart.user.model.User;
import com.inf4067.driver_cart.country.model.Country;
import com.inf4067.driver_cart.order.model.CartItem;
import jakarta.persistence.*;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "orders")
public class Order {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "user_id", insertable = false, updatable = false)
    private User user;

    @Column(name = "user_id")
    private Long userId; // ID de l'utilisateur

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "country_id", insertable = false, updatable = false)
    private Country country;

    @Column(name = "country_id")
    private Long countryId; // ID du pays    

    private double total;

    @OneToMany(fetch = FetchType.EAGER)
    @JoinColumn(name = "order_id", referencedColumnName = "id")
    private List<CartItem> items;

    @Enumerated(EnumType.STRING)
    private OrderState state; // État de la commande

    @Enumerated(EnumType.STRING)
    private OrderType type; // Type de la commande (cash, credit)

    private LocalDateTime createdAt;

    public Order() {
        this.items = new ArrayList<>();
    }

    // Helper method to add an CartItem
    public void addItem(CartItem item) {
        items.add(item);
        item.setOrderId(this.id);
    }

    // Helper method to remove an CartItem
    public void removeItem(CartItem item) {
        items.remove(item);
        item.setOrderId(null);
    }
    // Getters and setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    public Country getCountry() {
        return country;
    }

    public void setCountry(Country country) {
        this.country = country;
    }

    public Long getCountryId() {
        return countryId;
    }

    public void setCountryId(Long countryId) {
        this.countryId = countryId;
    }

    public List<CartItem> getItems() {
        return items;
    }

    public void setItems(List<CartItem> items) {
        this.items = items;
    }

    public OrderState getState() {
        return state;
    }

    public void setState(OrderState state) {
        this.state = state;
    }

    public OrderType getType() {
        return type;
    }

    public void setType(OrderType type) {
        this.type = type;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }

    public void setTotal(double total) {
        this.total = total;
    }

    public double getTotal() {
        return total;
    }

   
}
