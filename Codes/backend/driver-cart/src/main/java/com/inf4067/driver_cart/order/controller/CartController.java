package com.inf4067.driver_cart.order.controller;

import com.inf4067.driver_cart.order.model.CartItem;
import com.inf4067.driver_cart.order.service.CartService;
import io.swagger.v3.oas.annotations.tags.Tag;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/cart")
@Tag(name = "Cart Management", description = "API endpoints pour la gestion des paniers d'achats")
public class CartController {

    @Autowired
    private CartService cartService;

    @PostMapping("/add")
    public void addItemToCart(@RequestParam Long userId, @RequestParam Long vehicleId, @RequestParam int quantity) {
        cartService.addItemToCart(userId, vehicleId, quantity);
    }

    @PostMapping("/remove")
    public void removeItemFromCart(@RequestParam Long userId, @RequestParam Long vehicleId) {
        cartService.removeItemFromCart(userId, vehicleId);
    }

    @PostMapping("/update_cart_quantity")
    public void updateCartQuantity(@RequestParam Long cartId, @RequestParam int quantity) {
        cartService.updateCartQuantity(cartId, quantity);
    }

    @GetMapping
    public List<CartItem> getCart(@RequestParam Long userId) {
        return cartService.getItemCart(userId);
    }
}