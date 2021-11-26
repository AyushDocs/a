package com.alokMeds.api.User;
import java.util.HashMap;
import java.util.Map;

import com.alokMeds.api.security.AuthenticationResponse;
import com.alokMeds.api.security.JwtUtil;

import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseCookie;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import lombok.AllArgsConstructor;

@Service
@AllArgsConstructor
public class UserService {
  private JwtUtil jwtUtil;
  private UserRepository userRepository;
  private static final String COOKIE_NAME="token";
  private PasswordEncoder passwordEncoder;
  private AuthenticationManager authenticationManager;

  public ResponseEntity<AuthenticationResponse> adminLogin(String email, String password) {
    AuthenticationResponse authResponse = new AuthenticationResponse();
    User user = userRepository.findByEmail(email);
    if (user == null || !passwordEncoder.matches(password, user.getPassword()))
     return ResponseEntity.ok(authResponse.setAll("Enter valid Credentials",false));
     authResponse.setSuccess(true);
     return ResponseEntity.ok().header(HttpHeaders.SET_COOKIE,addCookieInResponse(user)).body(authResponse);
  }

  public ResponseEntity<AuthenticationResponse> signup(UserRecieved userRecieved) {
    AuthenticationResponse authResponse = new AuthenticationResponse();
    User maybeSavedUser = userRepository.findByEmail(userRecieved.getEmail());
    if (maybeSavedUser != null)
     return ResponseEntity.ok(authResponse.setAll("user with similar credentials exists", false));
    User user = new User();
    user.setEmail(userRecieved.getEmail());
    user.setPassword(passwordEncoder.encode(userRecieved.getPassword()));
    userRepository.save(user);
    return ResponseEntity.ok().header(HttpHeaders.SET_COOKIE,addCookieInResponse(user)).body(authResponse.setAll(null, true));
  }

  public ResponseEntity<AuthenticationResponse> login(UserRecieved userRecieved){
   UserDetails userDetails= manageAuthentication(userRecieved.getEmail(),userRecieved.getPassword());
   String token=jwtUtil.generateToken(null);
   AuthenticationResponse authResponse = new AuthenticationResponse();
   authResponse.setAll("message", true);
  //  return ResponseEntity.status(200).header(HttpHeaders.SET_COOKIE,ResponseCookie.from(COOKIE_NAME, token)).body(authResponse);
    // AuthenticationResponse authResponse = new AuthenticationResponse();
    // User user = userRepository.findByEmail(userRecieved.getEmail());
    // if (user == null)  return ResponseEntity.ok(authResponse.setAll("Please enter correct credentials", false));
    // boolean passwordEqual = passwordEncoder.matches(userRecieved.getPassword(), user.getPassword());
    // boolean emailEqual = user.getEmail().equals(userRecieved.getEmail());
    // if (passwordEqual && emailEqual) 
    //    return ResponseEntity.ok().header(HttpHeaders.SET_COOKIE,addCookieInResponse(user)).body(authResponse.setAll("Successfully logged in user", true));
    return ResponseEntity.ok(authResponse.setAll("Please enter correct credentials", false));
  }
  private UserDetails manageAuthentication(String email, String password) {
    Authentication authentication =authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(email, password));
    return (UserDetails) authentication.getPrincipal();
  }

  public ResponseEntity<AuthenticationResponse> logout(String token) {
    AuthenticationResponse authResponse = new AuthenticationResponse();
    if (!jwtUtil.validateToken(token))
      return ResponseEntity.ok().body(authResponse.setAll("Please send token with corren credentials", false));

      return ResponseEntity.ok().header(HttpHeaders.SET_COOKIE,removeCookieFromResponse()).body(authResponse.setAll(null, true));
  }

  private String jwtWithUuid(String uuid) {
    Map<String, Object> claims = new HashMap<>();
    claims.put("id", uuid);
    return jwtUtil.generateToken(claims);
  }

  private String addCookieInResponse(User user) {
    return ResponseCookie.from(COOKIE_NAME,jwtWithUuid(user.getUuid())).maxAge(1000*60*15l)
   .path("/").httpOnly(true).build().toString();
  }
  private String removeCookieFromResponse() {
    return ResponseCookie.from(COOKIE_NAME,"")
    .maxAge(0).path("/").httpOnly(true).secure(true).build().toString();
  }
}