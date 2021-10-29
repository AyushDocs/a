package com.alokMeds.api.security;

import java.io.IOException;
import java.util.Arrays;

import javax.servlet.Filter;
import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class JwtFilter implements Filter {
    @Autowired
    private JwtUtil jwtUtil;

    @Override
    public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain)throws IOException, ServletException {
        HttpServletRequest req = (HttpServletRequest) request;
        HttpServletResponse res = (HttpServletResponse) response;
        final String jwtString=Arrays.stream(req.getCookies())
                                .filter(i->i.getName().equals("token"))
                                .toList()
                                .get(0)
                                .getValue();
        if (jwtString == null)
            res.sendError(HttpServletResponse.SC_FORBIDDEN);
        if(jwtUtil.validateToken(jwtString)){
            chain.doFilter(request, response);
        }
        res.sendError(HttpServletResponse.SC_FORBIDDEN);
    }
}
