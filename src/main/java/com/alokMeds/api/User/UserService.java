package com.alokMeds.api.User;

import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

import com.alokMeds.api.security.AuthenticationResponse;
import com.alokMeds.api.security.ErrorResponse;
import com.alokMeds.api.security.JwtUtil;
import com.alokMeds.api.security.Response;

import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import lombok.AllArgsConstructor;

@Service
@AllArgsConstructor
public class UserService {
  private JwtUtil jwtUtil;
  private UserRepository userRepository;

  public ResponseEntity<Response> login(String email, String password,String jwt) {
    if(!exists(email, password)) return ResponseEntity.badRequest().build();
    if(jwtUtil.isTokenExpired(jwt)) return ResponseEntity.ok(jwtWithAdminAcess(email));
    return ResponseEntity.badRequest().build();
  }

  public ResponseEntity<Response> firstLogin(String email, String password){
    if(!exists(email, password)){
      return ResponseEntity.of(Optional.of(new ErrorResponse(true)));
    }
    return ResponseEntity.ok(jwtWithAdminAcess(email));
  }
  private Response jwtWithAdminAcess(String email){
    Map<String, Object> claims = new HashMap<>();
    claims.put("Allow-Admin-Acess",true);
    claims.put("email",email);
    String jwtString = jwtUtil.generateToken(claims);
    Date timeOfExpiration=jwtUtil.extractExpiration(jwtString);
    return new AuthenticationResponse(jwtString,timeOfExpiration);
  }
  private boolean exists(String email, String password){
    return userRepository.existsByEmailAndPassword(email, password);
  }
}