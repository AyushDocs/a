package com.alokMeds.api.Security;

import com.alokMeds.api.PageConstants;
import com.alokMeds.api.User.User;
import com.alokMeds.api.User.UserRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.annotation.Order;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.crypto.password.PasswordEncoder;

@EnableWebSecurity
@Order(0)
public class SecurityReactConfig extends WebSecurityConfigurerAdapter {
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private PasswordEncoder passwordEncoder;

    @Override
    protected void configure(AuthenticationManagerBuilder auth) throws Exception {
        auth.userDetailsService(userRepository::findByUsername).passwordEncoder(passwordEncoder);
    }

    @Override
    protected void configure(HttpSecurity http) throws Exception {
         http
         .authorizeRequests() 
         .antMatchers("/#/publications").hasAnyRole("ADMIN","user")
         .antMatchers("/#/*").permitAll()             
         .antMatchers("/h2-console").hasRole("ADMIN")
         // public login page
         .and()
         .formLogin()
         .loginPage(PageConstants.PublicLoginPage)
         .defaultSuccessUrl(PageConstants.BaseUrl)
         .failureForwardUrl(PageConstants.PublicLoginPage+"?error=true")
         .failureUrl(PageConstants.PublicLoginPageFailureUrl)  
         // public logout page
         .and()
         .logout()
         .logoutUrl(PageConstants.PublicLogoutPage)
         .logoutSuccessHandler((request, response, auth)->
         userRepository.save( User.setLoggedIn(auth.getName(), false)))
             .logoutSuccessUrl(PageConstants.BaseUrl);
    }
}
