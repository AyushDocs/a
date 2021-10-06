package com.alokMeds.api;

import javax.annotation.PostConstruct;

import com.alokMeds.api.User.User;
import com.alokMeds.api.User.UserRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class AlokMedsApplication {
	public static void main(String[] args) {
		SpringApplication.run(AlokMedsApplication.class, args);
	}
	@Autowired private UserRepository userRepository;
        @Value("${db.admin.password}") String password;
        @Value("${db.admin.email}") String email;
	@PostConstruct
	public void add(){
     userRepository.save(new User(email,password));
	}
}
