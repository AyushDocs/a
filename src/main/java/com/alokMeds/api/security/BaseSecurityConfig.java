package com.alokMeds.api.security;

import com.alokMeds.api.User.UserRepository;
import com.alokMeds.api.security.filters.JwtRoleAuthenticationFilter;
import com.alokMeds.api.security.services.JwtUtil;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.annotation.Order;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.builders.WebSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.AuthenticationEntryPoint;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import org.springframework.web.filter.CorsFilter;

import lombok.AllArgsConstructor;
@EnableWebSecurity
@Configuration
@Order(0)
@EnableGlobalMethodSecurity(jsr250Enabled = true,prePostEnabled = true,securedEnabled=true)
@AllArgsConstructor
public class BaseSecurityConfig extends WebSecurityConfigurerAdapter {
    private PasswordEncoder passwordEncoder;
    private UserRepository userRepository;
    private JwtUtil jwtUtil;
    private SecurityValues securityValues;
    private AuthenticationEntryPoint authenticationEntryPoint;
    @Override
    protected void configure(AuthenticationManagerBuilder auth) throws Exception {
        auth.userDetailsService(userDetailsService()).passwordEncoder(passwordEncoder);
    }
    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http=http.cors().and().csrf().disable();
        http=http
            .sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS)
            .and();
        http=http
             .exceptionHandling()
             .authenticationEntryPoint(authenticationEntryPoint)
             .and();

        http=http
            .addFilterBefore(jwtRoleAuthenticationFilter(), UsernamePasswordAuthenticationFilter.class);
    }
    @Override
    public void configure(WebSecurity web) throws Exception {
        web.ignoring()
        .antMatchers(HttpMethod.POST,"/api/auth/**")
        .antMatchers("/api/auth/**")
        .antMatchers("**/public/**")
        .antMatchers("/*.json","/*.ico","/*.jpg","/*.css","/*.js","/**");
    }
    
    @Override
    @Bean
    public AuthenticationManager authenticationManagerBean() throws Exception {
        return super.authenticationManagerBean();
    }
    
    @Bean
    public JwtRoleAuthenticationFilter jwtRoleAuthenticationFilter(){
        return new JwtRoleAuthenticationFilter(jwtUtil, securityValues, userDetailsService());
    }
    @Bean
    public CorsFilter corsFilter(){
        UrlBasedCorsConfigurationSource source=new UrlBasedCorsConfigurationSource();
        CorsConfiguration config=new CorsConfiguration();
        config.setAllowCredentials(true);
        config.addAllowedOrigin("http://localhost:3000");
        config.addAllowedOriginPattern("*");
        config.addAllowedHeader("*");
        config.addAllowedMethod("*");
        source.registerCorsConfiguration("/**", config);
        return new CorsFilter(source);
    }
    @Override
    @Bean
    public UserDetailsService userDetailsService(){
        return email -> userRepository.findByEmail(email)
                .orElseThrow(() -> new UsernameNotFoundException("user not found for email " + email));
    }
}
