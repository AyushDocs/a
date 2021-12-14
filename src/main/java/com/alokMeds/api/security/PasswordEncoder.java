package com.alokMeds.api.security;

import java.math.BigInteger;
import java.nio.charset.StandardCharsets;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.util.Arrays;

import org.springframework.stereotype.Service;

import lombok.AllArgsConstructor;

@Service
@AllArgsConstructor
public class PasswordEncoder {
    private SecurityValues securityValues;
    private static final String ALL_CHARACTERS = "QWERTYUIOPASDFGHJKLXCVBNM" + "1234567890"
    + "qwertyuiopasdfghjklzxcvbnm";

    public String encode(String password, String salt) {
        return hash(password, salt,0);
    }

    private String hash(String password, String salt,int currentRound) {
        MessageDigest md;
        
        String toHash = password + salt + securityValues.getPepper();
        try {
            md = MessageDigest.getInstance("SHA-256");
            byte[] bytes = md.digest(toHash.getBytes(StandardCharsets.UTF_8));
            BigInteger x = new BigInteger(1, bytes);
            StringBuilder hexString = new StringBuilder(x.toString(16));
            while (hexString.length() < 32) hexString.insert(0, '0');
            if(currentRound!=securityValues.getRounds())return hash(hexString.toString(),salt,++currentRound);
            return hexString.toString();
        } catch (NoSuchAlgorithmException e) {
            e.printStackTrace();
            return toHash;
        }
    }

    public boolean matches(String rawPassword, String hashedPassword, String salt) {
        return hashedPassword.equals(encode(rawPassword, salt));
    }
    public static final String generateSalt(){
        return Arrays.stream(ALL_CHARACTERS.split(""))
        .reduce((i, j) -> i + ALL_CHARACTERS.charAt((int) (ALL_CHARACTERS.length() * Math.random()))).get();
    }
}
