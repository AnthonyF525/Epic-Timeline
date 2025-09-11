package com.epicstuff.dto;

import lombok.Data;
import lombok.Builder;

@Data
@Builder
public class LocationFilterRequest {
    // ✅ Boolean flag filters
    private Boolean isRealPlace;
    private Boolean isMythological;
    private Boolean isModernLocation;
    private Boolean isAccessibleToday;
    private Boolean isTouristDestination;
    private Boolean hasCoordinates;
    private String regionType;
    private String culturalImportance;
    
    // ✅ Relationship filters
    private Long characterId;
    private Long sagaId;
    
    // ✅ Search and geographic filters
    private String search;
    private Double centerLat;
    private Double centerLng;
    private Double radiusKm;
    
    // ✅ Array content filters
    private String alternativeName;
    private String feature;
    private String historicalPeriod;
    private String culturalTag;
}