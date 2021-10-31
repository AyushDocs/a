package com.alokMeds.api.security;

import lombok.Data;

@Data
public class ErrorResponse{
    private boolean hasError=true;
    private String message;
    public ErrorResponse(String message) {
    this.message = message;
    }
}
