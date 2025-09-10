package com.epicstuff;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;



@SpringBootApplication
public class EpicTimelineApplication {
    public static void main(String[] args) {
        System.out.println("Starting your Epic Odyssey");
        System.out.println("Prepping the journey");
        SpringApplication.run(EpicTimelineApplication.class, args);
        System.out.println("Ships are ready to set sail!");
    }
}