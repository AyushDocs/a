package com.alokMeds.api;

import java.nio.charset.StandardCharsets;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;

import javax.annotation.PostConstruct;

import com.alokMeds.api.User.User;
import com.alokMeds.api.User.UserRepository;

import org.springframework.batch.core.configuration.annotation.EnableBatchProcessing;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
@EnableBatchProcessing
public class AlokMedsApplication {
	@Autowired
	private UserRepository userRepository;

	@Value("${admin.email}")
	private String email;

	@Value("${admin.password}")
	private String password;
	
	public static void main(String[] args) {
		SpringApplication.run(AlokMedsApplication.class, args);
	}	
	@PostConstruct
	public void add() throws NoSuchAlgorithmException{
     userRepository.save(new User(email,hash(password)));
	}

	public static String hash(String input) throws NoSuchAlgorithmException{
        return new String(MessageDigest.getInstance("SHA-256")
		.digest(input.getBytes(StandardCharsets.UTF_8))); 
	}
}
