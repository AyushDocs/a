package com.alokMeds.api.security;

import java.util.Date;
import java.util.Map;
import java.util.function.Function;

import com.alokMeds.api.User.UserRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.JwtException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;


@Service
public class JwtUtil {
    @Autowired
    private UserRepository userRepository;
    @Value("${jwt.secret}")
    private String SECRET_KEY;
    private int timeOfExpiration = 1000 * 60 * 60 * 10;
    //private int timeOfExpiration = 1000 * 60;

    public Date extractExpiration(String token) {
        return extractClaim(token, Claims::getExpiration);
    }

    public <T> T extractClaim(String token, Function<Claims, T> claimsResolver) {
        final Claims claims = extractAllClaims(token);
        return claimsResolver.apply(claims);
    }
    private Claims extractAllClaims(String token) {
        return Jwts.parser().setSigningKey(SECRET_KEY).parseClaimsJws(token).getBody();
    }

    public boolean isTokenExpired(String token) {
        return extractExpiration(token).before(new Date());
    }

    public String generateToken(Map<String, Object> claims) {
        return createToken(claims);
    }
    public boolean hasAdminClaim(String jwt){
       return (boolean) extractClaim(jwt,i->i.get("Allow-Admin-Acess"));
    }
    private String createToken(Map<String, Object> claims) {

        return Jwts.builder().setClaims(claims).setIssuedAt(new Date(System.currentTimeMillis()))
                .setExpiration(new Date(System.currentTimeMillis() + timeOfExpiration))
                .signWith(SignatureAlgorithm.HS256, SECRET_KEY).compact();
    }

    public boolean validateToken(String token) {
        try{
           return !isTokenExpired(token);
        }
        catch(JwtException e){
        return false;
        }
    }
}