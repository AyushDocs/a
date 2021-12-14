package com.alokMeds.api.security.filters;

import java.io.IOException;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.alokMeds.api.User.UserRepository;
import com.alokMeds.api.security.JwtUtil;
import com.alokMeds.api.security.SecurityValues;

import org.springframework.core.annotation.Order;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import lombok.AllArgsConstructor;

@Component
@AllArgsConstructor
@Order(1)
public class JwtRoleAuthenticationFilter extends OncePerRequestFilter {
    private JwtUtil jwtUtil;
    private UserRepository userRepository;
    private SecurityValues securityValues;

    @Override
    public void doFilterInternal(HttpServletRequest req, HttpServletResponse res, FilterChain filterChain)
            throws IOException, ServletException {
        // if (req.getCookies()==null){System.out.println("from null check");
        //     throw new CookieNotFoundException();}
        // String path = req.getRequestURI();
        // String cookieName = securityValues.getCookieName();
        // String token = Arrays.stream(req.getCookies()).filter(i -> i.getName().equals(cookieName))
        //         .findFirst().orElseThrow(CookieNotFoundException::new).getValue();
        // if (!jwtUtil.validateToken(token))
        //     throw new InvalidJwtException();

        // String id = (String) jwtUtil.extractClaim(token, i -> i.get("id")).orElseThrow(ClaimNotFoundException::new);
        // List<String> roles = Arrays.asList(userRepository.findByUuid(id)
        //         .orElseThrow(() -> new UserNotFoundException("no user found")).getRoles().split(","));
        // if ((path.contains("/user/role") && !roles.contains("USER"))
        //         || (path.contains("/admin/role") && !roles.contains("ADMIN"))
        //         || (path.contains("/root/role") && !roles.contains("ROOT")))
        //     throw new NoValidRoleException();
        filterChain.doFilter(req, res);
    }

    @Override
    protected boolean shouldNotFilter(HttpServletRequest request) throws ServletException {
        return !request.getRequestURI().contains("/auth/");
    }
}