package com.alokMeds.api.User;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@CrossOrigin(origins="*",allowedHeaders="*")
@RequestMapping("/api/users")
public class UserController {
    @Autowired
    private UserService userService;
    @PostMapping("/login")
    public String login(UserRecieved user){
    return userService.login(user.getPassword(), user.getEmail());
    }
    @PostMapping("/logout")
    public String logout(UserRecieved user){
    return userService.logout(user.getPassword(), user.getEmail());
    }
}
