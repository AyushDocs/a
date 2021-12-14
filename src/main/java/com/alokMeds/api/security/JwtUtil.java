package com.alokMeds.api.security;

import java.util.Date;
import java.util.Map;
import java.util.Optional;
import java.util.function.Function;

import org.springframework.stereotype.Service;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import lombok.AllArgsConstructor;


@Service
@AllArgsConstructor
public class JwtUtil {
    private SecurityValues securityValues;
    public Date extractExpiration(String token) {
        return extractClaim(token, Claims::getExpiration).get();
    }

    public <T> Optional<T> extractClaim(String token, Function<Claims, T> claimsResolver) {
            final Claims claims = extractAllClaims(token);
            return Optional.ofNullable(claimsResolver.apply(claims)) ;
    }
    private Claims extractAllClaims(String token) {
        return Jwts.parser().setSigningKey(securityValues.getJwtSecret()).parseClaimsJws(token).getBody();
    }

    public boolean isTokenExpired(String token) {
        return extractExpiration(token).before(new Date());
    }

    public String generateToken(Map<String, Object> claims) {
        return createToken(claims);
    }
    private String createToken(Map<String, Object> claims) {

        return Jwts.builder().setClaims(claims).setIssuedAt(new Date(System.currentTimeMillis()))
                .setExpiration(new Date(System.currentTimeMillis()+securityValues.getCookieLife()))
                .signWith(SignatureAlgorithm.HS256, securityValues.getJwtSecret()).compact();
    }

    public boolean validateToken(String token) {
        if(token==null||token.isEmpty()||token.isBlank())return false;
        try {
             return !isTokenExpired(token);
        } catch (Exception e) {
            return false;
        }
    }
}