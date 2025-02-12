package com.inf4067.driver_cart.user.service;

import com.inf4067.driver_cart.security.JwtTokenProvider;
import com.inf4067.driver_cart.user.dto.AuthRequest;
import com.inf4067.driver_cart.user.dto.AuthResponse;
import com.inf4067.driver_cart.user.dto.UserRegistrationRequest;
import com.inf4067.driver_cart.user.model.User;
import com.inf4067.driver_cart.user.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import jakarta.persistence.EntityNotFoundException;
import java.time.LocalDateTime;
import java.util.List;

@Service
@Transactional
public class UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private JwtTokenProvider jwtTokenProvider;

    public User createUser(User user) {
        if (userRepository.findByEmail(user.getEmail()).isPresent()) {
            throw new IllegalStateException("Email already taken");
        }
        
        user.setCreatedAt(LocalDateTime.now());
        user.setUpdatedAt(LocalDateTime.now());
        return userRepository.save(user);
    }

    public User getUser(Long id) {
        return userRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("User not found"));
    }

    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    public User updateUser(Long id, User updatedUser) {
        User user = getUser(id);
        
        user.setEmail(updatedUser.getEmail());
        user.setName(updatedUser.getName());
        user.setClientType(updatedUser.getClientType());
        user.setCompanyName(updatedUser.getCompanyName());
        user.setRegistrationNumber(updatedUser.getRegistrationNumber());
        user.setFirstName(updatedUser.getFirstName());
        user.setLastName(updatedUser.getLastName());
        user.setPhoneNumber(updatedUser.getPhoneNumber());
        user.setUpdatedAt(LocalDateTime.now());
        
        return userRepository.save(user);
    }

    public void deleteUser(Long id) {
        if (!userRepository.existsById(id)) {
            throw new EntityNotFoundException("User not found");
        }
        userRepository.deleteById(id);
    }

    public User registerUser(UserRegistrationRequest request) {
        if (userRepository.findByEmail(request.getEmail()).isPresent()) {
            throw new IllegalStateException("Email already taken");
        }

        User user = new User();
        user.setEmail(request.getEmail());
        user.setPassword(passwordEncoder.encode(request.getPassword()));
        user.setName(request.getName());
        user.setClientType(request.getClientType());
        
        if (request.getClientType().toString().equals("COMPANY")) {
            user.setCompanyName(request.getCompanyName());
            user.setRegistrationNumber(request.getRegistrationNumber());
        } else {
            user.setFirstName(request.getFirstName());
            user.setLastName(request.getLastName());
            user.setPhoneNumber(request.getPhoneNumber());
        }
        
        user.setCreatedAt(LocalDateTime.now());
        user.setUpdatedAt(LocalDateTime.now());
        
        return userRepository.save(user);
    }

    public AuthResponse authenticate(AuthRequest request) {
        User user = userRepository.findByEmail(request.getEmail())
                .orElseThrow(() -> new BadCredentialsException("Invalid email or password"));

        if (!passwordEncoder.matches(request.getPassword(), user.getPassword())) {
            throw new BadCredentialsException("Invalid email or password");
        }

        String token = jwtTokenProvider.generateToken(user);
        return new AuthResponse(token, user);
    }

    public User getCurrentUser(String token) {
        String userEmail = jwtTokenProvider.getUserEmailFromToken(token.replace("Bearer ", ""));
        return userRepository.findByEmail(userEmail)
                .orElseThrow(() -> new EntityNotFoundException("User not found"));
    }

    public User updateProfile(String token, UserRegistrationRequest request) {
        User user = getCurrentUser(token);
        
        if (request.getPassword() != null && !request.getPassword().isEmpty()) {
            user.setPassword(passwordEncoder.encode(request.getPassword()));
        }
        
        user.setName(request.getName());
        
        if (request.getClientType().toString().equals("COMPANY")) {
            user.setCompanyName(request.getCompanyName());
            user.setRegistrationNumber(request.getRegistrationNumber());
        } else {
            user.setFirstName(request.getFirstName());
            user.setLastName(request.getLastName());
            user.setPhoneNumber(request.getPhoneNumber());
        }
        
        user.setUpdatedAt(LocalDateTime.now());
        return userRepository.save(user);
    }

    public void logout(String token) {
        String userEmail = jwtTokenProvider.getUserEmailFromToken(token.replace("Bearer ", ""));
        jwtTokenProvider.invalidateToken(token.replace("Bearer ", ""));
    }

}
