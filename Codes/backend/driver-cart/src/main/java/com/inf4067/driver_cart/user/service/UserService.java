package com.inf4067.driver_cart.user.service;

import com.inf4067.driver_cart.user.dto.UserRegistrationRequest;
import com.inf4067.driver_cart.user.model.ClientType;
import com.inf4067.driver_cart.user.model.User;
import com.inf4067.driver_cart.user.model.UserRole;
import com.inf4067.driver_cart.user.repository.UserRepository;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Transactional
    public User registerUser(UserRegistrationRequest request) {
        // Vérifier si l'email existe déjà
        if (userRepository.existsByEmail(request.getEmail())) {
            throw new IllegalArgumentException("Email already exists");
        }

        User user = new User();
        user.setEmail(request.getEmail());
        user.setPassword(passwordEncoder.encode(request.getPassword()));
        user.setName(request.getName());
        user.setClientType(request.getClientType());
        user.setRole(UserRole.USER); // Par défaut, tous les nouveaux utilisateurs sont USER

        // Selon le type de client, remplir les champs appropriés
        if (request.getClientType() == ClientType.COMPANY) {
            user.setCompanyName(request.getCompanyName());
            user.setRegistrationNumber(request.getRegistrationNumber());
        } else {
            user.setFirstName(request.getFirstName());
            user.setLastName(request.getLastName());
            user.setPhoneNumber(request.getPhoneNumber());
        }

        return userRepository.save(user);
    }

    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    public User getUser(Long id) {
        return userRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("User not found"));
    }

    @Transactional
    public User updateUser(Long id, UserRegistrationRequest request) {
        User user = getUser(id);

        // Mise à jour des champs communs
        user.setName(request.getName());
        if (request.getPassword() != null && !request.getPassword().isEmpty()) {
            user.setPassword(passwordEncoder.encode(request.getPassword()));
        }

        // Mise à jour des champs spécifiques au type de client
        if (request.getClientType() == ClientType.COMPANY) {
            user.setCompanyName(request.getCompanyName());
            user.setRegistrationNumber(request.getRegistrationNumber());
            // Effacer les champs individuels
            user.setFirstName(null);
            user.setLastName(null);
            user.setPhoneNumber(null);
        } else {
            user.setFirstName(request.getFirstName());
            user.setLastName(request.getLastName());
            user.setPhoneNumber(request.getPhoneNumber());
            // Effacer les champs entreprise
            user.setCompanyName(null);
            user.setRegistrationNumber(null);
        }

        return userRepository.save(user);
    }

    @Transactional
    public void deleteUser(Long id) {
        if (!userRepository.existsById(id)) {
            throw new EntityNotFoundException("User not found");
        }
        userRepository.deleteById(id);
    }
}
