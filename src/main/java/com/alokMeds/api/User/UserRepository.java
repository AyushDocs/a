package com.alokMeds.api.User;

import java.util.Optional;

import org.springframework.data.repository.PagingAndSortingRepository;
public interface UserRepository extends PagingAndSortingRepository<User,String> {
    User findByEmailAndPassword(String email, String password);
    Optional<User> findByEmail(String email);
    boolean existsByEmailAndPassword(String email, String password);
    
}
