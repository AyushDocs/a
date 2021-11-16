package com.alokMeds.api.security;

import java.io.IOException;
import java.util.Arrays;
import java.util.List;

import javax.servlet.Filter;
import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.alokMeds.api.User.User;
import com.alokMeds.api.User.UserRepository;

import org.springframework.beans.factory.annotation.Autowired;

public class JwtUserFilter implements Filter {
    @Autowired
    private JwtUtil jwtUtil;
    @Autowired
    private UserRepository userRepository;
    private static final List<String> urlsWhichRequireUserAuthentication=Arrays.asList("/dd","/ddd");
    @Override
    public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain)throws IOException, ServletException {
        HttpServletRequest req = (HttpServletRequest) request;
        HttpServletResponse res = (HttpServletResponse) response;
        if(!urlsWhichRequireUserAuthentication.contains(req.getRequestURL().toString()))
              doFilter(request, response, chain);
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
        User user =userRepository.findByEmail(request.getParameter("email"));
        if(!Arrays.stream(user.getRoles().split(",")).toList().contains("ADMIN"))
            res.sendError(HttpServletResponse.SC_FORBIDDEN);
            
        res.sendError(HttpServletResponse.SC_FORBIDDEN);
    }
}
