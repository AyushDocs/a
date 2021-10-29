package com.alokMeds.api.security;

import org.springframework.boot.web.servlet.FilterRegistrationBean;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class JwtFilterConfig {
    private static final String[] urlsWhichRequireAuthentication={
    "/api/*/auth/**"
    };
    @Bean
    public FilterRegistrationBean<JwtFilter> loggingFilter() {
        FilterRegistrationBean<JwtFilter> registrationBean = new FilterRegistrationBean<>();
        registrationBean.setFilter(new JwtFilter());
        registrationBean.addUrlPatterns(urlsWhichRequireAuthentication);
        return registrationBean;
    }
}