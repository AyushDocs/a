package com.alokMeds.api.User;

import static com.alokMeds.api.AlokMedsApplication.hash;

import java.util.HashMap;
import java.util.Map;

import com.alokMeds.api.security.AuthenticationResponse;
import com.alokMeds.api.security.JwtUtil;

import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseCookie;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import lombok.AllArgsConstructor;

@Service
@AllArgsConstructor
public class UserService {
  private JwtUtil jwtUtil;
  private UserRepository userRepository;
  private static final String COOKIE_NAME="token";

  public ResponseEntity<AuthenticationResponse> adminLogin(String email, String password) {
    AuthenticationResponse authResponse = new AuthenticationResponse();
    User user = userRepository.findByEmail(email);
    if (user == null || !user.getPassword().equals(hash(password)))
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
    user.setPassword(hash(userRecieved.getPassword()));
    userRepository.save(user);
    return ResponseEntity.ok().header(HttpHeaders.SET_COOKIE,addCookieInResponse(user)).body(authResponse.setAll(null, true));
  }

  public ResponseEntity<AuthenticationResponse> login(UserRecieved userRecieved){
    AuthenticationResponse authResponse = new AuthenticationResponse();
    User user = userRepository.findByEmail(userRecieved.getEmail());
    if (user == null) {
      System.out.println(user);
      return ResponseEntity.ok(authResponse.setAll("Please enter correct credentials", false));
}
    boolean passwordEqual = user.getPassword().equals(hash(userRecieved.getPassword()));
    boolean emailEqual = user.getEmail().equals(userRecieved.getEmail());
    if (passwordEqual && emailEqual) 
       return ResponseEntity.ok().header(HttpHeaders.SET_COOKIE,addCookieInResponse(user)).body(authResponse.setAll("Successfully logged in user", true));
    return ResponseEntity.ok(authResponse.setAll("Please enter correct credentials", false));
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
   .path("/").httpOnly(true).secure(true).build().toString();
  }
  private String removeCookieFromResponse() {
    return ResponseCookie.from(COOKIE_NAME,"")
    .maxAge(0).path("/").httpOnly(true).secure(true).build().toString();
  }
}