package com.epicstuff.dto;

import lombok.Data;
import lombok.Builder;
import java.util.List;
import java.util.Map;

@Data
@Builder
public class LocationStatsResponse {
    private Long locationId;
    private String locationName;
    
    // // [DONE] Boolean flag statistics
    private Boolean isRealPlace;
    private Boolean isMythological;
    private Boolean isModernLocation;
    private Boolean isAccessibleToday;
    private Boolean isUnderwater;
    private Boolean isArchaeological;
    private Boolean isTouristDestination;
    private Boolean hasModernName;
    private Boolean hasCoordinates;
    
    // // [DONE] Relationship counts
    private Integer characterCount;
    private Integer eventCount;
    private Integer sagaCount;
    
    // // [DONE] Array statistics
    private Integer alternativeNameCount;
    private Integer notableFeatureCount;
    private Integer historicalPeriodCount;
    private Integer mythologicalEventCount;
    private Integer modernLandmarkCount;
    
    // // [DONE] Geographic data
    private String regionType;
    private String regionName;
    private String parentRegion;
    private Double latitude;
    private Double longitude;
    private Double altitude;
    
    // // [DONE] Cultural significance
    private String culturalImportance;
    private List<String> culturalTags;
    private Integer literaryReferenceCount;
    
    // // [DONE] Tourism data
    private Boolean hasTravelInfo;
    private String nearestAirport;
    private List<String> accessMethods;
    private String bestTimeToVisit;
    
    // // [DONE] Related entities
    private List<String> characterNames;
    private List<String> eventTitles;
    private List<String> sagaTitles;
    private Map<String, Integer> characterTypeCount;
}