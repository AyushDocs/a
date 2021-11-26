package com.alokMeds.api.User;

import java.util.List;

import com.alokMeds.api.security.AuthenticationResponse;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CookieValue;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import lombok.AllArgsConstructor;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins={"http://localhost:3000", "http://localhost:8080","https://alokmeds.herokuapp.com/","http://127.0.0.1:3000/"},allowedHeaders = "*",allowCredentials ="true")
@AllArgsConstructor
public class UserController {
    private UserService userService;
    private UserRepository userRepository;

    @PostMapping("/users/admin/login")
     public ResponseEntity<AuthenticationResponse> adminLogin(@RequestBody List<UserRecieved> user){
        return userService.adminLogin(user.get(0).getEmail(), user.get(0).getPassword());
    }
    @PostMapping("/users/signup")
    public ResponseEntity<AuthenticationResponse> signup(@RequestBody UserRecieved user){
       return userService.signup(user);
    }
    @PostMapping("/users/login")
     public ResponseEntity<AuthenticationResponse> login(@RequestBody UserRecieved user){   
        return userService.login(user);
    }
    @PostMapping("/auth/user/users/logout")
    // @Secured({"USER","ADMIN","ROOT"})
      public ResponseEntity<AuthenticationResponse> logout(@CookieValue("token") String token){   
        return userService.logout(token);
    }
   @GetMapping("/auth/root/users/")
    public List<User> findAll() {
        return userRepository.findAll();
    }

}