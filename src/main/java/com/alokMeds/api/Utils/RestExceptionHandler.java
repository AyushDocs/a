package com.alokMeds.api.Utils;

import com.alokMeds.api.Exceptions.ClaimNotFoundException;
import com.alokMeds.api.Exceptions.CookieNotFoundException;
import com.alokMeds.api.Exceptions.InvalidOtpException;
import com.alokMeds.api.Exceptions.UserSignupFailedException;
import com.alokMeds.api.security.models.Response;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.context.request.WebRequest;

import lombok.extern.slf4j.Slf4j;
@Slf4j
@RestControllerAdvice
public class RestExceptionHandler {
    private static final String CLAIM_MISSING_ERROR_MESSAGE = "claim not found";
    private static final String COOKIE_MISSING_ERROR_MESSAGE = "cookie not found";
    private static final String USER_SIGNUP_FAILED_ERROR_MESSAGE = "User with similar credentials exists";

    @ExceptionHandler(UsernameNotFoundException.class)
    public ResponseEntity<Response> userNotFoundException(UsernameNotFoundException e, WebRequest request) {
        return generateResponse(e.getMessage());
    }
    @ExceptionHandler(InvalidOtpException.class)
    public ResponseEntity<Response> invalidOtpException(InvalidOtpException e, WebRequest request) {
        return generateResponse(e.getMessage());
    }

    @ExceptionHandler(ClaimNotFoundException.class)
    public ResponseEntity<Response> claimNotFoundException(ClaimNotFoundException e, WebRequest request) {
        return generateResponse(CLAIM_MISSING_ERROR_MESSAGE);
    }

    @ExceptionHandler(UserSignupFailedException.class)
    public ResponseEntity<Response> userSignupFailedException(UserSignupFailedException e, WebRequest request) {
        return generateResponse(USER_SIGNUP_FAILED_ERROR_MESSAGE);
    }

    @ExceptionHandler(CookieNotFoundException.class)
    public ResponseEntity<Response> cookieNotFoundException(CookieNotFoundException e, WebRequest request) {
        return generateResponse(COOKIE_MISSING_ERROR_MESSAGE);
    }
    private static final ResponseEntity<Response> generateResponse(String errorMessage) {
        log.info(errorMessage);
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(Response.generateFailureResponse(errorMessage));
    }
}