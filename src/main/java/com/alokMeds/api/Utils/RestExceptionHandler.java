package com.alokMeds.api.Utils;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.alokMeds.api.Exceptions.ClaimNotFoundException;
import com.alokMeds.api.Exceptions.CookieNotFoundException;
import com.alokMeds.api.Exceptions.UserNotFoundException;
import com.alokMeds.api.Exceptions.UserSignupFailedException;
import com.alokMeds.api.security.models.Response;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.context.request.WebRequest;

@RestControllerAdvice
public class RestExceptionHandler {
    private static final String CLAIM_MISSING_ERROR_MESSAGE = "claim not found";
    private static final String COOKIE_MISSING_ERROR_MESSAGE = "cookie not found";
    private static final String USER_SIGNUP_FAILED_ERROR_MESSAGE = "User with similar credentials exists";

    @ExceptionHandler(UserNotFoundException.class)
    public ResponseEntity<Response> userNotFoundException(UserNotFoundException e, WebRequest request,
            HttpServletResponse response, HttpServletRequest httpServletRequest) {
        return generateResponse(e.getMessage());
    }

    @ExceptionHandler(ClaimNotFoundException.class)
    public ResponseEntity<Response> claimNotFoundException(ClaimNotFoundException e, WebRequest request,
            HttpServletResponse response, HttpServletRequest httpServletRequest) {
        return generateResponse(CLAIM_MISSING_ERROR_MESSAGE);
    }

    @ExceptionHandler(UserSignupFailedException.class)
    public ResponseEntity<Response> userSignupFailedException(UserSignupFailedException e, WebRequest request,
            HttpServletResponse response, HttpServletRequest httpServletRequest) {
        return generateResponse(USER_SIGNUP_FAILED_ERROR_MESSAGE);
    }

    @ExceptionHandler(CookieNotFoundException.class)
    public ResponseEntity<Response> cookieNotFoundException(CookieNotFoundException e, WebRequest request,
            HttpServletResponse response, HttpServletRequest httpServletRequest) {
        return generateResponse(COOKIE_MISSING_ERROR_MESSAGE);
    }

    private static final ResponseEntity<Response> generateResponse(String errorMessage) {
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(Response.generateFailureResponse(errorMessage));
    }
}