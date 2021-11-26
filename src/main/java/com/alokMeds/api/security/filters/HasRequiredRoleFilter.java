package com.alokMeds.api.security.filters;

import java.io.IOException;
import java.util.Arrays;
import java.util.List;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.alokMeds.api.User.User;
import com.alokMeds.api.User.UserRepository;
import com.alokMeds.api.security.JwtUtil;

import org.codehaus.jettison.json.JSONException;
import org.codehaus.jettison.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;
@Component

public class HasRequiredRoleFilter extends OncePerRequestFilter {
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private JwtUtil jwtUtil;

    @Override
    protected void doFilterInternal(HttpServletRequest req, HttpServletResponse res, FilterChain filterChain)
            throws ServletException, IOException {
        String token = req.getParameter("token");
        System.out.println("here token is " + token);
        boolean userRole=req.getRequestURL().toString().contains("/user");
        boolean adminRole=req.getRequestURL().toString().contains("/admin");
        boolean rootRole=req.getRequestURL().toString().contains("/root");
        User user=userRepository.findByUuid((String) jwtUtil.extractClaim(token, i->i.get("id")));
        List<String> roles=Arrays.stream(user.getRoles().split(",")).toList();
        if(rootRole &&roles.contains("ROOT"))
            filterChain.doFilter(req, res);
        else if(adminRole && roles.contains("ADMIN"))
             filterChain.doFilter(req, res);
        else if(userRole&&roles.contains("ROOT"))
             filterChain.doFilter(req, res);
        else errorOut(res);
    }
    private void errorOut(HttpServletResponse res) throws IOException {
        try {
            JSONObject obj = new JSONObject();
            obj.put("errorMessage", "unauthourised user");
            obj.put("success", false);
            obj.write(res.getWriter());
            res.setStatus(403);
        } catch (JSONException e) {
            e.printStackTrace();
        }
    }
    @Override
    protected boolean shouldNotFilter(HttpServletRequest request) throws ServletException {
        String path=request.getRequestURL().toString();
        if(path.contains("/user")||path.contains("/admin")||path.contains("/root"))
          return false;
        return true;
    }
}
