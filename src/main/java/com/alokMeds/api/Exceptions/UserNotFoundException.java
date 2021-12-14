package com.alokMeds.api.Exceptions;

public class UserNotFoundException extends RuntimeException {

    public UserNotFoundException(String string) {
        super(string);
    }
}
