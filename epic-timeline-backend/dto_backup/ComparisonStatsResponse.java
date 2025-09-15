package com.epicstuff.dto;

import com.epicstuff.enums.ComparisonType;
import lombok.Data;
import lombok.Builder;
import java.util.List;
import java.util.Map;

@Data
@Builder
public class ComparisonStatsResponse {
    private Long comparisonId;
    private String comparisonTitle;
    
    // // [DONE] Comparison type enum
    private ComparisonType comparisonType;
    
    // // [DONE] Analysis metadata
    private String analysisType;
    private String conclusion;
    
    // // [DONE] Boolean flags
    private Boolean isPublic;
    private Boolean isDetailed;
    
    // // [DONE] Entity information
    private Long entityOneId;
    private String entityOneName;
    private Long entityTwoId;
    private String entityTwoName;
    
    // // [DONE] Criteria statistics
    private Integer criteriaCount;
    private Double averageEntityOneScore;
    private Double averageEntityTwoScore;
    private Double totalWeightedEntityOneScore;
    private Double totalWeightedEntityTwoScore;
    private String winningEntity;
    private Double scoreDifference;
    
    // // [DONE] Content statistics
    private Integer themeCount;
    private Integer tagCount;
    private Integer sourceCount;
    private Integer keyInsightCount;
    private Integer relatedEntityCount;
    
    // // [DONE] Array content
    private List<String> allThemes;
    private List<String> allTags;
    private Map<String, Long> themeFrequency;
    private Map<String, Long> tagFrequency;
    
    // // [DONE] Metrics information
    private Double overallEntityOneScore;
    private Double overallEntityTwoScore;
    private Double confidenceLevel;
    private Integer analysisDepth;
    private Integer biasLevel;
    
    // // [DONE] Context information
    private String historicalPeriod;
    private String culturalContext;
    private String comparisonPurpose;
    private String targetAudience;
    private List<String> methodologies;
    private List<String> limitations;
    
    // // [DONE] Related entities
    private List<String> relatedCharacterNames;
    private List<String> relatedLocationNames;
    private List<String> relatedEventTitles;
    private List<String> relatedSagaTitles;
    
    // // [DONE] Detailed criteria breakdown
    private List<ComparisonCriteriaStatsResponse> criteriaBreakdown;
}

@Data
@Builder
class ComparisonCriteriaStatsResponse {
    private String criteriaName;
    private String description;
    private Double entityOneScore;
    private Double entityTwoScore;
    private Double weight;
    private Double weightedEntityOneScore;
    private Double weightedEntityTwoScore;
    private String winner;
    private String justification;
}