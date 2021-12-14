package com.alokMeds.api.User;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import com.alokMeds.api.Exceptions.ClaimNotFoundException;
import com.alokMeds.api.Exceptions.UserNotFoundException;
import com.alokMeds.api.Exceptions.UserSignupFailedException;
import com.alokMeds.api.Publications.PublicationRepo;
import com.alokMeds.api.Publications.Publications;
import com.alokMeds.api.security.JwtUtil;
import com.alokMeds.api.security.OtpService;
import com.alokMeds.api.security.PasswordEncoder;
import com.alokMeds.api.security.SecurityValues;
import com.alokMeds.api.security.models.AuthenticationRequest;
import com.alokMeds.api.security.models.AuthenticationResponse;
import com.alokMeds.api.security.models.Response;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseCookie;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import io.jsonwebtoken.ExpiredJwtException;
import lombok.AllArgsConstructor;

@Service
@AllArgsConstructor
public class UserService {
  private JwtUtil jwtUtil;
  private UserRepository userRepository;
  private PublicationRepo publicationRepository;
  private PasswordEncoder passwordEncoder;
  private SecurityValues securityValues;
  private OtpService otpService;
  private static final String OTP_JWT_EMAIL = "email";
  private static final String NO_USER_ERROR_MESSAGE = "user not found with %s %s";
  private static final String USER_SIGNUP_ERROR_MESSAGE = "User with email %s already exists";
  private static final String LOGIN_ERROR_MESSAGE = "Please enter correct credentials";

  public void sendOtp(String email, String password) {
    if (userRepository.existsByEmail(email))
      throw new UserSignupFailedException(String.format(USER_SIGNUP_ERROR_MESSAGE, email));
    User user=new User();
    user.setEmail(email);
    user.setPassword(passwordEncoder.encode(password, user.getSalt()));
    otpService.sendOtpToUser(user);
  }
  public ResponseEntity<?> signup(String email,int otp) {
    User user=otpService.findUserWithCorrectOtp(email, otp);
    userRepository.save(user);
    return ResponseEntity.ok().header(HttpHeaders.SET_COOKIE, createCookie(user.getUuid()))
        .body(AuthenticationResponse.USER_SUCCESS_RESPONSE);
  }

  public ResponseEntity<?> login(AuthenticationRequest request) {
    User user = userRepository.findByEmail(request.getEmail())
        .orElseThrow(() -> new UserNotFoundException(String.format(NO_USER_ERROR_MESSAGE,OTP_JWT_EMAIL, request.getEmail())));
    if (!passwordEncoder.matches(request.getPassword(), user.getPassword(), user.getSalt())
        || !user.getEmail().equals(request.getEmail()))
      return ResponseEntity.ok(Response.generateFailureResponse(LOGIN_ERROR_MESSAGE));
    if (user.getRoles().contains("ADMIN")) return ResponseEntity
        .ok()
        .header(HttpHeaders.SET_COOKIE, createCookie(user.getUuid()))
        .body(AuthenticationResponse.ADMIN_SUCCESS_RESPONSE);
      return ResponseEntity.ok()
             .header(HttpHeaders.SET_COOKIE, createCookie(user.getUuid()))
             .body(AuthenticationResponse.USER_SUCCESS_RESPONSE);
  }
  public String generateOtpResponse(String email,String  password){
    return jwtUtil.generateToken(Map.of(OTP_JWT_EMAIL,email,"password",password));
  }
  public ResponseEntity<?> logout() {
    return ResponseEntity.ok().header(HttpHeaders.SET_COOKIE, createCookie(null, 0))
        .body(Response.SUCCESS_RESPONSE);
  }

  private String jwtWithUuid(String id) {
    Map<String,Object> m=new HashMap<>();
    m.put("id",id);
    return jwtUtil.generateToken(m);
  }

  private String createCookie(String uuid) {
    return createCookie(uuid, securityValues.getCookieLife());
  }

  private String createCookie(String uuid, long age) {
    return ResponseCookie.from(securityValues.getCookieName(), jwtWithUuid(uuid)).maxAge(age)
        .httpOnly(true).build().toString();
  }

  public ResponseEntity<List<User>> getAll() {
    try {
      List<User> items = userRepository.findAll();
      if (items.isEmpty()) return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
      return ResponseEntity.ok(items);
    } catch (Exception e) {
      return ResponseEntity.internalServerError().body(null);
    }
  }
  public ResponseEntity<Void> addUserPubblication(String token,String link) {
    try {
      String uuid=(String)jwtUtil.extractClaim(token, i->i.get("id")).orElseThrow(ClaimNotFoundException::new);
      User u=userRepository.findByUuid(uuid).orElseThrow(()->new UserNotFoundException(String.format(NO_USER_ERROR_MESSAGE,"uuid",uuid)));
      u.pushPublications(publicationRepository.findByLink(link));     
      userRepository.save(u); 
      return ResponseEntity.ok().build();
    } catch (Exception e) {
      e.printStackTrace();
      return ResponseEntity.internalServerError().build();
    }
  }

  public ResponseEntity<Page<Publications>> getPublicationsForFirstPage(String token) {
    try {
      if(token==null)return ResponseEntity.ok(publicationRepository.findSomePublications());
      Optional<Object> uuidOptional=jwtUtil.extractClaim(token, i->i.get("id"));
      if(!uuidOptional.isPresent())return ResponseEntity.ok(publicationRepository.findSomePublications());
      String uuid=(String) uuidOptional.get();
      Optional<User> userOptional=userRepository.findByUuid(uuid);
      if(!userOptional.isPresent())return ResponseEntity.ok(publicationRepository.findSomePublications());
      User u=userOptional.get();
      if(u.getFirstPublication()==null) return ResponseEntity.ok(publicationRepository.findSomePublications());
      return ResponseEntity.ok(new PageImpl<Publications>(u.findPublications()));
    } catch (ExpiredJwtException e) {
      return ResponseEntity.ok(publicationRepository.findSomePublications());
    } catch (Exception e) {
      e.printStackTrace();
      return ResponseEntity.internalServerError().body(null);
    }
  }
}
