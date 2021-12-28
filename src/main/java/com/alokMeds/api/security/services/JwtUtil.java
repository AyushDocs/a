package com.alokMeds.api.security.services;

import java.util.Date;

import com.alokMeds.api.security.SecurityValues;
import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.interfaces.Claim;
import com.auth0.jwt.interfaces.DecodedJWT;
import com.auth0.jwt.interfaces.JWTVerifier;

import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;


@Service
public class JwtUtil {
    private final Algorithm algorithm;
    private final JWTVerifier verifier;
    public JwtUtil(SecurityValues securityValues) {
        this.algorithm = Algorithm.HMAC256(securityValues.getJwtSecret());
        this.verifier = JWT.require(Algorithm.HMAC256(securityValues.getJwtSecret())).withIssuer("auth0").build();
        // this.verifier = JWT.require(Algorithm.HMAC256(securityValues.getJwtSecret())).withIssuer("auth0").build();
    }

    public String extractEmail(String token) {
        return getClaimFromToken(token,"email").asString();
    }

    public <T> Claim getClaimFromToken(String token,String claim) {
        return getDecodedJwt(token).getClaim(claim);
    }
    // check if the token has expired
    public Boolean isTokenExpired(String token) {
        return getDecodedJwt(token).getExpiresAt().before(new Date());
    }

    // generate token for user
    public String generateToken(String subject) {
        return JWT.create().withSubject(subject).withIssuer("auth0").sign(algorithm);
    }
    // validate token
    public boolean validateToken(String token, UserDetails userDetails) {
       return getDecodedJwt(token).getSubject().equals(userDetails.getUsername());
    }
    private DecodedJWT getDecodedJwt(String token){
        return JWT.decode(token);
    }
}