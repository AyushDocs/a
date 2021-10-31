package com.alokMeds.api.User;

import java.io.IOException;
import java.util.List;

import javax.servlet.http.HttpServletResponse;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import lombok.AllArgsConstructor;

@RestController
@RequestMapping("/api/auth/users")

@CrossOrigin(origins={"http://localhost:3000", "http://localhost:8080","https://alokmeds.herokuapp.com/"},allowedHeaders = "*")
@AllArgsConstructor
public class UserController {
    private UserService userService;
    private UserRepository userRepository;

    @PostMapping("/admin/login")
    public ResponseEntity<?> adminLogin(@RequestBody List<UserRecieved> user,HttpServletResponse response){
        return userService.adminLogin(user.get(0).getEmail(), user.get(0).getPassword(),response);
    }
    @PostMapping("/signup")
    public void signup(@RequestBody UserRecieved user,HttpServletResponse response){
         userService.signup(user,response);
    }
    @PostMapping("/login")
    public void login(@RequestBody UserRecieved user,HttpServletResponse response) throws IOException{
         userService.login(user,response);
    }

    @PostMapping("/")
    public List<User> findAll() {
        return userRepository.findAll();
    }
}