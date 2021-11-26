package com.alokMeds.api;

import javax.annotation.PostConstruct;

import com.alokMeds.api.User.User;
import com.alokMeds.api.User.UserRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

@Component
public class DatabaseUserInit {
    @Autowired
	private UserRepository userRepository;
    @Autowired
	private PasswordEncoder passwordEncoder;

	@Value("${admin.email}")
	private String email;

	@Value("${admin.password}")
	private String password;
	

	@PostConstruct
	public void add(){
		User u=new User();
		u.setEmail(email);
		u.setPassword(passwordEncoder.encode(password));
        u.setRoles("ADMIN,USER");
     userRepository.save(u);
	}

}
