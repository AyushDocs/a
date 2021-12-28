package com.alokMeds.api.security.filters;

import java.io.IOException;
import java.util.Arrays;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.alokMeds.api.security.SecurityValues;
import com.alokMeds.api.security.services.JwtUtil;

import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.web.filter.OncePerRequestFilter;

import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@AllArgsConstructor
@Slf4j
public class JwtRoleAuthenticationFilter extends OncePerRequestFilter {
    private JwtUtil jwtUtil;
    private SecurityValues securityValues;
    private UserDetailsService userDetailsService;

    @Override
    public void doFilterInternal(HttpServletRequest req, HttpServletResponse res, FilterChain filterChain)
            throws IOException, ServletException {
        if (req.getCookies() == null) {
            filterChain.doFilter(req, res);
            return;
        }
        Cookie[] cookies=req.getCookies();
        String token = getToken(cookies);
        if(token=="some"){
            filterChain.doFilter(req, res);
             return;
        }
        String email=jwtUtil.extractEmail(token);
        addToSpringSecurity(req, email);
        filterChain.doFilter(req, res);
    }
    private void addToSpringSecurity(HttpServletRequest req, String email) {
        if (SecurityContextHolder.getContext().getAuthentication() != null)
            return;
        UserDetails userDetails = userDetailsService.loadUserByUsername(email);
        UsernamePasswordAuthenticationToken u = new UsernamePasswordAuthenticationToken(userDetails, null,
                userDetails.getAuthorities());
        u.setDetails(new WebAuthenticationDetailsSource().buildDetails(req));
        log.info("user with email {} visited {} and has role {} ", email, req.getRequestURI(),userDetails.getAuthorities());
        SecurityContextHolder.getContext().setAuthentication(u);
    }

    private String getToken(Cookie[] cookies) {
        
        String cookieName = securityValues.getCookieName();
        return Arrays.stream(cookies).filter(i -> i.getName().equals(cookieName))
                .findFirst().orElse(new Cookie(securityValues.getCookieName(),"some")).getValue();
    }
    //
    // @Override
    // protected boolean shouldNotFilter(HttpServletRequest request) throws ServletException {
    //     String path=request.getRequestURI();
    //     if(path.contains("/auth"))return true;
    //     if(path.contains("/public/"))return true;
    //     return false;
    // }
}
