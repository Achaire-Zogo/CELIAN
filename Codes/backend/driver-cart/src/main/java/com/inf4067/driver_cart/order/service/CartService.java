package com.inf4067.driver_cart.order.service;

import com.inf4067.driver_cart.order.dto.AddToCartRequest;
import com.inf4067.driver_cart.order.model.Cart;
import com.inf4067.driver_cart.order.model.CartItem;
import com.inf4067.driver_cart.order.model.CartStatus;
import com.inf4067.driver_cart.order.repository.CartItemRepository;
import com.inf4067.driver_cart.order.repository.CartRepository;
import com.inf4067.driver_cart.user.model.User;
import com.inf4067.driver_cart.user.service.UserService;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.Optional;

@Service
@Transactional
public class CartService {

    @Autowired
    private CartRepository cartRepository;

    public Cart getOrCreateCart(Long userId) {
        return cartRepository.findByUserId(userId)
                .orElseGet(() -> {
                    Cart cart = new Cart();
                    cart.setUserId(userId);
                    return cartRepository.save(cart);
                });
    }

    public void addItemToCart(Long userId, Long vehicleId, int quantity) {
        Cart cart = getOrCreateCart(userId);
        Optional<CartItem> existingItem = cart.getItems().stream()
                .filter(item -> item.getVehicleId().equals(vehicleId))
                .findFirst();

        if (existingItem.isPresent()) {
            existingItem.get().setQuantity(existingItem.get().getQuantity() + quantity);
        } else {
            CartItem newItem = new CartItem();
            newItem.setCart(cart);
            newItem.setVehicleId(vehicleId);
            newItem.setQuantity(quantity);
            cart.getItems().add(newItem);
        }

        cartRepository.save(cart);
    }

    public void removeItemFromCart(Long userId, Long vehicleId) {
        Cart cart = getOrCreateCart(userId);
        cart.getItems().removeIf(item -> item.getVehicleId().equals(vehicleId));
        cartRepository.save(cart);
    }

    public Cart getCart(Long userId) {
        return getOrCreateCart(userId);
    }
}