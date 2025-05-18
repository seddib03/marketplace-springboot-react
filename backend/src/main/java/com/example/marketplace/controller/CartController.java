package com.example.marketplace.controller;

import com.example.marketplace.model.Cart;
import com.example.marketplace.model.User;
import com.example.marketplace.service.CartService;
import com.example.marketplace.service.UserService;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/carts")
public class CartController {

    private final CartService cartService;
    private final UserService userService;

    public CartController(CartService cartService, UserService userService) {
        this.cartService = cartService;
        this.userService = userService;
    }

    @PostMapping("/create/{userId}")
    public Cart createCart(@PathVariable Long userId) {
        User user = userService.getUserById(userId).orElseThrow();
        return cartService.createCartForUser(user.getId());
    }

    @GetMapping("/{id}")
    public Cart getCart(@PathVariable Long id) {
        return cartService.getCartById(id).orElse(null);
    }

    @DeleteMapping("/{id}")
    public void deleteCart(@PathVariable Long id) {
        cartService.deleteCart(id);
    }
}
