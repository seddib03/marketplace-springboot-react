package com.example.marketplace.service;

import com.example.marketplace.model.Cart;
import com.example.marketplace.model.User;
import com.example.marketplace.repository.CartRepository;
import com.example.marketplace.repository.UserRepository;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class CartService {

    private final CartRepository cartRepository;
    private final UserRepository userRepository;

    // ✅ Injection des 2 repositories dans le constructeur
    public CartService(CartRepository cartRepository, UserRepository userRepository) {
        this.cartRepository = cartRepository;
        this.userRepository = userRepository;
    }

    public Cart createCartForUser(Long userId) {
        Optional<Cart> existingCart = cartRepository.findByUserId(userId);
        if (existingCart.isPresent()) {
            return existingCart.get();
        }

        // ✅ Utilisation de userRepository injecté
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        Cart newCart = new Cart();
        newCart.setUser(user);
        return cartRepository.save(newCart);
    }

    public Optional<Cart> getCartById(Long id) {
        return cartRepository.findById(id);
    }

    public void deleteCart(Long id) {
        cartRepository.deleteById(id);
    }
}
