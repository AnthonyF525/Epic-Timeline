package com.epicstuff.repository;

import com.epicstuff.model.Location;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface LocationRepository extends JpaRepository<Location, Long> {
    
    // // [DONE] Find by name (case insensitive)
    List<Location> findByNameContainingIgnoreCase(String name);
    
    // // [DONE] Find by boolean flags
    List<Location> findByIsRealPlace(Boolean isRealPlace);
    List<Location> findByIsMythological(Boolean isMythological);
    
    // // [DONE] Find by modern name
    List<Location> findByModernName(String modernName);
}