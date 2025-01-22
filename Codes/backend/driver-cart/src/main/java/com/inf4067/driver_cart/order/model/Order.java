package com.inf4067.driver_cart.order.model;

import com.inf4067.driver_cart.order.state.OrderState;
import com.inf4067.driver_cart.user.model.User;
import jakarta.persistence.*;
import lombok.Data;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "orders")
@Data
public class Order {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    public void setUser(User user) {
        this.user = user;
    }

    @OneToMany(mappedBy = "order", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<OrderItem> items = new ArrayList<>();

    @Column(nullable = false)
    private String orderType;

    @Column(nullable = false)
    @Enumerated(EnumType.STRING)
    private OrderState state;

    @Column(nullable = false)
    private String deliveryAddress;

    @Column(nullable = false, precision = 10, scale = 2)
    private BigDecimal totalAmount;

    @CreationTimestamp
    @Column(nullable = false, updatable = false)
    private LocalDateTime createdAt;

    @UpdateTimestamp
    @Column(nullable = false)
    private LocalDateTime updatedAt;

    public boolean canTransitionTo(OrderState newState) {
        if (state == null) {
            return true;
        }
        return switch (state) {
            case CREATED -> newState == OrderState.CONFIRMED || newState == OrderState.CANCELLED;
            case CONFIRMED -> newState == OrderState.IN_PREPARATION || newState == OrderState.CANCELLED;
            case IN_PREPARATION -> newState == OrderState.READY_FOR_DELIVERY || newState == OrderState.CANCELLED;
            case READY_FOR_DELIVERY -> newState == OrderState.IN_DELIVERY || newState == OrderState.CANCELLED;
            case IN_DELIVERY -> newState == OrderState.DELIVERED || newState == OrderState.CANCELLED;
            case DELIVERED, CANCELLED -> false;
        };
    }
}
