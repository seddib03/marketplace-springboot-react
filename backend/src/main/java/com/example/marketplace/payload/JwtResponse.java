package com.example.marketplace.payload;

import java.util.List;
import java.util.Set;

public record JwtResponse(
        String token,
        String type,
        Long id,
        String username,
        String email,
        Set<String> roles
) {
    public JwtResponse {
        type = "Bearer";
    }


    public JwtResponse(String token, Long id, String username, String email, List<String> roles) {
        this(token, "Bearer", id, username, email, Set.copyOf(roles));
    }
}
