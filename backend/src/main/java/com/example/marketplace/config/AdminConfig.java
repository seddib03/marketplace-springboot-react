package com.example.marketplace.config;



import com.example.marketplace.model.User;
import com.example.marketplace.model.Role;
import com.example.marketplace.repository.UserRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.util.Set;

@Configuration
public class AdminConfig {

    @Bean
    CommandLineRunner initAdmin(UserRepository userRepository, PasswordEncoder passwordEncoder) {
        return args -> {
            if (userRepository.findByEmail("admin@market.com").isEmpty()) {
                User admin = new User();
                admin.setEmail("admin@market.com");
                admin.setPassword(passwordEncoder.encode("Admin123!"));
                admin.setRoles(Set.of(Role.ROLE_ADMIN, Role.ROLE_USER));
                admin.setUsername("admin");
                userRepository.save(admin);
                System.out.println("=== ADMIN CREATED ===");
                System.out.println("Email: admin@market.com");
                System.out.println("Password: Admin123!");
                System.out.println("Encoded Password: " + admin.getPassword());
            } else {
                System.out.println("=== ADMIN ALREADY EXISTS ===");
            }
        };
    }
}
