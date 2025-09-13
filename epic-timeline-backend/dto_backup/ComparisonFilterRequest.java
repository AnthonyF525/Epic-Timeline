package com.epicstuff.dto;

import com.epicstuff.enums.ComparisonType;
import lombok.Data;
import lombok.Builder;

@Data
@Builder
public class ComparisonFilterRequest {
    // ✅ Comparison type enum filter
    private ComparisonType comparisonType;
    
    // ✅ Basic filters
    private String analysisType;
    private String conclusion;
    private Boolean isPublic;
    private Boolean isDetailed;
    
    // ✅ Array content filters
    private String theme;
    private String tag;
    private String source;
    private String keyInsight;
    
    // ✅ Entity filters
    private Long entityId;
    private Long entityOneId;
    private Long entityTwoId;
    
    // ✅ Related entity filters
    private Long relatedCharacterId;
    private Long relatedLocationId;
    private Long relatedEventId;
    private Long relatedSagaId;
    
    // ✅ Search filter
    private String search;
    
    // ✅ Metrics filters
    private String confidenceLevel;
    private String analysisDepth;
    private String biasLevel;
    
    // ✅ Context filters
    private String historicalPeriod;
    private String culturalContext;
    private String comparisonPurpose;
    private String targetAudience;
}