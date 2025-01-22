package com.inf4067.driver_cart.order.controller;

import com.inf4067.driver_cart.order.model.Cart;
import com.inf4067.driver_cart.order.model.CartItem;
import com.inf4067.driver_cart.order.service.CartService;
import com.inf4067.driver_cart.user.model.User;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.tags.Tag;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/carts")
@Tag(name = "Cart Management", description = "API endpoints pour la gestion des paniers d'achats")
public class CartController {

    @Autowired
    private CartService cartService;

    @PostMapping
    @Operation(
        summary = "Créer un nouveau panier",
        description = "Crée et initialise un nouveau panier vide pour l'utilisateur connecté"
    )
    @ApiResponse(responseCode = "200", description = "Panier créé avec succès")
    public ResponseEntity<Cart> createCart(@AuthenticationPrincipal User user) {
        return ResponseEntity.ok(cartService.createCart(user));
    }

    @GetMapping
    @Operation(
        summary = "Obtenir tous les paniers de l'utilisateur",
        description = "Récupère tous les paniers appartenant à l'utilisateur connecté"
    )
    @ApiResponse(responseCode = "200", description = "Liste des paniers récupérée avec succès")
    public ResponseEntity<List<Cart>> getUserCarts(@AuthenticationPrincipal User user) {
        return ResponseEntity.ok(cartService.getUserCarts(user));
    }

    @GetMapping("/{cartId}")
    @Operation(
        summary = "Obtenir un panier",
        description = "Récupère les détails d'un panier spécifique appartenant à l'utilisateur connecté"
    )
    @ApiResponse(responseCode = "200", description = "Panier trouvé")
    @ApiResponse(responseCode = "403", description = "Accès refusé - Le panier n'appartient pas à l'utilisateur")
    @ApiResponse(responseCode = "404", description = "Panier non trouvé")
    public ResponseEntity<Cart> getCart(
            @Parameter(description = "ID du panier à récupérer") 
            @PathVariable Long cartId,
            @AuthenticationPrincipal User user) {
        return ResponseEntity.ok(cartService.getCart(cartId, user));
    }

    @PostMapping("/{cartId}/items")
    @Operation(
        summary = "Ajouter un article au panier",
        description = "Ajoute un nouvel article au panier spécifié de l'utilisateur connecté"
    )
    @ApiResponse(responseCode = "200", description = "Article ajouté avec succès")
    @ApiResponse(responseCode = "403", description = "Accès refusé - Le panier n'appartient pas à l'utilisateur")
    @ApiResponse(responseCode = "404", description = "Panier non trouvé")
    public ResponseEntity<Cart> addItemToCart(
            @Parameter(description = "ID du panier") 
            @PathVariable Long cartId,
            @Parameter(description = "Article à ajouter") 
            @RequestBody CartItem item,
            @AuthenticationPrincipal User user) {
        return ResponseEntity.ok(cartService.addItemToCart(cartId, item, user));
    }

    @DeleteMapping("/{cartId}/items")
    @Operation(
        summary = "Supprimer un article du panier",
        description = "Supprime un article spécifique du panier de l'utilisateur connecté"
    )
    @ApiResponse(responseCode = "200", description = "Article supprimé avec succès")
    @ApiResponse(responseCode = "403", description = "Accès refusé - Le panier n'appartient pas à l'utilisateur")
    @ApiResponse(responseCode = "404", description = "Panier ou article non trouvé")
    public ResponseEntity<Cart> removeItemFromCart(
            @Parameter(description = "ID du panier") 
            @PathVariable Long cartId,
            @Parameter(description = "Article à supprimer") 
            @RequestBody CartItem item,
            @AuthenticationPrincipal User user) {
        return ResponseEntity.ok(cartService.removeItemFromCart(cartId, item, user));
    }

    @DeleteMapping("/{cartId}")
    @Operation(
        summary = "Vider un panier",
        description = "Supprime tous les articles du panier spécifié de l'utilisateur connecté"
    )
    @ApiResponse(responseCode = "204", description = "Panier vidé avec succès")
    @ApiResponse(responseCode = "403", description = "Accès refusé - Le panier n'appartient pas à l'utilisateur")
    public ResponseEntity<Void> clearCart(
            @Parameter(description = "ID du panier à vider") 
            @PathVariable Long cartId,
            @AuthenticationPrincipal User user) {
        cartService.clearCart(cartId, user);
        return ResponseEntity.noContent().build();
    }
}
