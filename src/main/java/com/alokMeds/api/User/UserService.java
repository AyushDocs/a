package com.alokMeds.api.User;

import static com.alokMeds.api.AlokMedsApplication.hash;

import java.security.NoSuchAlgorithmException;
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

import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.MalformedJwtException;
import lombok.AllArgsConstructor;

@Service
@AllArgsConstructor
public class UserService {
  private JwtUtil jwtUtil;
  private UserRepository userRepository;

  public ResponseEntity<Response> login(String jwt, String email, String password) throws NoSuchAlgorithmException {

    if (!exists(email, hash(password))) {
      return ResponseEntity.of(Optional.of(new ErrorResponse(true, "wrong credentials")));
    }
    try {
      if (jwt.equals("") || jwtUtil.extractExpiration(jwt).after(new Date())) {
        return ResponseEntity.ok(jwtWithAdminAcess(email));
      }
    } catch (MalformedJwtException j) {
      return ResponseEntity.of(Optional.of(new ErrorResponse(true, "no jwt")));
    }
    catch (ExpiredJwtException j) {
      return ResponseEntity.of(Optional.of(jwtWithAdminAcess(email)));
    }
     return ResponseEntity.badRequest().build();
  }

  private Response jwtWithAdminAcess(String email) {
    Map<String, Object> claims = new HashMap<>();
    claims.put("Allow-Admin-Acess", true);
    claims.put("email", email);
    String jwtString = jwtUtil.generateToken(claims);
    Date timeOfExpiration = jwtUtil.extractExpiration(jwtString);
    return new AuthenticationResponse(jwtString, timeOfExpiration);
  }

  public boolean exists(String jwt) {
    try {
      if (jwtUtil.isTokenExpired(jwt)) return false;
      return jwtUtil.hasAdminClaim(jwt);
    } catch (Exception e) {
      return false;
    }
  }

  private boolean exists(String email, String password) {
    return userRepository.existsByEmailAndPassword(email, password);
  }
}