package com.epicstuff.config;

import com.epicstuff.middleware.ValidationMiddleware;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.InterceptorRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebConfig implements WebMvcConfigurer {

    @Autowired
    private ValidationMiddleware validationMiddleware;

    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/api/**")
        .allowedOrigins("http://localhost:3000", "http://localhost:19006")
        .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS")
        .allowedHeaders("*")
        .allowCredentials(true);
    }

    @Override
    public void addInterceptors(InterceptorRegistry registry) {
        registry.addInterceptor(validationMiddleware)
                .addPathPatterns("/api/**")
                .excludePathPatterns(
                    "/api/*/stats",           // Exclude stats endpoints
                    "/api/health",            // Exclude health check
                    "/api/docs",              // Exclude API docs
                    "/api/*/search",          // Exclude search endpoints (GET only)
                    "/api/comparisons/type/**", // Exclude type-specific GET endpoints
                    "/api/comparisons/characters", // Exclude character comparisons GET
                    "/api/comparisons/locations",  // Exclude location comparisons GET
                    "/api/comparisons/events",     // Exclude event comparisons GET
                    "/api/comparisons/songs",      // Exclude song comparisons GET
                    "/api/comparisons/sagas"       // Exclude saga comparisons GET
                );
    }
}
