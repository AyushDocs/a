package com.alokMeds.api.security;

import java.util.Random;
import java.util.concurrent.ExecutionException;
import java.util.concurrent.TimeUnit;

import com.alokMeds.api.Exceptions.InvalidOtpException;
import com.alokMeds.api.User.User;
import com.google.common.cache.CacheBuilder;
import com.google.common.cache.CacheLoader;
import com.google.common.cache.LoadingCache;

import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;

@Service
@AllArgsConstructor
@NoArgsConstructor
public class OtpService {
  private static final LoadingCache<String, Integer> otpCache = generateOtpCache();
  private static final LoadingCache<String, User> userCache = generateUserCache();
  private static final int EXPIRE_MINS = 5;
  private static final Random random = new Random();
  private JavaMailSender javaMailSender;

  private static LoadingCache<String, Integer> generateOtpCache() {
    return CacheBuilder.newBuilder().expireAfterWrite(EXPIRE_MINS, TimeUnit.MINUTES)
        .build(new CacheLoader<String, Integer>() {
          public Integer load(String email) {
            return 0;
          }
        });
  }

  private static LoadingCache<String, User> generateUserCache() {
    return CacheBuilder.newBuilder().expireAfterWrite(EXPIRE_MINS, TimeUnit.MINUTES)
        .build(new CacheLoader<String, User>() {
          public User load(String email) {
            return null;
          }
        });
  }

  public void sendOtpToUser(User user) {
    int otp = 100000 + random.nextInt(900000);
    otpCache.put(user.getEmail(), otp);
    userCache.put(user.getEmail(), user);
    System.out.println(String.format("sent email to %s and his otp is %d", user.getEmail(), otp));
    sendMessage(user.getEmail(), "subject", "Your otp is " + otp);
  }

  public User findUserWithCorrectOtp(String email, int otp) {
    if (otp < 0)
      throw new InvalidOtpException();
    int serverOtp = getOtpFromCache(email);
    if (serverOtp < 0)
      throw new InvalidOtpException();
    if (otp != serverOtp)
      throw new InvalidOtpException();
    User user = getUserFromCache(email);
    if (user == null)
      throw new RuntimeException();
    otpCache.invalidate(email);
    userCache.invalidate(email);
    return user;
  }

  public void refresh(String email) {
    otpCache.refresh(email);
  }

  private int getOtpFromCache(String email) {
    try {
      return otpCache.get(email);
    } catch (ExecutionException e) {
      e.printStackTrace();
      throw new IllegalStateException(e.getMessage());
    }
  }
  private User getUserFromCache(String email) {
    try {
      return userCache.get(email);
    } catch (ExecutionException e) {
      e.printStackTrace();
      throw new IllegalStateException(e.getMessage());
    }
  }

  private void sendMessage(String to, String subject, String message) {
    SimpleMailMessage simpleMailMessage = new SimpleMailMessage();
    simpleMailMessage.setTo(to);
    simpleMailMessage.setSubject(subject);
    simpleMailMessage.setText(message);
    // javaMailSender.send(simpleMailMessage);
  }
}