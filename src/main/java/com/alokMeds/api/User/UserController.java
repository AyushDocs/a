package com.alokMeds.api.User;

import java.util.List;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import lombok.AllArgsConstructor;

@RestController
@AllArgsConstructor
@CrossOrigin
@RequestMapping("/api/user")
public class UserController {
	private UserRepository userRepository;
	@GetMapping("/")
	public List<User> findAll() {
    return userRepository.findAll();
	}
	@GetMapping("/email/{email}")
	public User findByEmail(@PathVariable String email) {
    return userRepository.findByEmail(email);
	}
	@PostMapping("/")
    public void save(@RequestBody User user) {
    	userRepository.save(user);
    }
	@GetMapping("/exists/{email}")
    public boolean existsById(@PathVariable String email) {
    	return userRepository.existsById(email);
    }
}
