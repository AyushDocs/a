package com.alokMeds.api.User;

import javax.annotation.security.RolesAllowed;

import com.alokMeds.api.Publications.Publications;
import com.alokMeds.api.Utils.Roles;
import com.alokMeds.api.security.models.AuthenticationRequest;
import com.alokMeds.api.security.models.OtpRequest;

import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import lombok.AllArgsConstructor;

@RestController
@CrossOrigin(origins ="http://localhost:3000",allowedHeaders="*",allowCredentials = "true")
@RequestMapping("/api")
@AllArgsConstructor
public class UserController {
    private UserService userService;

    @PostMapping("/auth/signup")
    public ResponseEntity<?> signup(@RequestBody OtpRequest request) {
        return userService.signup(request.getEmail(),request.getOtp());
    }
    @PostMapping("/auth/otp")
    public void sendOtp(@RequestBody AuthenticationRequest request) {
        String email=request.getEmail();
        String password=request.getPassword();
        userService.sendOtp(email,password);
    }

    @PostMapping("/auth/login")
    public ResponseEntity<?> login(@RequestBody AuthenticationRequest request) {
        return userService.login(request.getEmail(),request.getPassword());
    }
    @PostMapping("/auth/logout/")
    public ResponseEntity<?> logout() {
        return userService.logout();
    }
    @GetMapping("/public/users/")
    public ResponseEntity<Page<Publications>> findAll() {
      return  userService.getPublicationsForFirstPage();
    }
    @RolesAllowed(Roles.USER)
    @PostMapping("/addUserPubblication/{link}")
    public ResponseEntity<Void> addUserPubblication(@PathVariable String link) {
      return  userService.addUserPubblication(link);
    }
}