package com.alokMeds.api.Security;

import com.alokMeds.api.PageConstants;
import com.alokMeds.api.User.User;
import com.alokMeds.api.User.UserRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.annotation.Order;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;

@EnableWebSecurity
@Order(1)
public class SecurityApiConfig extends WebSecurityConfigurerAdapter {
    @Autowired
    private UserRepository userRepository;

    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http.authorizeRequests().antMatchers("/api/**").authenticated()
                // api login page
                .and().formLogin().loginPage("/apiLoginPage").permitAll()
                .successHandler((request, response, auth) -> User.setLoggedIn(auth.getName(), true))
                .failureForwardUrl(PageConstants.ApiLoginPage).defaultSuccessUrl("/#/")

                // api logout page
                .and().logout().logoutUrl(PageConstants.ApiLogoutPage).logoutSuccessUrl(PageConstants.BaseUrl)
                .logoutSuccessHandler((request, response, auth) -> {
                    User u = userRepository.findByUsername(auth.getName());
                    User.setLoggedIn(u.getUsername(), false);
                    userRepository.save(u);
                });
    }
}
