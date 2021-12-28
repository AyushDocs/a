package com.alokMeds.api.security;

import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.stereotype.Component;

import lombok.Data;

@ConfigurationProperties("alokmeds.security")
@Data
@Component
public class SecurityValues {
    private long cookieLife;
    private String cookieName;
    private String jwtSecret;
}
