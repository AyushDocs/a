package com.alokMeds.api;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class CorsConfig implements WebMvcConfigurer {
  @Override
  public void addCorsMappings(org.springframework.web.servlet.config.annotation.CorsRegistry registry) {
    registry.addMapping("/**").allowedHeaders("*").allowedMethods("*").allowCredentials(false)
        .allowedOrigins("http://localhost:3000").maxAge(-1l);
  }
}
