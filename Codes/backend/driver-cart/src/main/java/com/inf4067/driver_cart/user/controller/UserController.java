package com.inf4067.driver_cart.user.controller;

import com.inf4067.driver_cart.user.dto.UserRegistrationRequest;
import com.inf4067.driver_cart.user.model.User;
import com.inf4067.driver_cart.user.service.UserService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/users")
@Tag(name = "User Management", description = "API endpoints pour la gestion des utilisateurs")
public class UserController {

    @Autowired
    private UserService userService;

    @PostMapping("/register")
    @Operation(
        summary = "Créer un nouveau compte utilisateur",
        description = "Enregistre un nouvel utilisateur dans le système"
    )
    @ApiResponse(responseCode = "200", description = "Utilisateur créé avec succès")
    @ApiResponse(responseCode = "400", description = "Données invalides")
    public ResponseEntity<User> registerUser(
            @Parameter(description = "Informations d'inscription de l'utilisateur") 
            @Valid @RequestBody UserRegistrationRequest request) {
        return ResponseEntity.ok(userService.registerUser(request));
    }

    @GetMapping
    @PreAuthorize("hasRole('ADMIN')")
    @Operation(
        summary = "Lister tous les utilisateurs",
        description = "Récupère la liste de tous les utilisateurs (Admin uniquement)"
    )
    @ApiResponse(responseCode = "200", description = "Liste des utilisateurs récupérée avec succès")
    @ApiResponse(responseCode = "403", description = "Accès refusé - Réservé aux administrateurs")
    public ResponseEntity<List<User>> getAllUsers() {
        return ResponseEntity.ok(userService.getAllUsers());
    }

    @GetMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN') or #id == authentication.principal.id")
    @Operation(
        summary = "Obtenir les détails d'un utilisateur",
        description = "Récupère les détails d'un utilisateur spécifique (Admin ou propriétaire du compte)"
    )
    @ApiResponse(responseCode = "200", description = "Utilisateur trouvé")
    @ApiResponse(responseCode = "403", description = "Accès refusé")
    @ApiResponse(responseCode = "404", description = "Utilisateur non trouvé")
    public ResponseEntity<User> getUser(
            @Parameter(description = "ID de l'utilisateur à récupérer") 
            @PathVariable Long id) {
        return ResponseEntity.ok(userService.getUser(id));
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN') or #id == authentication.principal.id")
    @Operation(
        summary = "Mettre à jour un utilisateur",
        description = "Met à jour les informations d'un utilisateur (Admin ou propriétaire du compte)"
    )
    @ApiResponse(responseCode = "200", description = "Utilisateur mis à jour avec succès")
    @ApiResponse(responseCode = "400", description = "Données invalides")
    @ApiResponse(responseCode = "403", description = "Accès refusé")
    @ApiResponse(responseCode = "404", description = "Utilisateur non trouvé")
    public ResponseEntity<User> updateUser(
            @Parameter(description = "ID de l'utilisateur à mettre à jour") 
            @PathVariable Long id,
            @Parameter(description = "Nouvelles informations de l'utilisateur") 
            @Valid @RequestBody UserRegistrationRequest request) {
        return ResponseEntity.ok(userService.updateUser(id, request));
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    @Operation(
        summary = "Supprimer un utilisateur",
        description = "Supprime un utilisateur du système (Admin uniquement)"
    )
    @ApiResponse(responseCode = "204", description = "Utilisateur supprimé avec succès")
    @ApiResponse(responseCode = "403", description = "Accès refusé - Réservé aux administrateurs")
    @ApiResponse(responseCode = "404", description = "Utilisateur non trouvé")
    public ResponseEntity<Void> deleteUser(
            @Parameter(description = "ID de l'utilisateur à supprimer") 
            @PathVariable Long id) {
        userService.deleteUser(id);
        return ResponseEntity.noContent().build();
    }
}
