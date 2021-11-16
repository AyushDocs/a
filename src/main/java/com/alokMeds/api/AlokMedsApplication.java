package com.alokMeds.api;

import java.nio.charset.StandardCharsets;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableScheduling;

@SpringBootApplication
@EnableScheduling
public class AlokMedsApplication {
	public static void main(String[] args) {
		SpringApplication.run(AlokMedsApplication.class, args);
	}	
	public static String hash(String input){
        try {
		return new String(MessageDigest.getInstance("SHA-256")
		                 .digest(input.getBytes(StandardCharsets.UTF_8)));
		}
		 catch (NoSuchAlgorithmException e) {
			throw new RuntimeException("algorithim not know");
		 } 
	}
}
