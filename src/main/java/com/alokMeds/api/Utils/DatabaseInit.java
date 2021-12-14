package com.alokMeds.api.Utils;

import java.util.stream.IntStream;

import javax.annotation.PostConstruct;

import com.alokMeds.api.Publications.PublicationRepo;
import com.alokMeds.api.Publications.Publications;
import com.alokMeds.api.User.User;
import com.alokMeds.api.User.UserRepository;
import com.alokMeds.api.security.PasswordEncoder;

import org.springframework.context.annotation.Configuration;

import lombok.AllArgsConstructor;
@Configuration
@AllArgsConstructor
public class DatabaseInit {
    private PublicationRepo publicationRepo;
    private UserRepository userRepository;
	private PasswordEncoder passwordEncoder;
	
    @PostConstruct
    public void save() {
        IntStream.range(0, 10)
        .forEach(i->publicationRepo.save(new Publications("Name"+i,"link"+i,"authour"+i,"imgUrl"+i,"desc"+i)));
        User u = new User();
		u.setEmail("a@g.com");
		u.setPassword(passwordEncoder.encode("123", u.getSalt()));
		u.setRoles("ADMIN,USER");
		userRepository.save(u);
    }
}
