package com.alokMeds.api.security;

import java.io.IOException;
import java.util.Arrays;
import java.util.List;

import javax.servlet.Filter;
import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;

import com.alokMeds.api.User.UserRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.annotation.Order;
import org.springframework.stereotype.Component;
@Component()
@Order(0)
public class JwtAdminFilter implements Filter {
    @Autowired
    private JwtUtil jwtUtil;
    @Autowired
    private UserRepository userRepository;
        private static final List<String>  urlsWhichRequireAdminAuthentication=Arrays.asList("/restricted");
    @Override
    public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain)throws IOException, ServletException {
/*         HttpServletRequest req = (HttpServletRequest) request;
        HttpServletResponse res = (HttpServletResponse) response;
        if(!urlsWhichRequireAdminAuthentication.contains(req.getRequestURL().toString()))
          doFilter(request, response, chain);
        final String jwtString=Arrays.stream(req.getCookies())
                                .filter(i->i.getName().equals("token"))
                                .toList()
                                .get(0)
                                .getValue();
        if (jwtString == null ||!jwtUtil.validateToken(jwtString))
            res.sendError(HttpServletResponse.SC_FORBIDDEN);

       User user =userRepository.findByEmail(request.getParameter("email"));
       if(!Arrays.stream(user.getRoles().split(",")).toList().contains("ADMIN"))
           res.sendError(HttpServletResponse.SC_FORBIDDEN); */
     chain.doFilter(request, response);
    }
}
