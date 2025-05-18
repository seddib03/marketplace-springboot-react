package com.example.marketplace.repository;

import com.example.marketplace.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByUsername(String username);  // utile pour l'authentification
    Optional<User> findByEmail(String email);
    Optional<User> findByEmailAndPassword(String email, String password);



    

}

