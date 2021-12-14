package com.alokMeds.api.security.filters;

import java.io.IOException;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.alokMeds.api.Exceptions.CookieNotFoundException;
import com.alokMeds.api.Exceptions.InvalidJwtException;
import com.alokMeds.api.Exceptions.NoValidRoleException;

import org.codehaus.jettison.json.JSONException;
import org.codehaus.jettison.json.JSONObject;
import org.springframework.core.annotation.Order;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

@Component
@Order(0)
public class ExceptionHandlerFilter extends OncePerRequestFilter {

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
            throws ServletException, IOException {
        try {
            filterChain.doFilter(request, response);
        } catch (Exception e) {
            try {handleExceptions(e, request, response);} 
            catch (Exception f) {f.printStackTrace();}
        }
    }
    private void handleExceptions(Exception e,HttpServletRequest request,HttpServletResponse response) throws JSONException, IOException{
        JSONObject obj = new JSONObject();
        obj.put("success", false);

        if (e.getClass().equals(InvalidJwtException.class)) {
            System.out.println("invalid jwt");
            obj.put("errorMessage", "invalid jwt");
        }
        else if (e.getClass().equals(CookieNotFoundException.class)) {
            System.out.println("no cookie");
            obj.put("errorMessage", "no cookies");
        }
        else if (e.getClass().equals(NoValidRoleException.class)) {
            System.out.println("invalid role");
            obj.put("errorMessage", "no valid role");
        }
       response.sendError(403,obj.toString());
    }

}
