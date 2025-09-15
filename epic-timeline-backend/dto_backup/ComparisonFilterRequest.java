package com.epicstuff.dto;

import com.epicstuff.enums.ComparisonType;
import lombok.Data;
import lombok.Builder;

@Data
@Builder
public class ComparisonFilterRequest {
    // // [DONE] Comparison type enum filter
    private ComparisonType comparisonType;
    
    // // [DONE] Basic filters
    private String analysisType;
    private String conclusion;
    private Boolean isPublic;
    private Boolean isDetailed;
    
    // // [DONE] Array content filters
    private String theme;
    private String tag;
    private String source;
    private String keyInsight;
    
    // // [DONE] Entity filters
    private Long entityId;
    private Long entityOneId;
    private Long entityTwoId;
    
    // // [DONE] Related entity filters
    private Long relatedCharacterId;
    private Long relatedLocationId;
    private Long relatedEventId;
    private Long relatedSagaId;
    
    // // [DONE] Search filter
    private String search;
    
    // // [DONE] Metrics filters
    private String confidenceLevel;
    private String analysisDepth;
    private String biasLevel;
    
    // // [DONE] Context filters
    private String historicalPeriod;
    private String culturalContext;
    private String comparisonPurpose;
    private String targetAudience;
}