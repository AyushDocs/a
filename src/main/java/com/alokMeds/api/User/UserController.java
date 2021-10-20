package com.alokMeds.api.User;

import java.security.NoSuchAlgorithmException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.alokMeds.api.security.Response;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import lombok.AllArgsConstructor;

@RestController
@RequestMapping("/api/users")

@CrossOrigin(origins={"http://localhost:3000", "http://localhost:8080","https://alokmeds.herokuapp.com/"},allowedHeaders = "*")
@AllArgsConstructor
public class UserController {
    private UserService userService;
    private UserRepository userRepository;

    @PostMapping("/login")
    public ResponseEntity<Response> login(@RequestBody List<UserRecieved> user,
    @RequestHeader("Authorization") String jwt) throws NoSuchAlgorithmException {
        return userService.login(jwt,user.get(0).getEmail(), user.get(0).getPassword());
    }

    @PostMapping("/exists")
    public Map<String, Object> exists(@RequestHeader("Authorization") String jwtToken){
        Map<String,Object> map=new HashMap<>();
        map.put("exists",userService.exists(jwtToken));
        return map;
    }

    @PostMapping("/")
    public List<User> findAll() {
        return userRepository.findAll();
    }
}