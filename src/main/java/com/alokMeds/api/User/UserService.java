package com.alokMeds.api.User;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserService {
  @Autowired
  private UserRepository userRepository;

  public String login(String password, String email) {
    User user = userRepository.findByEmailAndPassword(email, password);
    if(user!=null) {
      user.setLoggedIn(true);
      userRepository.save(user);
      return "SUCCESS";
    }
    return "ERROR";
  }
  public String logout(String password, String email) {
    User user = userRepository.findByEmailAndPassword(email, password);
    if(user!=null) {
      user.setLoggedIn(false);
      userRepository.save(user);
      return "SUCCESS";
    }
    return "ERROR";
  }
}