package com.alokMeds.api.security;

import java.io.IOException;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.alokMeds.api.Exceptions.CookieNotFoundException;
import com.alokMeds.api.Exceptions.InvalidJwtException;
import com.alokMeds.api.Exceptions.NoValidRoleException;

import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.AuthenticationEntryPoint;
import org.springframework.stereotype.Component;
@Component
public class AuthenticationExceptionHandler implements AuthenticationEntryPoint {

    @Override
    public void commence(HttpServletRequest request, HttpServletResponse res,
            AuthenticationException exception) throws IOException, ServletException {
        String errorMessage = "";
        if (exception.getClass().equals(InvalidJwtException.class)) {
            System.out.println("invalid jwt");
            errorMessage = "invalid jwt";
        } else if (exception.getClass().equals(CookieNotFoundException.class)) {
            System.out.println("no cookie");
            errorMessage = "no cookie";
        } else if (exception.getClass().equals(NoValidRoleException.class)) {
            System.out.println("invalid role");
            errorMessage = "invalid role";
        } else {
            System.out.println(exception.getMessage());
            errorMessage = ("new case");
        }
        res.setStatus(403);
        String str = String.format("{"
                + "\"success\":%s,"
                + "\"errorMessage\":\"%s\""
                + "}", false, errorMessage);

        res.getWriter().write(str);
    }

}
