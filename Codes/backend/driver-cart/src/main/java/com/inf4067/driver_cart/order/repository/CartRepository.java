package com.inf4067.driver_cart.order.repository;

import com.inf4067.driver_cart.order.model.Cart;
import com.inf4067.driver_cart.user.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface CartRepository extends JpaRepository<Cart, Long> {
    List<Cart> findByUser(User user);
    Optional<Cart> findByIdAndUser(Long id, User user);
    boolean existsByIdAndUser(Long id, User user);
}
