package com.epicstuff.repository;

import com.epicstuff.model.Location;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface LocationRepository extends JpaRepository<Location, Long> {
    
    // ✅ Find by name (case insensitive)
    List<Location> findByNameContainingIgnoreCase(String name);
    
    // ✅ Find by boolean flags
    List<Location> findByIsRealPlace(Boolean isRealPlace);
    List<Location> findByIsMythological(Boolean isMythological);
    
    // ✅ Find by modern name
    List<Location> findByModernName(String modernName);
}