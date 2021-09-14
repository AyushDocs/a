package com.alokMeds.api.Security;

import com.alokMeds.api.User.User;
import com.alokMeds.api.User.UserRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

@Component
public class DatabasePopulator implements CommandLineRunner {
    @Value("${db.admin.username}")
    private String username;
    @Value("${db.admin.password}")
    private String password;
    @Value("${db.admin.role}")
    private String role;
    @Value("${db.admin.email}")
    private String email;
    @Autowired
    private UserRepository userRepository;

    @Override
    public void run(String... args) throws Exception {
        userRepository.save(new User(username, password, role, email));
    }
}
