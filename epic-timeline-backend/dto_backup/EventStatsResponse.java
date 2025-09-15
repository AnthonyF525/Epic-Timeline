package com.epicstuff.dto;

import lombok.Data;
import lombok.Builder;
import java.util.List;
import java.util.Map;

@Data
@Builder
public class EventStatsResponse {
    private Long eventId;
    private String eventTitle;
    private String eventDate;
    
    // // [DONE] Event metadata
    private String eventType;
    private String importance;
    private String outcome;
    private Integer durationMinutes;
    
    // // [DONE] Boolean flag statistics
    private Boolean isHistorical;
    private Boolean isMythological;
    private Boolean hasWitnesses;
    private Boolean hasMultipleVersions;
    private Boolean isPivotal;
    
    // // [DONE] Relationship counts
    private Integer characterCount;
    private Integer locationCount;
    private Integer sagaCount;
    private Integer songCount;
    
    // // [DONE] Content array statistics
    private Integer keyDetailCount;
    private Integer witnessCount;
    private Integer consequenceCount;
    private Integer alternativeAccountCount;
    private Integer culturalImpactCount;
    private Integer historicalSourceCount;
    private Integer relatedArtifactCount;
    
    // // [DONE] Array content (for analysis)
    private List<String> themes;
    private List<String> tags;
    private Map<String, Long> themeFrequency;
    private Map<String, Long> outcomesByType;
    
    // // [DONE] Weather and environmental data
    private String weather;
    private String season;
    private String timeOfDay;
    private Double temperatureCelsius;
    private Boolean wasStormy;
    private Boolean hadNaturalPhenomena;
    
    // // [DONE] Political context statistics
    private Integer rulingPowerCount;
    private Integer allianceCount;
    private Integer conflictCount;
    private Integer treatyCount;
    private List<String> rulingPowers;
    private List<String> alliances;
    
    // // [DONE] Related entities
    private List<String> characterNames;
    private List<String> locationNames;
    private List<String> sagaTitles;
    private List<String> songTitles;
    private Map<String, Integer> characterTypeCount;
    private Map<String, Integer> locationTypeCount;
    
    // // [DONE] Timeline context
    private String previousEventTitle;
    private String nextEventTitle;
    private Long daysSincePreviousEvent;
    private Long daysUntilNextEvent;
}