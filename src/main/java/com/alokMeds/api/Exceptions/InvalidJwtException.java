package com.alokMeds.api.Exceptions;

import lombok.NoArgsConstructor;

@NoArgsConstructor()
public class InvalidJwtException extends RuntimeException {
    public InvalidJwtException(String s) {
        super(s);
    }
}
