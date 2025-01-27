package com.inf4067.driver_cart.order.repository;

import com.inf4067.driver_cart.order.model.CartItem;
import com.inf4067.driver_cart.order.model.CartStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;
import java.util.Optional;

@Repository
public interface CartItemRepository extends JpaRepository<CartItem, Long> {
    // You can add custom query methods here if needed
    Optional<CartItem> findByUserIdAndVehicleIdAndStatus(Long userId, Long vehicleId, CartStatus status);
    List<CartItem> findByUserIdAndStatus(Long userId, CartStatus status);
}
