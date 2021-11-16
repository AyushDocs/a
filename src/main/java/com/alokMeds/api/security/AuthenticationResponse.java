package com.alokMeds.api.security;

import lombok.Data;

@Data
public class AuthenticationResponse {
    private boolean success;
    private String errorMessage;
    public AuthenticationResponse setAll(String message,boolean success){
    this.success = success;
    this.errorMessage = message;
    return this;
    }
}
