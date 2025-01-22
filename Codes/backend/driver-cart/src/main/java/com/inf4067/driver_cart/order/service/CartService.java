package com.inf4067.driver_cart.order.service;

import com.inf4067.driver_cart.order.model.Cart;
import com.inf4067.driver_cart.order.model.CartItem;
import com.inf4067.driver_cart.order.repository.CartRepository;
import com.inf4067.driver_cart.user.model.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class CartService {
    
    @Autowired
    private CartRepository cartRepository;

    @Transactional
    public Cart createCart(User user) {
        Cart cart = new Cart();
        cart.setUser(user);
        return cartRepository.save(cart);
    }

    @Transactional
    public Cart addItemToCart(Long cartId, CartItem item, User user) {
        Cart cart = cartRepository.findByIdAndUser(cartId, user)
                .orElseThrow(() -> new AccessDeniedException("Cart not found or access denied"));
        
        cart.addItem(item);
        return cartRepository.save(cart);
    }

    @Transactional
    public Cart removeItemFromCart(Long cartId, CartItem item, User user) {
        Cart cart = cartRepository.findByIdAndUser(cartId, user)
                .orElseThrow(() -> new AccessDeniedException("Cart not found or access denied"));
        
        cart.removeItem(item);
        return cartRepository.save(cart);
    }

    public Cart getCart(Long cartId, User user) {
        return cartRepository.findByIdAndUser(cartId, user)
                .orElseThrow(() -> new AccessDeniedException("Cart not found or access denied"));
    }

    public List<Cart> getUserCarts(User user) {
        return cartRepository.findByUser(user);
    }

    @Transactional
    public void clearCart(Long cartId, User user) {
        if (!cartRepository.existsByIdAndUser(cartId, user)) {
            throw new AccessDeniedException("Cart not found or access denied");
        }
        cartRepository.deleteById(cartId);
    }
}
