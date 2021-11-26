package com.alokMeds.api.security;

import com.alokMeds.api.User.UserRepository;
import com.alokMeds.api.security.filters.HasRequiredRoleFilter;
import com.alokMeds.api.security.filters.JwtFilter;

import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.builders.WebSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import lombok.AllArgsConstructor;

@EnableWebSecurity
@EnableGlobalMethodSecurity(jsr250Enabled = true,prePostEnabled = true,securedEnabled = true)
@AllArgsConstructor
// extends GlobalMethodSecurityConfiguration 
public class SecurityConfig extends WebSecurityConfigurerAdapter {
   private UserRepository userRepository;
   private PasswordEncoder passwordEncoder;
   private JwtFilter jwtFilter;
   private HasRequiredRoleFilter hasRequiredRoleFilter;

   @Override
   protected void configure(AuthenticationManagerBuilder auth) throws Exception {
      auth.userDetailsService(i -> userRepository.findByEmail(i)).passwordEncoder(passwordEncoder);
   }

   @Override
   protected void configure(HttpSecurity http) throws Exception {
      http
      .cors(Customizer.withDefaults())
      .csrf()
         .disable()
      .sessionManagement()
         .sessionCreationPolicy(SessionCreationPolicy.STATELESS)
      .and()
      .addFilterBefore(hasRequiredRoleFilter, UsernamePasswordAuthenticationFilter.class)
         .addFilterBefore(jwtFilter, HasRequiredRoleFilter.class);
      // .headers()
      //   .contentSecurityPolicy("script-src 'self'");
   }

   @Override
   public void configure(WebSecurity web) throws Exception {
      web.ignoring().antMatchers("/**/*.js", "/**/*.css", "/**/*.json", "/**/*.html", "/*");
   }
}
