package com.alokMeds.api;

import static com.alokMeds.api.AlokMedsApplication.hash;

import javax.annotation.PostConstruct;

import com.alokMeds.api.User.User;
import com.alokMeds.api.User.UserRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

@Component

public class DatabaseUserInit {
    @Autowired
	private UserRepository userRepository;

	@Value("${admin.email}")
	private String email;

	@Value("${admin.password}")
	private String password;
	

	@PostConstruct
	public void add(){
		User u=new User();
		u.setEmail(email);
		u.setPassword(hash(password));
        u.setRoles("ADMIN,USER");
		u.setUsername("i am admin");
     userRepository.save(u);
	}

}
