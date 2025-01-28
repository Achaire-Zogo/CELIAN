package com.inf4067.driver_cart.order.service;

import com.inf4067.driver_cart.model.Vehicule;
import com.inf4067.driver_cart.order.dto.AddToCartRequest;
import com.inf4067.driver_cart.order.model.CartItem;
import com.inf4067.driver_cart.order.model.CartStatus;
import com.inf4067.driver_cart.order.repository.CartItemRepository;
import com.inf4067.driver_cart.service.VehiculeService;
import com.inf4067.driver_cart.user.model.User;
import com.inf4067.driver_cart.user.service.UserService;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;
import java.util.Optional;

@Service
@Transactional
public class CartService {

    @Autowired
    private CartItemRepository cartItemRepository;
    @Autowired
    private VehiculeService vehiculeService;

   
    public void addItemToCart(Long userId, Long vehicleId, int quantity) {
        Optional<CartItem> existingItem = cartItemRepository.findByUserIdAndVehicleIdAndStatus(userId, vehicleId, CartStatus.ACTIVE);
        CartItem cartItem;

        if (existingItem.isPresent()) {
            cartItem = existingItem.get();
            cartItem.setQuantity(cartItem.getQuantity() + quantity);
        } else {
            cartItem = new CartItem();
            cartItem.setUserId(userId);
            cartItem.setVehicleId(vehicleId);
            cartItem.setQuantity(quantity);
            cartItem.setStatus(CartStatus.ACTIVE);
        }

        cartItemRepository.save(cartItem);
    }

    public void removeItemFromCart(Long userId, Long vehicleId) {
        Optional<CartItem> cartItem = cartItemRepository.findByUserIdAndVehicleIdAndStatus(userId, vehicleId, CartStatus.ACTIVE);
        cartItem.ifPresent(cartItemRepository::delete);
    }

    public List<CartItem> getItemCart(Long userId) {
        List<CartItem> cartItems = cartItemRepository.findByUserIdAndStatus(userId, CartStatus.ACTIVE);
        
        if (cartItems.isEmpty()) {
            throw new EntityNotFoundException("CartItems not found for user ID: " + userId);
        }
        
        // Fetch complete vehicle information for each cart item
        for (CartItem cartItem : cartItems) {
            Vehicule completeVehicle = fetchCompleteVehicleInfo(cartItem.getVehicleId());
            cartItem.setVehicle(completeVehicle);
        }
    
        return cartItems; // Return the list of cart items
    }

    // Assume this method fetches complete vehicle information based on vehicle ID
    private Vehicule fetchCompleteVehicleInfo(Long vehicleId) {
        // Implement the logic to fetch complete vehicle details
        // This could be a call to another repository or service
        return vehiculeService.getVehiculeById(vehicleId);
    }
}