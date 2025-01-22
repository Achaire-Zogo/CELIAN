package com.inf4067.driver_cart.order.controller;

import com.inf4067.driver_cart.order.dto.CreateOrderRequest;
import com.inf4067.driver_cart.order.model.Order;
import com.inf4067.driver_cart.order.service.OrderService;
import com.inf4067.driver_cart.order.state.OrderState;
import com.inf4067.driver_cart.user.model.ClientType;
import com.inf4067.driver_cart.user.model.User;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/orders")
@Tag(name = "Order Management", description = "API endpoints pour la gestion des commandes")
public class OrderController {

    @Autowired
    private OrderService orderService;

    @PostMapping("/from-cart")
    @Operation(
        summary = "Créer une commande à partir d'un panier",
        description = "Convertit un panier existant en commande"
    )
    @ApiResponse(responseCode = "200", description = "Commande créée avec succès")
    @ApiResponse(responseCode = "403", description = "Accès refusé - Le panier n'appartient pas à l'utilisateur")
    @ApiResponse(responseCode = "404", description = "Panier non trouvé")
    public ResponseEntity<Order> createOrderFromCart(
            @Parameter(description = "Détails de la commande") 
            @Valid @RequestBody CreateOrderRequest request,
            @AuthenticationPrincipal User user) {
        return ResponseEntity.ok(orderService.createOrderFromCart(request, user));
    }

    @GetMapping
    @Operation(
        summary = "Obtenir les commandes de l'utilisateur connecté",
        description = "Récupère toutes les commandes de l'utilisateur authentifié"
    )
    @ApiResponse(responseCode = "200", description = "Liste des commandes récupérée avec succès")
    public ResponseEntity<List<Order>> getUserOrders(@AuthenticationPrincipal User user) {
        return ResponseEntity.ok(orderService.getOrdersByUser(user));
    }

    @GetMapping("/{orderId}")
    @Operation(
        summary = "Obtenir une commande spécifique",
        description = "Récupère les détails d'une commande spécifique"
    )
    @ApiResponse(responseCode = "200", description = "Commande trouvée")
    @ApiResponse(responseCode = "403", description = "Accès refusé - La commande n'appartient pas à l'utilisateur")
    @ApiResponse(responseCode = "404", description = "Commande non trouvée")
    public ResponseEntity<Order> getOrder(
            @Parameter(description = "ID de la commande") 
            @PathVariable Long orderId,
            @AuthenticationPrincipal User user) {
        return ResponseEntity.ok(orderService.getOrder(orderId, user));
    }

    @PutMapping("/{orderId}/state")
    @Operation(
        summary = "Mettre à jour l'état d'une commande",
        description = "Change l'état d'une commande existante"
    )
    @ApiResponse(responseCode = "200", description = "État de la commande mis à jour avec succès")
    @ApiResponse(responseCode = "400", description = "Transition d'état invalide")
    @ApiResponse(responseCode = "403", description = "Accès refusé - La commande n'appartient pas à l'utilisateur")
    @ApiResponse(responseCode = "404", description = "Commande non trouvée")
    public ResponseEntity<Order> updateOrderState(
            @Parameter(description = "ID de la commande") 
            @PathVariable Long orderId,
            @Parameter(description = "Nouvel état de la commande") 
            @RequestParam OrderState newState,
            @AuthenticationPrincipal User user) {
        return ResponseEntity.ok(orderService.updateOrderState(orderId, newState, user));
    }

    @GetMapping("/type/{clientType}")
    @PreAuthorize("hasRole('ADMIN')")
    @Operation(
        summary = "Obtenir les commandes par type de client",
        description = "Récupère toutes les commandes d'un type de client spécifique (Admin uniquement)"
    )
    @ApiResponse(responseCode = "200", description = "Liste des commandes récupérée avec succès")
    @ApiResponse(responseCode = "403", description = "Accès refusé - Réservé aux administrateurs")
    public ResponseEntity<List<Order>> getOrdersByType(
            @Parameter(description = "Type de client (INDIVIDUAL ou COMPANY)") 
            @PathVariable ClientType clientType) {
        return ResponseEntity.ok(orderService.getOrdersByType(clientType));
    }
}
