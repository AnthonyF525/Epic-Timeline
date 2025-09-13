package com.epicstuff.dto;

import lombok.Data;
import lombok.Builder;

@Data
@Builder
public class EventFilterRequest {
    // ✅ Event type and metadata filters
    private String eventType;
    private String importance;
    private String outcome;
    
    // ✅ Boolean flag filters
    private Boolean isHistorical;
    private Boolean isMythological;
    private Boolean hasWitnesses;
    private Boolean hasMultipleVersions;
    private Boolean isPivotal;
    
    // ✅ Relationship filters
    private Long characterId;
    private Long locationId;
    private Long sagaId;
    private Long songId;
    
    // ✅ Date range filters
    private String dateAfter;
    private String dateBefore;
    
    // ✅ Content filters
    private String search;
    private String theme;
    private String tag;
    private String witness;
    private String culturalImpact;
    
    // ✅ Duration filters
    private Integer minDurationMinutes;
    private Integer maxDurationMinutes;
    
    // ✅ Weather filters
    private String weather;
    private String season;
    private String timeOfDay;
    
    // ✅ Political context filters
    private String rulingPower;
    private String alliance;
    private String conflict;
}