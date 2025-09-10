package com.epicstuff.controller;

import java.time.LocalDateTime;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/")
public class BaseController {

    @GetMapping
    public WelcomeResponse welcome() {
        return new WelcomeResponse(
                "Welcome to Epic Timeline API",
                "1.0.0",
                "Exploring EPIC: The Musical timeline and story");
    }

    @GetMapping("/health")
    public HealthResponse health() {
        return new HealthResponse(
                "OK",
                "API is running",
                LocalDateTime.now().toString(),
                "The seas are calm");
    }

    // Response DTOs
    public record WelcomeResponse(
            String message,
            String version,
            String description
    ) {} 
    

    public record HealthResponse(
            String status,
            String message,
            String timestamp,
            String details 
    ) {}

}
