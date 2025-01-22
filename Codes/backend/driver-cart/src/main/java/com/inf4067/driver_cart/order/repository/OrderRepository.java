package com.inf4067.driver_cart.order.repository;

import com.inf4067.driver_cart.order.model.Order;
import com.inf4067.driver_cart.user.model.ClientType;
import com.inf4067.driver_cart.user.model.User;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface OrderRepository extends JpaRepository<Order, Long> {
    List<Order> findByUser(User user);
    List<Order> findByUserClientType(ClientType clientType);
}
