package com.inf4067.driver_cart.order.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
@Schema(description = "DTO pour la création d'une commande à partir d'un panier")
public class CreateOrderRequest {
    @NotNull(message = "Cart ID is required")
    @Schema(description = "ID du panier à convertir en commande", example = "1")
    private Long cartId;

    @NotBlank(message = "Delivery address is required")
    @Schema(description = "Adresse de livraison", example = "123 Rue de la Paix, 75000 Paris")
    private String deliveryAddress;
}
