package com.alokMeds.api.security;


import java.io.Serializable;
import java.util.Date;

import lombok.Data;
@Data
public class AuthenticationResponse implements Serializable,Response {

    private final String jwt;
    private Date timeOfExpiration;
    public AuthenticationResponse(String jwt,Date timeOfExpiration) {
        this.jwt = jwt;
        this.timeOfExpiration=timeOfExpiration;
    }

}