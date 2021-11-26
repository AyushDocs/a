package com.alokMeds.api.security.filters;

import java.io.IOException;
import java.util.Arrays;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.alokMeds.api.security.JwtUtil;

import org.codehaus.jettison.json.JSONException;
import org.codehaus.jettison.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;
@Component
public class JwtFilter extends OncePerRequestFilter {
    @Autowired
    private JwtUtil jwtUtil;
    @Override
    protected void doFilterInternal(HttpServletRequest req, HttpServletResponse res, FilterChain filterChain)
            throws ServletException, IOException { 
        if(req.getCookies()==null){
            errorOut(res);
            System.out.println("no cookies");
            return;
        }
        String token = Arrays.stream(req.getCookies()).filter(i -> i.getName().equals("token")).toList().get(0).getValue();
        if (!jwtUtil.validateToken(token)) errorOut(res);
        req.setAttribute("token", token);
        filterChain.doFilter(req, res);
    }
    private void errorOut(HttpServletResponse res) throws IOException {
        try {
            JSONObject obj = new JSONObject();
            obj.put("errorMessage", "invalid jwt");
            obj.put("success", false);
            obj.write(res.getWriter());
            res.setStatus(403);
        } catch (JSONException e) {
            e.printStackTrace();
        }
    }
    @Override
    protected boolean shouldNotFilter(HttpServletRequest request) throws ServletException {
      return !request.getRequestURI().contains("/auth");
    }
}