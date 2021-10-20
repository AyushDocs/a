package com.alokMeds.api.User;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends JpaRepository<User,String>{

    boolean existsByEmailAndPassword(String email, String password);

    Optional<User> findByEmail(String email);
    
}
