package com.alokMeds.api.User;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.alokMeds.api.security.JwtUtil;
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
@CrossOrigin(origins="http://localhost:3000",allowedHeaders="*")
@RequestMapping("/api/users")
@AllArgsConstructor
public class UserController {
    private UserService userService;
    private JwtUtil jwtUtil;
    @PostMapping("/login")
    public ResponseEntity<Response> login(@RequestHeader("Authorization") String jwtToken,
    @RequestBody UserRecieved[] user){
    return userService.login(user[0].getEmail(),user[0].getPassword(),jwtToken);
    }
   @PostMapping("/firstLogin")
   public ResponseEntity<Response> firstLogin(@RequestBody List<UserRecieved> user){
      System.out.println(user.get(0));
   return userService.firstLogin(user.get(0).getEmail(),user.get(0).getPassword());
   }
    @PostMapping("/exists")
    public Map<String, Object> exists(@RequestHeader("Authorization") String jwtToken){
     Map<String,Object> map=new HashMap<>();
     map.put("exists",jwtUtil.isTokenExpired(jwtToken));
     return map;
    }
}