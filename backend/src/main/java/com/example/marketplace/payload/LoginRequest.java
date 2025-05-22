package com.example.marketplace.payload;


import jakarta.validation.constraints.*;

public record LoginRequest(
        @NotBlank @Email String email,
        @NotBlank @Size(min = 6) String password
) {}
