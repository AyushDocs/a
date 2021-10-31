package com.alokMeds.api.User;

import static com.alokMeds.api.AlokMedsApplication.hash;

import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletResponse;

import com.alokMeds.api.security.ErrorResponse;
import com.alokMeds.api.security.JwtUtil;

import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import lombok.AllArgsConstructor;

@Service
@AllArgsConstructor
public class UserService {
  private JwtUtil jwtUtil;
  private UserRepository userRepository;

  public ResponseEntity<?> adminLogin(String email, String password, HttpServletResponse response) {
    User u = userRepository.findByEmail(email);
    if (u == null || !u.getPassword().equals(hash(password)))
      return ResponseEntity.status(403).body(new ErrorResponse("Enter valid Credentials"));

    // normal case
    addCookieInResponse(response, u);
    return ResponseEntity.ok().build();
  }

  private String jwtWithUuid(String uuid) {
    Map<String, Object> claims = new HashMap<>();
    claims.put("id", uuid);
    return jwtUtil.generateToken(claims);
  }

  public void signup(UserRecieved userRecieved, HttpServletResponse response) {
     User user=new User();
     user.setEmail(userRecieved.getEmail());
     user.setPassword(userRecieved.getPassword());
     user.setUsername(userRecieved.getUsername());
     User saved=userRepository.save(user);
     addCookieInResponse(response, saved);
  }

  public void login(UserRecieved userRecieved, HttpServletResponse response) throws IOException {
     User user=userRepository.findByEmail(userRecieved.getEmail());
     boolean passwordEqual=user.getPassword().equals(hash(userRecieved.getPassword()));
     boolean nameEqual=user.getUsername().equals(userRecieved.getUsername());
    if(nameEqual || passwordEqual) {
      addCookieInResponse(response, user);
      return;
    }
    response.sendError(403);
  }
  private void addCookieInResponse(HttpServletResponse response,User user){
    Cookie cookie = new Cookie("token", jwtWithUuid(user.getUuid()));
    cookie.setHttpOnly(true);
    cookie.setMaxAge(15 * 60 * 60);
    response.addCookie(cookie);
  }
}