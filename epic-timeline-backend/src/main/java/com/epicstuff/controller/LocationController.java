package com.epicstuff.controller;

import com.epicstuff.model.Location;
import com.epicstuff.repository.LocationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/locations")
@CrossOrigin(origins = "*", allowCredentials = "false")
public class LocationController {

    @Autowired
    private LocationRepository locationRepository;

    // ✅ GET /api/locations - List all locations
    @GetMapping
    public ResponseEntity<List<Location>> getAllLocations() {
        List<Location> locations = locationRepository.findAll();
        return ResponseEntity.ok(locations);
    }

    // ✅ GET /api/locations/{id} - Get location by ID
    @GetMapping("/{id}")
    public ResponseEntity<Location> getLocationById(@PathVariable Long id) {
        Optional<Location> location = locationRepository.findById(id);
        if (location.isPresent()) {
            return ResponseEntity.ok(location.get());
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    // ✅ GET /api/locations/search - Simple search by name
    @GetMapping("/search")
    public ResponseEntity<List<Location>> searchLocations(@RequestParam String name) {
        List<Location> locations = locationRepository.findByNameContainingIgnoreCase(name);
        return ResponseEntity.ok(locations);
    }

    // ✅ GET /api/locations/real - Get real places only
    @GetMapping("/real")
    public ResponseEntity<List<Location>> getRealPlaces() {
        List<Location> locations = locationRepository.findByIsRealPlace(true);
        return ResponseEntity.ok(locations);
    }

    // ✅ GET /api/locations/mythological - Get mythological places only
    @GetMapping("/mythological")
    public ResponseEntity<List<Location>> getMythologicalPlaces() {
        List<Location> locations = locationRepository.findByIsMythological(true);
        return ResponseEntity.ok(locations);
    }
}
