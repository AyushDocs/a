package com.alokMeds.api.User;

import java.util.List;

import com.alokMeds.api.Exceptions.UserSignupFailedException;
import com.alokMeds.api.Publications.PublicationRepo;
import com.alokMeds.api.Publications.Publications;
import com.alokMeds.api.security.SecurityValues;
import com.alokMeds.api.security.models.AuthenticationResponse;
import com.alokMeds.api.security.models.Response;
import com.alokMeds.api.security.services.JwtUtil;
import com.alokMeds.api.security.services.OtpService;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseCookie;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Service
@AllArgsConstructor
@Slf4j
public class UserService {
  private JwtUtil jwtUtil;
  private UserRepository userRepository;
  private PublicationRepo publicationRepository;
  private PasswordEncoder passwordEncoder;
  private SecurityValues securityValues;
  private OtpService otpService;
  private AuthenticationManager authenticationManager;
  private static final String USER_SIGNUP_ERROR_MESSAGE = "User with email %s already exists";

  public void sendOtp(String email, String password) {
    if (userRepository.existsByEmail(email))
      throw new UserSignupFailedException(String.format(USER_SIGNUP_ERROR_MESSAGE, email));
    otpService.sendOtpToUser(new User(email,passwordEncoder.encode(password)));
  }

  public ResponseEntity<?> signup(String email, int otp) {
    User user =otpService.findUserWithCorrectOtp(email, otp);
    userRepository.save(user);
    log.info("user saved with email: " + user.getEmail());
    return login(email,user.getPassword());
  }
  public ResponseEntity<?> login(String email,String password) {
    Authentication authentication = authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(email, password));
    User user=(User)authentication.getPrincipal();
    log.info("user logged in with email: " + user.getEmail()+"and has authorities"+user.getAuthorities());
     return ResponseEntity.ok().header(HttpHeaders.SET_COOKIE, createCookieWithEmail(email))
        .body(user.getAuthorities().contains(new SimpleGrantedAuthority("ADMIN"))
            ? AuthenticationResponse.ADMIN_SUCCESS_RESPONSE
            : AuthenticationResponse.USER_SUCCESS_RESPONSE);
  }
  
  public ResponseEntity<?> logout() {
      return ResponseEntity.ok().header(HttpHeaders.SET_COOKIE, createCookieForEmailWithAge(null, 0))
        .body(Response.SUCCESS_RESPONSE);    
  }

  private String createCookieWithEmail(String email) {
    String cookie=createCookieForEmailWithAge(email, securityValues.getCookieLife());
    System.out.println(cookie);
    return cookie;
  }

  private String createCookieForEmailWithAge(String email, long age) {
    return ResponseCookie.from(securityValues.getCookieName(), jwtUtil.generateToken(email)).maxAge(age)
        .httpOnly(true).build().toString();
  }

  public ResponseEntity<List<User>> getAll() {
    try {
      List<User> items = userRepository.findAll();
      return ResponseEntity.ok(items);
    } catch (Exception e) {
      return ResponseEntity.internalServerError().body(null);
    }
  }

  public ResponseEntity<Void> addUserPubblication(String link) {
    try {
      User u =(User)SecurityContextHolder.getContext().getAuthentication().getPrincipal();
      u.pushPublications(publicationRepository.findByLink(link));
      userRepository.save(u);
      return ResponseEntity.ok().build();
    } catch (Exception e) {
      e.printStackTrace();
      return ResponseEntity.internalServerError().build();
    }
  }

  public ResponseEntity<Page<Publications>> getPublicationsForFirstPage() {
    try {
      Authentication authentication =SecurityContextHolder.getContext().getAuthentication();
      if (authentication==null)
        return ResponseEntity.ok(publicationRepository.findSomePublications());
      User u=(User)authentication.getPrincipal();
      if (u.getFirstPublication() == null)
        return ResponseEntity.ok(publicationRepository.findSomePublications());
      return ResponseEntity.ok(new PageImpl<Publications>(u.findPublications()));
    }
    // } catch (ExpiredJwtException e) {

    //   return ResponseEntity.ok(publicationRepository.findSomePublications());
    // }
     catch (Exception e) {
      e.printStackTrace();
      return ResponseEntity.internalServerError().body(null);
    }
  }
}
